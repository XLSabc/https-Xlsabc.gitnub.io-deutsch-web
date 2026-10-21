/* =========================================================
   Wortkarte · application logic
   Vanilla JS, no build step, all progress stored locally.
   ========================================================= */

"use strict";

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MINUTE_MS = 60_000;
const STORAGE_KEY = "wortkarte.v2";
const WEEKLY_QUIZ_KEY = "wortkarte.quiz_current";
const WEEKLY_HISTORY_KEY = "wortkarte.quiz_history";
const REPEAT_LOG_KEY = "wortkarte.repeat_review_log";
const RING_SMALL = 2 * Math.PI * 51;
const RING_LARGE = 2 * Math.PI * 59;

const WEEKDAYS_DE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const WEEKDAYS_DE_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const WEEKDAYS_ZH = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

const POS_LABELS = {
  noun: "名词",
  verb: "动词",
  adj: "形容词",
  adv: "副词",
  other: "其他",
  unknown: "词性待补充"
};

const RATING_SCORES = { again: 1, hard: 3, good: 4, easy: 5 };

const STATUS_META = {
  new: { label: "新词", cls: "status-new" },
  learning: { label: "学习中", cls: "status-learning" },
  mastered: { label: "已掌握", cls: "status-mastered" },
  due: { label: "今天到期", cls: "status-due" }
};

const TOPIC_MAP = Object.fromEntries(TOPICS.map(topic => [topic.id, topic]));
const TEXTBOOK_WORDS = (window.WORTKARTE_TEXTBOOK && Array.isArray(window.WORTKARTE_TEXTBOOK.words))
  ? window.WORTKARTE_TEXTBOOK.words
  : [];
const GRAMMAR_DATA = (typeof GRAMMAR_TOPICS !== "undefined" && Array.isArray(GRAMMAR_TOPICS))
  ? GRAMMAR_TOPICS
  : [];
const GRAMMAR_SUMMARY_DATA = (window.GRAMMAR_SUMMARY && Array.isArray(window.GRAMMAR_SUMMARY.chapters))
  ? window.GRAMMAR_SUMMARY
  : null;
const CHANGELOG_DATA = Array.isArray(window.WORTKARTE_CHANGELOG) ? window.WORTKARTE_CHANGELOG : [];
const CHANGELOG_SUMMARY = Array.isArray(window.WORTKARTE_CHANGELOG_SUMMARY) ? window.WORTKARTE_CHANGELOG_SUMMARY : [];
const CULTURE_DATA = window.WORTKARTE_CULTURE && Array.isArray(window.WORTKARTE_CULTURE.items)
  ? window.WORTKARTE_CULTURE
  : { categories: [], items: [] };
const ARTICLES = Array.isArray(window.WORTKARTE_ARTICLES) ? window.WORTKARTE_ARTICLES : [];
const ARTICLE_QUESTIONS = window.WORTKARTE_ARTICLE_QUESTIONS || {};
const ARTICLE_TRANSLATIONS = window.WORTKARTE_ARTICLE_TRANSLATIONS || {};
const PHRASES = Array.isArray(window.WORTKARTE_PHRASES) ? window.WORTKARTE_PHRASES : [];
const OCR_CONTENT = window.WORTKARTE_OCR_CONTENT || { articles: [], phrases: [], words: [] };
const OCR_VOCAB = Array.isArray(window.WORTKARTE_OCR_VOCAB) ? window.WORTKARTE_OCR_VOCAB : [];
const GOETHE_WORDS = (() => {
  const pack = window.WORTKARTE_DICTIONARY;
  if (!pack || !pack.levels) return [];
  return Object.values(pack.levels).flatMap(level => Array.isArray(level.words) ? level.words : []);
})();
const WORD_FIXES = window.WORTKARTE_FIXES || {};
const WORD_ARTICLES = window.WORTKARTE_ARTICLES || {};
const NOUN_FIXES = window.WORTKARTE_NOUN_FIXES || {};
const GUIDE_FIXES = window.WORTKARTE_GUIDE_FIXES || {};
const GUIDE_EXAMPLES = window.WORTKARTE_GUIDE_EXAMPLES || {};
const VERBFORMEN_FIXES = window.WORTKARTE_VERBFORMEN_FIXES || {};
const GLOSSAR_FIXES = window.WORTKARTE_GLOSSAR_FIXES || {};
const WIKTIONARY_FIXES = window.WORTKARTE_WIKTIONARY_FIXES || {};
const TATOEBA_EXAMPLES = window.WORTKARTE_TATOEBA_EXAMPLES || {};
const WORD_SPLITS = window.WORTKARTE_SPLITS || [];
const WORD_BLACKLIST = new Set(window.WORTKARTE_BLACKLIST || []);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(name, className = "") {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(23, 59, 59, 999);
  return d;
}

function addDays(ts, amount) {
  const d = new Date(ts);
  d.setDate(d.getDate() + amount);
  return d;
}

function dayKey(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isSameDay(a, b) {
  return dayKey(a) === dayKey(b);
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatGermanDate(ts = Date.now()) {
  const d = new Date(ts);
  return `${WEEKDAYS_DE[d.getDay()]} · ${d.getDate()}. ${MONTHS_DE[d.getMonth()]}`;
}

function formatDateZh(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${pad(seconds)}`;
}

function formatDue(ts) {
  if (!ts) return "—";
  const now = Date.now();
  if (ts <= now + MINUTE_MS) return "现在";
  const today = startOfDay(now).getTime();
  const target = startOfDay(ts).getTime();
  if (target === today) {
    const d = new Date(ts);
    return `今天 ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  if (target === today + DAY_MS) return "明天";
  if (target < today + 7 * DAY_MS) return `周${WEEKDAYS_ZH[new Date(ts).getDay()]}`;
  return formatDateZh(ts);
}

function formatInterval(intervalDays) {
  if (!Number.isFinite(intervalDays) || intervalDays <= 0) return "10 分钟";
  const minutes = intervalDays * 24 * 60;
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))} 分钟`;
  const hours = intervalDays * 24;
  if (hours < 24) return `${Math.max(1, Math.round(hours))} 小时`;
  if (intervalDays < 30) return `${Math.max(1, Math.round(intervalDays))} 天`;
  if (intervalDays < 365) return `${round(intervalDays / 30, 1)} 个月`;
  return `${round(intervalDays / 365, 1)} 年`;
}

function wordDisplay(word, withArticle = true) {
  if (!word) return "";
  if (withArticle && word.article) return `${word.article} ${word.word}`;
  return word.word;
}

function pluralLabel(word) {
  if (word.plural) return word.plural;
  if (word.book || word.pack) return "复数见词典";
  return "无复数";
}

function formsLine(word) {
  const uncertain = word.posUncertain ? "（待校对）" : "";
  if (word.pos === "noun") return `名词 · ${word.plural ? pluralLabel(word) : "复数待补充"}`;
  if (word.pos === "verb") return `动词${uncertain} · ${word.forms || "变位待补充"}`;
  if (word.pos === "adj") return `形容词${uncertain} · ${word.forms || "比较级待补充"}`;
  if (word.pos === "adv") return `副词 · ${word.forms || "无变形"}`;
  if (!word.pos) return "词性待补充 · 变形待补充";
  return `${POS_LABELS[word.pos] || "词"}${uncertain} · ${word.forms || "变形待补充"}`;
}

function morphLine(word) {
  return formsLine(word);
}

function applyTheme() {
  const theme = String(state.settings?.theme || "warm");
  document.documentElement.dataset.theme = ["warm", "forest", "blue", "dark", "contrast"].includes(theme) ? theme : "warm";
  const accent = String(state.settings?.accent || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(accent)) {
    document.documentElement.style.setProperty("--clay", accent);
  } else {
    document.documentElement.style.removeProperty("--clay");
  }
}

function weeklyQuestionCount() {
  return { simple: 4, standard: 8, challenge: 12 }[state.settings?.quizDifficulty] || 8;
}

function defaultSettings() {
  return {
    name: "Lena",
    dailyGoal: 20,
    sound: true,
    reminderEnabled: false,
    reminderTime: "20:00",
    theme: "warm",
    accent: "",
    quizDifficulty: "standard",
    weeklyQuizEnabled: true,
    repeatIntervalMin: 30,
    personalization: true
  };
}

function freshState() {
  return {
    version: 2,
    schemaVersion: 4,
    settings: defaultSettings(),
    reviews: {},
    customWords: [],
    customPhrases: [],
    customArticles: [],
    customGrammar: [],
    favorites: [],
    activity: {},
    stats: { reviews: 0, correct: 0 },
    mistakes: {},
    mistakeTypes: {},
    quizBest: 0,
    grammar: { seen: [], correct: [] },
    readArticles: [],
    progressByLevel: { A1: { correct: 0, total: 0 }, A2: { correct: 0, total: 0 }, B1: { correct: 0, total: 0 }, B2: { correct: 0, total: 0 }, C1: { correct: 0, total: 0 }, C2: { correct: 0, total: 0 } },
    meta: { demo: false, createdAt: new Date().toISOString() }
  };
}

function makeReview({ reps, interval, ease, lapses, due, last, status }) {
  return {
    reps,
    repetition: reps,
    interval,
    ease,
    easiness: ease,
    lapses,
    due,
    nextReviewDate: due,
    last,
    status
  };
}

function createDemoState() {
  const state = freshState();
  state.meta.demo = true;
  const now = Date.now();

  const dueIds = [
    "alltag-02", "alltag-04", "gefuehle-02", "gefuehle-05", "reisen-01",
    "reisen-04", "lernen-01", "lernen-06", "zeit-01", "zeit-04", "zeit-09"
  ];
  dueIds.forEach((id, index) => {
    const interval = 2 + (index % 6);
    state.reviews[id] = makeReview({
      reps: 2 + (index % 3),
      interval,
      ease: 2.35 + (index % 4) * 0.08,
      lapses: 1 + (index % 3),
      due: now - (1 + index * 0.8) * HOUR_MS,
      last: now - interval * DAY_MS,
      status: "learning"
    });
  });

  const masteredIds = [
    "alltag-01", "alltag-03", "gefuehle-01", "gefuehle-03",
    "reisen-02", "lernen-02", "zeit-02"
  ];
  masteredIds.forEach((id, index) => {
    const interval = 24 + index * 4;
    state.reviews[id] = makeReview({
      reps: 5 + (index % 3),
      interval,
      ease: 2.65 + (index % 3) * 0.1,
      lapses: index % 2,
      due: now + (4 + index * 3) * DAY_MS,
      last: now - Math.round(interval * 0.55) * DAY_MS,
      status: "mastered"
    });
  });

  const learningIds = ["alltag-07", "gefuehle-06", "reisen-08", "lernen-07", "zeit-07", "zeit-10"];
  learningIds.forEach((id, index) => {
    const interval = 2 + (index % 4);
    state.reviews[id] = makeReview({
      reps: 1 + (index % 2),
      interval,
      ease: 2.4,
      lapses: index % 2,
      due: now + (1 + (index % 3)) * DAY_MS + (index + 2) * HOUR_MS,
      last: now - interval * DAY_MS,
      status: "learning"
    });
  });

  state.stats = { reviews: 342, correct: 298 };
  state.quizBest = 80;
  state.favorites = ["gefuehle-08", "reisen-13"];

  const today = startOfDay(now).getTime();
  for (let offset = 39; offset >= 0; offset -= 1) {
    const ts = today - offset * DAY_MS;
    let count;
    if (offset === 0) {
      count = 14;
    } else if (offset <= 13) {
      count = 8 + ((offset * 7) % 17);
    } else if (offset % 5 === 0) {
      count = 0;
    } else {
      count = 6 + ((offset * 5) % 20);
    }
    if (count > 0) state.activity[dayKey(ts)] = count;
  }

  return state;
}

function normalizeState(raw) {
  if (!raw || typeof raw !== "object") return freshState();
  const base = freshState();
  const reviews = {};
  for (const [id, review] of Object.entries(raw.reviews && typeof raw.reviews === "object" ? raw.reviews : {})) {
    if (!review || typeof review !== "object") continue;
    const reps = Number(review.reps ?? review.repetition) || 0;
    const ease = Number(review.ease ?? review.easiness) || 2.5;
    const due = Number(review.due ?? review.nextReviewDate) || 0;
    reviews[id] = {
      ...review,
      reps,
      repetition: reps,
      interval: Number(review.interval) || 0,
      ease,
      easiness: ease,
      lapses: Number(review.lapses) || 0,
      due,
      nextReviewDate: due,
      last: Number(review.last) || 0,
      status: review.status || (review.interval >= 21 && reps >= 4 ? "mastered" : "learning")
    };
  }
  return {
    ...base,
    ...raw,
    schemaVersion: 4,
    settings: { ...base.settings, ...(raw.settings || {}) },
    reviews,
    customWords: Array.isArray(raw.customWords) ? raw.customWords : [],
    customPhrases: Array.isArray(raw.customPhrases) ? raw.customPhrases : [],
    customArticles: Array.isArray(raw.customArticles) ? raw.customArticles : [],
    customGrammar: Array.isArray(raw.customGrammar) ? raw.customGrammar : [],
    favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
    activity: raw.activity && typeof raw.activity === "object" ? raw.activity : {},
    stats: { ...base.stats, ...(raw.stats || {}) },
    mistakes: raw.mistakes && typeof raw.mistakes === "object" ? raw.mistakes : {},
    mistakeTypes: raw.mistakeTypes && typeof raw.mistakeTypes === "object" ? raw.mistakeTypes : {},
    grammar: {
      ...base.grammar,
      ...(raw.grammar && typeof raw.grammar === "object" ? raw.grammar : {})
    },
    readArticles: Array.isArray(raw.readArticles) ? [...new Set(raw.readArticles.filter(Boolean))] : [],
    progressByLevel: {
      ...base.progressByLevel,
      ...Object.fromEntries(Object.entries(raw.progressByLevel && typeof raw.progressByLevel === "object" ? raw.progressByLevel : {}).map(([level, value]) => [
        level,
        { correct: Number(value?.correct) || 0, total: Number(value?.total) || 0 }
      ]))
    },
    meta: { ...base.meta, ...(raw.meta || {}) }
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const fresh = freshState();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      } catch {
        /* storage can be unavailable; app still works in memory */
      }
      return fresh;
    }
    const parsed = JSON.parse(saved);
    if ((Number(parsed.schemaVersion) || 0) < 4) {
      try {
        localStorage.setItem(`${STORAGE_KEY}.backup`, saved);
      } catch {
        /* backup is best effort */
      }
    }
    const normalized = normalizeState(parsed);
    // 结构升级后立即写回，旧字段迁移到 schemaVersion 4，原数据仍保留在 .backup。
    if ((Number(parsed.schemaVersion) || 0) < 4) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        /* storage quota: keep in-memory normalized state */
      }
    }
    return normalized;
  } catch {
    return freshState();
  }
}

let state = loadState();
let allWordList = [];
let wordMap = new Map();
let searchIndex = new Map();
let session = null;
let studyTimer = null;
let reminderTimer = null;
let toastTimer = null;
let quiz = {
  mode: "de-zh",
  level: "all",
  questions: [],
  index: 0,
  score: 0,
  answers: [],
  answered: false,
  active: false,
  startTime: 0,
  weekly: false,
  weekId: ""
};

const libraryFilters = {
  query: "",
  level: "all",
  status: "all",
  sort: "default"
};
let libraryVisibleLimit = 80;
let grammarLevel = "all";
let cultureCategory = "all";
let readingArticleId = null;
let readingQuery = "";
let readingLevel = "all";
let phraseQuery = "";
let calendarCursor = new Date();

function fixWordData(word) {
  if (!word || !word.word) return word;
  const originalKey = `${word.article || ""}|${word.word}`;
  const fix = WORD_FIXES[originalKey] || WORD_FIXES[`|${word.word}`];
  if (fix) {
    for (const [key, value] of Object.entries(fix)) {
      if (value === undefined) continue;
      if (word[key] !== undefined && word[`${key}_orig`] === undefined) {
        word[`${key}_orig`] = word[key];
      }
      word[key] = value;
    }
  }
  if (word.pos === "noun" && !word.article && WORD_ARTICLES[word.word]) {
    word.article = WORD_ARTICLES[word.word];
  }
  if (word.pos === "noun" && NOUN_FIXES[word.word]) {
    const nounFix = NOUN_FIXES[word.word];
    if (!word.article && nounFix.article) word.article = nounFix.article;
    if (!word.plural && nounFix.plural) word.plural = nounFix.plural;
  }
  if (word.pos === "noun" && GUIDE_FIXES[word.word]) {
    const guideFix = GUIDE_FIXES[word.word];
    if (!word.article && guideFix.article) word.article = guideFix.article;
    if (!word.plural && guideFix.plural) word.plural = guideFix.plural;
  }
  if (word.pos === "noun" && VERBFORMEN_FIXES[word.word]) {
    const verbformenFix = VERBFORMEN_FIXES[word.word];
    if (!word.article && verbformenFix.article) word.article = verbformenFix.article;
    if (!word.plural && verbformenFix.plural) word.plural = verbformenFix.plural;
  }
  if (word.pos === "noun" && GLOSSAR_FIXES[word.word] && !word.plural) {
    word.plural = GLOSSAR_FIXES[word.word].plural;
  }
  if (word.pos === "noun" && WIKTIONARY_FIXES[word.word]) {
    const wikiFix = WIKTIONARY_FIXES[word.word];
    if (!word.article && wikiFix.article) word.article = wikiFix.article;
    if (!word.plural && wikiFix.plural) word.plural = wikiFix.plural;
  }
  const tatoebaExample = TATOEBA_EXAMPLES[String(word.word || "").toLowerCase()];
  if (tatoebaExample && !word.example) {
    word.example = tatoebaExample.example;
    word.exampleZh = tatoebaExample.exampleZh;
    word.exampleSource = tatoebaExample.source;
  }
  const guideExample = GUIDE_EXAMPLES[String(word.word || "").toLowerCase()];
  if (guideExample && !word.example) {
    word.example = guideExample.example;
    word.exampleZh = guideExample.exampleZh;
    word.exampleSource = guideExample.source;
  }
  if (typeof word.translation === "string") {
    word.translation = word.translation
      .replaceAll("⻆", "角")
      .replaceAll("戶", "户")
      .replace(/\s+([，；、])/g, "$1")
      .replace(/([，；、])\s+/g, "$1")
      .trim();
  }
  return word;
}

function inferPluralType(word, pluralForm) {
  if (!pluralForm) return "none";
  const value = String(pluralForm).replace(/^die\s+/i, "");
  const hasUmlaut = /[äöü]/i.test(value);
  if (value.endsWith("er")) return hasUmlaut ? "umlaut+er" : "-er";
  if (value.endsWith("en")) return "-en";
  if (value.endsWith("e")) return "-e";
  if (value.endsWith("s")) return "-s";
  return "∅";
}

function normalizeWordRecord(word) {
  if (!word) return word;
  word.de = word.de || word.word;
  word.zh = word.zh || word.translation;
  word.exampleDe = word.exampleDe || word.example || "";
  word.exampleZh = word.exampleZh || "";
  word.level = normalizeCefrLevel(word.level);
  word.levels = Array.isArray(word.levels) ? word.levels.map(normalizeCefrLevel) : [word.level || "A1"];
  if (word.confidence === undefined) {
    const source = String(word.source || word.book || "");
    word.confidence = source.includes("新求精") || source.includes("教材") ? 0.9 : source.includes("Goethe") || source.includes("歌德") ? 0.8 : 0.6;
  }
  word.confidenceLevel = Number(word.confidence) >= 0.8 ? "high" : "need-review";

  const forms = String(word.forms || "").trim();
  const parts = forms ? forms.split(/[,;，；]/).map(part => part.trim()).filter(Boolean) : [];
  if (word.pos === "noun") {
    word.pluralForm = word.pluralForm || word.plural || "";
    word.pluralType = word.pluralType || inferPluralType(word, word.pluralForm);
    word.nounEnding = word.nounEnding || (word.word.match(/(ung|heit|keit|schaft|ei|ie|chen|lein|er|en|e|s)$/i)?.[1] || "");
  }
  if (word.pos === "verb") {
    word.conj = word.conj || {
      inf: word.word,
      pr3sg: parts[0] || "",
      pret: parts[1] || "",
      perf: parts[2] || "",
      separable: /^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i.test(word.word),
      reflexive: /^sich\b/i.test(word.word) ? "sich" : false
    };
    word.pastTense = word.pastTense || word.conj.pret;
    word.participleII = word.participleII || (parts[2] || "").replace(/^(hat|ist)\s+/i, "");
    word.auxiliary = word.auxiliary || (parts[2] || "").match(/^(hat|ist)\b/i)?.[1]?.toLowerCase() || "";
    word.separablePrefix = word.separablePrefix || (/^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i.test(word.word) ? word.word.match(/^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i)[1] : false);
  }
  return word;
}

function splitWordEntries(word, split) {
  const slug = String(word.word).toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/^-+|-+$/g, "");
  return split.entries.map((entry, index) => ({
    id: `split-${slug}-${index + 1}`,
    word: entry.word,
    article: entry.article || null,
    plural: entry.plural || null,
    forms: entry.forms || "",
    pos: entry.pos || "other",
    translation: entry.translation,
    level: entry.level || word.level || "A1",
    topic: word.topic || "goethe",
    example: entry.example || "",
    exampleZh: entry.exampleZh || "",
    note: entry.note || "",
    source: `词条拆分（质量整改）${word.source ? ` · 原 ${word.source}` : ""}`,
    sourceRef: word.sourceRef || "",
    translationSource: "词条修正与数据质量整改方案",
    license: "个人学习使用"
  }));
}

function refreshWordIndex() {
  const seen = new Set();
  const keptByKey = new Map();
  allWordList = [];
  for (const word of [...TEXTBOOK_WORDS, ...WORDS, ...GOETHE_WORDS, ...OCR_VOCAB, ...OCR_CONTENT.words, ...state.customWords]) {
    if (!word || !word.id || !word.word) continue;
    const originalKey = `${word.article || ""}|${word.word}`;
    const split = WORD_SPLITS.find(item => item.from === originalKey);
    if (split) {
      for (const entry of splitWordEntries(word, split)) {
        normalizeWordRecord(entry);
        const key = `${String(entry.word).trim().toLocaleLowerCase("de")}|${entry.article || ""}`;
        if (seen.has(key)) continue;
        seen.add(key);
        keptByKey.set(key, entry);
        allWordList.push(entry);
      }
      continue;
    }
    fixWordData(word);
    normalizeWordRecord(word);
    if (WORD_BLACKLIST.has(`${word.article || ""}|${word.word}`)) continue;
    const key = `${String(word.word).trim().toLocaleLowerCase("de")}|${word.article || ""}`;
    if (seen.has(key)) {
      const kept = keptByKey.get(key);
      if (kept) {
        for (const field of ["article", "example", "exampleZh", "forms", "plural", "note"]) {
          if (!kept[field] && word[field]) kept[field] = word[field];
        }
      }
      continue;
    }
    seen.add(key);
    keptByKey.set(key, word);
    allWordList.push(word);
  }
  wordMap = new Map(allWordList.map(word => [word.id, word]));
  rebuildSearchIndex();
}

function foldSearch(value) {
  return normalize(value)
    .replace(/ue/g, "u")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a")
    .replace(/ss/g, "s");
}

function searchFormsFor(word) {
  const forms = new Set();
  const add = value => {
    if (!value) return;
    const text = String(value).trim();
    if (!text) return;
    forms.add(text);
    const cleaned = text.replace(/^(der|die|das|sich)\s+/i, "");
    forms.add(cleaned);
    if (cleaned.length > 4) {
      for (const suffix of ["ungen", "ung", "heiten", "heit", "keiten", "keit", "schaften", "schaft", "en", "er", "es", "em", "e", "n", "s", "st", "te", "ten", "t"]) {
        if (cleaned.endsWith(suffix) && cleaned.length - suffix.length >= 3) {
          forms.add(cleaned.slice(0, -suffix.length));
          break;
        }
      }
    }
  };
  add(word.word);
  add(word.de);
  add(word.translation);
  add(word.article);
  add(word.pluralForm || word.plural);
  add(word.nounEnding);
  add(word.separablePrefix);
  String(word.forms || "").split(/[,;，；]/).forEach(add);
  if (word.conj && typeof word.conj === "object") {
    Object.values(word.conj).forEach(add);
  }
  add(word.pastTense);
  add(word.participleII);
  add(word.example);
  add(word.exampleZh);

  // 名词：补格变化与复数变体，便于用 dem/des/den 形式搜索。
  const noun = String(word.word || word.de || "").replace(/^(der|die|das)\s+/i, "").trim();
  if (word.pos === "noun" && noun) {
    const plural = String(word.plural || word.pluralForm || "").replace(/^(der|die|das)\s+/i, "").trim();
    const article = String(word.article || "").toLowerCase();
    const genitive = /(s|ß|z|x|ch)$/i.test(noun) ? `${noun}es` : `${noun}s`;
    forms.add(`${noun}es`);
    forms.add(`${noun}s`);
    forms.add(`${noun}e`);
    forms.add(`${noun}en`);
    forms.add(`${noun}n`);
    if (plural) {
      forms.add(plural);
      forms.add(`${plural}n`);
      forms.add(plural.replace(/e$/, "en"));
    }
    if (article === "der" || article === "das") forms.add(`des ${genitive}`);
    if (article === "der") forms.add(`dem ${noun}`);
    if (plural) forms.add(`den ${plural.replace(/n$/, "")}n`);
  }

  // 形容词：补 -er/-e/-es/-en/-em 词尾，支持“形容词 + 名词”片段检索。
  if (word.pos === "adj") {
    const stem = String(word.word || "").trim();
    if (stem) for (const ending of ["e", "er", "es", "en", "em"]) forms.add(`${stem}${ending}`);
  }

  return [...forms].map(foldSearch).filter(Boolean);
}

function rebuildSearchIndex() {
  searchIndex = new Map(allWordList.map(word => [word.id, searchFormsFor(word).join(" ")]));
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j < current.length; j += 1) previous[j] = current[j];
  }
  return previous[b.length];
}

/**
 * 返回 0 表示不匹配；分数越高越接近用户意图。
 * 精准词头 > 词头前缀 > 变形/复数 > 释义/例句 > 模糊拼写。
 */
function scoreWordSearch(word, rawQuery) {
  const terms = foldSearch(rawQuery).split(/\s+/).filter(Boolean);
  if (!terms.length) return 1;
  const headwords = [word.word, word.de]
    .map(value => foldSearch(String(value || "").replace(/^(der|die|das|sich)\s+/i, "")))
    .filter(Boolean);
  const haystack = searchIndex.get(word.id) || "";
  const tokens = haystack.split(/\s+/).filter(Boolean);
  if (!haystack) return 0;

  let score = 0;
  for (const term of terms) {
    let termScore = 0;
    if (headwords.includes(term)) termScore = 130;
    else if (tokens.includes(term)) termScore = 112;
    else if (headwords.some(headword => headword.startsWith(term) || term.startsWith(headword))) termScore = 100;
    else if (haystack.includes(term)) termScore = 60;
    else if (term.length >= 4 && tokens.some(token => token.startsWith(term))) termScore = 55;
    else if (term.length >= 5 && tokens.some(token => token.length >= 5 && levenshtein(token, term) <= 1)) termScore = 40;
    else if (term.length >= 3 && tokens.some(token => token.length > term.length + 2 && token.includes(term))) termScore = 25;
    if (!termScore) return 0;
    score += termScore;
  }
  if (word.level) score += { A1: 6, A2: 5, B1: 4, B2: 3, C1: 2, C2: 1 }[word.level] || 0;
  return score;
}

function matchesWordSearch(word, rawQuery) {
  return scoreWordSearch(word, rawQuery) > 0;
}

function allWords() {
  return allWordList;
}

function getWord(id) {
  return wordMap.get(id) || null;
}

function getTopic(id) {
  return TOPIC_MAP[id] || TOPICS[0];
}

function reviewFor(id) {
  return state.reviews[id] || null;
}

function statusFor(word) {
  const review = reviewFor(word.id);
  if (!review) return "new";
  if (review.status === "mastered" && (review.reps ?? review.repetition) >= 3) return "mastered";
  return "learning";
}

function isDue(word, now = Date.now()) {
  const review = reviewFor(word.id);
  const due = review?.due ?? review?.nextReviewDate;
  return Boolean(review && due && due <= endOfDay(now).getTime());
}

function isDueNow(word, now = Date.now()) {
  const review = reviewFor(word.id);
  const due = review?.due ?? review?.nextReviewDate;
  return Boolean(review && due && due <= now);
}

function getMetrics() {
  const words = allWords();
  const now = Date.now();
  const today = dayKey(now);
  const reviews = Object.values(state.reviews);
  const mastered = words.filter(word => statusFor(word) === "mastered").length;
  const learning = words.filter(word => statusFor(word) === "learning").length;
  const fresh = words.length - mastered - learning;
  const dueToday = words.filter(word => isDue(word, now));
  const dueNow = words.filter(word => isDueNow(word, now));
  const todayCount = state.activity[today] || 0;
  const totalReviews = Number(state.stats.reviews) || 0;
  const correct = Number(state.stats.correct) || 0;
  const accuracy = totalReviews > 0 ? Math.round((correct / totalReviews) * 100) : 0;
  return {
    words,
    total: words.length,
    mastered,
    learning,
    fresh,
    dueToday,
    dueNow,
    todayCount,
    totalReviews,
    correct,
    accuracy,
    streak: calculateStreak(),
    goal: Math.max(1, Number(state.settings.dailyGoal) || 20)
  };
}

function calculateStreak(now = Date.now()) {
  let cursor = startOfDay(now).getTime();
  if (!state.activity[dayKey(cursor)]) {
    cursor -= DAY_MS;
  }
  let streak = 0;
  for (let i = 0; i < 3650; i += 1) {
    if (state.activity[dayKey(cursor)] > 0) {
      streak += 1;
      cursor -= DAY_MS;
    } else {
      break;
    }
  }
  return streak;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem("settings_v2", JSON.stringify(state.settings || {}));
    localStorage.setItem("favorites_v1", JSON.stringify(state.favorites || []));
    localStorage.setItem("mistakes_v1", JSON.stringify(state.mistakes || {}));
  } catch {
    showToast("浏览器存储空间不足，进度可能无法保存。");
  }
}

/* ─────────────────────────── Spaced repetition ─────────────────────────── */

function scheduleReview(previous, rating, now = Date.now()) {
  const base = previous
    ? {
        reps: Number(previous.reps ?? previous.repetition) || 0,
        interval: Number(previous.interval) || 0,
        ease: Number(previous.ease ?? previous.easiness) || 2.5,
        lapses: Number(previous.lapses) || 0
      }
    : { reps: 0, interval: 0, ease: 2.5, lapses: 0 };

  let { reps, interval, ease, lapses } = base;

  if (rating === "again") {
    reps = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
    interval = 1;
  } else if (rating === "hard") {
    reps += 1;
    ease = Math.max(1.3, ease - 0.12);
    interval = base.reps === 0 ? 0.5 : Math.max(0.5, base.interval * 1.2);
  } else if (rating === "good") {
    if (base.reps === 0) {
      interval = 1;
    } else if (base.reps === 1) {
      interval = 3;
    } else {
      interval = Math.max(1, base.interval * Math.max(1.3, ease));
    }
    reps += 1;
  } else {
    if (base.reps === 0) {
      interval = 4;
    } else {
      interval = Math.max(4, base.interval * Math.max(1.3, ease) * 1.3);
    }
    reps += 1;
    ease = Math.min(3.2, ease + 0.12);
  }

  const due = now + Math.round(interval * DAY_MS);
  const status = interval >= 21 && reps >= 4 ? "mastered" : "learning";

  return {
    reps,
    repetition: reps,
    interval: round(interval, 4),
    ease: round(ease, 2),
    easiness: round(ease, 2),
    lapses,
    due,
    nextReviewDate: due,
    last: now,
    grade: RATING_SCORES[rating] || 0,
    status
  };
}

function previewInterval(rating) {
  if (!session) return 1;
  const word = session.queue[session.index];
  if (!word) return 1;
  return scheduleReview(reviewFor(word.id), rating).interval;
}

/* ─────────────────────────── Queue building ─────────────────────────── */

function sortByDue(a, b) {
  const ra = reviewFor(a.id);
  const rb = reviewFor(b.id);
  return (ra?.due ?? ra?.nextReviewDate ?? 0) - (rb?.due ?? rb?.nextReviewDate ?? 0);
}

function buildQueue(mode = "daily", topicId = null, limit = 12, wordId = null, level = "all") {
  const now = Date.now();
  let pool = allWords();
  if (level && level !== "all") pool = pool.filter(word => normalizeCefrLevel(word.level) === normalizeCefrLevel(level));
  if (topicId) pool = pool.filter(word => word.topic === topicId);

  if (wordId) {
    const chosen = getWord(wordId);
    return chosen ? [chosen] : [];
  }

  const due = shuffle(pool.filter(word => isDue(word, now)).sort(sortByDue));
  const fresh = shuffle(pool.filter(word => !reviewFor(word.id)));
  const later = pool
    .filter(word => reviewFor(word.id) && !isDue(word, now))
    .sort(sortByDue);

  let queue = [];

  if (mode === "review") {
    queue = due;
  } else if (mode === "new") {
    queue = fresh;
  } else if (mode === "weak") {
    queue = [...pool]
      .filter(word => reviewFor(word.id) || state.mistakes[word.id])
      .sort((a, b) => {
        const ra = reviewFor(a.id);
        const rb = reviewFor(b.id);
        const ma = (ra?.lapses || 0) * 3 + (state.mistakes[a.id] || 0) * 2;
        const mb = (rb?.lapses || 0) * 3 + (state.mistakes[b.id] || 0) * 2;
        if (mb !== ma) return mb - ma;
        return (ra?.interval || 0) - (rb?.interval || 0);
      });
    if (queue.length < 4) {
      queue = [...queue, ...due, ...fresh, ...later].filter((word, index, arr) => arr.findIndex(w => w.id === word.id) === index);
    }
  } else {
    queue = [...due, ...fresh];
  }

  if (!queue.length && mode !== "new" && mode !== "review") {
    queue = [...due, ...fresh, ...later];
  }

  return queue.slice(0, limit);
}

/* ─────────────────────────── View routing ─────────────────────────── */

const VIEW_LABELS = {
  home: "今日学习",
  culture: "德国历史与文化",
  reading: "文章阅读",
  phrases: "短语积累",
  words: "单词积累",
  grammar: "语法学习",
  quiz: "题库测验",
  stats: "学习进度",
  study: "学习卡片"
};

function setView(view) {
  $$(".view").forEach(section => {
    section.classList.toggle("is-active", section.dataset.view === view);
  });
  $$(".side-link, .bottom-nav button").forEach(button => {
    button.classList.toggle("is-active", view !== "study" && button.dataset.nav === view);
  });
  const crumb = $("#crumb-current");
  if (crumb) crumb.textContent = VIEW_LABELS[view] || "Wortkarte";
  document.body.classList.toggle("is-studying", view === "study");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function navigate(view) {
  if (view === "library") view = "words";
  if (!VIEW_LABELS[view] || view === "study") return;
  closeModal();
  stopStudyTimer();
  session = null;
  $("#study-summary")?.classList.add("hidden");
  $("#study-stage")?.classList.remove("hidden");
  $("#view-study")?.classList.remove("is-revealed");
  setView(view);

  if (view === "home") renderHome();
  if (view === "words") renderLibrary();
  if (view === "reading") renderReading();
  if (view === "phrases") renderPhrases();
  if (view === "grammar") renderGrammar();
  if (view === "culture") renderCulture();
  if (view === "stats") renderStats();
  if (view === "quiz") resetQuizSetup();
}

/* ─────────────────────────── Toasts / modals ─────────────────────────── */

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.innerHTML = `${icon("check")}<span>${esc(message)}</span>`;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function openModal(html, className = "") {
  const root = $("#modal-root");
  root.innerHTML = `<div class="modal-dialog ${esc(className)}" role="document">${html}</div>`;
  root.hidden = false;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const focusTarget = root.querySelector("input:not([type=hidden]), textarea, select, button");
    focusTarget?.focus({ preventScroll: true });
  }, 40);
}

function closeModal() {
  const root = $("#modal-root");
  if (!root || root.hidden) return;
  root.hidden = true;
  root.innerHTML = "";
  document.body.style.overflow = "";
}

/* ─────────────────────────── Speech ─────────────────────────── */

let germanVoice = null;

function pickGermanVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  germanVoice =
    voices.find(voice => /^de[-_]DE/i.test(voice.lang)) ||
    voices.find(voice => /^de/i.test(voice.lang)) ||
    null;
}

if ("speechSynthesis" in window) {
  pickGermanVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", pickGermanVoice);
  window.speechSynthesis.onvoiceschanged = pickGermanVoice;
}

function speakText(text, button = null) {
  if (!("speechSynthesis" in window)) {
    showToast("这个浏览器不支持语音朗读。");
    return;
  }
  if (!text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  if (germanVoice) utterance.voice = germanVoice;
  if (button) {
    button.classList.add("is-speaking");
    utterance.onend = () => button.classList.remove("is-speaking");
    utterance.onerror = () => button.classList.remove("is-speaking");
  }
  window.speechSynthesis.speak(utterance);
}

function currentSessionWord() {
  if (!session) return null;
  return session.queue[session.index] || null;
}

function speakCurrentWord(button) {
  const word = currentSessionWord();
  if (!word) return;
  speakText(wordDisplay(word), button);
}

/* ─────────────────────────── Home render ─────────────────────────── */

function renderChrome() {
  const metrics = getMetrics();
  $("#top-streak").textContent = metrics.streak;
  $("#mobile-streak").textContent = metrics.streak;
  $("#profile-name").textContent = state.settings.name || "Lena";
  $("#profile-avatar").textContent = (state.settings.name || "L").trim().charAt(0).toUpperCase() || "L";
  const profileSubtitle = $("#profile-subtitle");
  if (profileSubtitle) {
    profileSubtitle.textContent = state.meta.demo ? "演示档案 · 本地保存" : "本地学习档案";
  }
  const localNote = $("#local-note-text");
  if (localNote) {
    localNote.textContent = state.meta.demo
      ? "这是一份演示进度，只保存在你的浏览器里。可在设置中重置，或直接开始添加自己的词卡。"
      : "所有学习记录只保存在你的浏览器里。没有账号，也没有云端。";
  }

  const dueBadge = $("#nav-due-badge");
  if (dueBadge) {
    dueBadge.hidden = metrics.dueToday.length === 0;
    dueBadge.textContent = metrics.dueToday.length > 99 ? "99+" : metrics.dueToday.length;
  }
  $("#side-due-count").textContent = metrics.dueToday.length;

  const wordCount = allWords().length;
  $$("[data-word-count]").forEach(el => {
    el.textContent = wordCount;
  });
}

function renderHome() {
  const metrics = getMetrics();
  const now = Date.now();
  const date = new Date(now);
  const hour = date.getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  $("#home-date").textContent = `${WEEKDAYS_DE[date.getDay()].toUpperCase()} · ${date.getDate()}. ${MONTHS_DE[date.getMonth()].toUpperCase()}`;
  $("#home-greeting").textContent = greeting;

  const due = metrics.dueToday.length;
  const fresh = metrics.fresh;
  const dailyQueue = buildQueue("daily", null, 12);
  const dueInQueue = dailyQueue.filter(word => isDue(word)).length;
  const minutes = Math.max(1, Math.ceil(dailyQueue.length * 0.65));

  let subline = "今天也让德语靠近一点。";
  if (metrics.totalReviews === 0 && due === 0) subline = "词库已初始化：从《新求精》的 12 个新词开始。";
  else if (due > 0) subline = `今天有 ${due} 张卡片到期，先复习，再认识几个新词。`;
  else if (fresh > 0) subline = `到期卡片都清空了。今天适合认识新词。`;
  else subline = "所有卡片都安排好了。休息也是一种学习。";
  $("#home-subline").textContent = subline;

  let heroTitle;
  let heroLine;
  if (due > 0) {
    heroTitle = `${dueInQueue} Wörter<br><em>warten auf dich.</em>`;
    const newInQueue = Math.max(0, dailyQueue.length - dueInQueue);
    heroLine = `先复习 ${dueInQueue} 张到期卡片${newInQueue > 0 ? `，再认识 ${newInQueue} 个新词` : ""}。大约 ${minutes} 分钟。`;
  } else if (fresh > 0) {
    const newToday = Math.min(fresh, 12);
    heroTitle = `${newToday} neue Wörter<br><em>für heute.</em>`;
    heroLine = `没有到期的卡片。用 ${newToday} 个新词，给今天开个小口子。`;
  } else {    heroTitle = `Alles<br><em>im grünen Bereich.</em>`;
    heroLine = "今天的复习已经完成。可以再复习一组，或者让记忆休息。";
  }
  $("#hero-title").innerHTML = heroTitle;
  $("#hero-line").textContent = heroLine;
  $("#hero-orbit-count").textContent = due || Math.min(fresh, 12);
  $("#hero-orbit-label").textContent = due ? "fällig" : "neu";
  $("#hero-time").textContent = `约 ${Math.max(1, Math.ceil(dailyQueue.length * 0.65))} 分钟`;
  const ctaLabel = $("#hero-cta span");
  if (ctaLabel) ctaLabel.textContent = due > 0 ? "开始考察" : fresh > 0 ? "认识新词" : "再学一组";

  const percent = Math.min(100, Math.round((metrics.todayCount / metrics.goal) * 100));
  $("#daily-count").textContent = metrics.todayCount;
  $("#daily-goal").textContent = metrics.goal;
  $("#daily-ring").style.strokeDashoffset = String(RING_SMALL * (1 - percent / 100));
  $("#daily-streak").textContent = metrics.streak;
  const remaining = Math.max(0, metrics.goal - metrics.todayCount);
  $("#daily-note").textContent =
    metrics.todayCount === 0
      ? "今天的第一张卡片，等你翻开。"
      : remaining > 0
        ? `还差 ${remaining} 个词，今天的目标就完成了。`
        : "今日目标完成。可以再多学一点，或让记忆休息。";

  $("#stat-mastered").textContent = metrics.mastered;
  $("#stat-mastered-note").textContent = `占全部 ${metrics.total ? Math.round((metrics.mastered / metrics.total) * 100) : 0}%`;
  $("#stat-today").textContent = metrics.todayCount;
  $("#stat-today-note").textContent = `目标 ${metrics.goal}`;
  $("#stat-accuracy").textContent = metrics.accuracy;
  $("#stat-accuracy-note").textContent = `共 ${metrics.totalReviews} 次评价`;

  renderWeekStrip(metrics);
  renderDecks(metrics);
  renderPackBanner();
  renderWeekChart();
  renderDueList(metrics);
  renderWordOfDay();
  renderWeeklyQuiz();
  renderRepeatReview();
  renderChrome();
}

function getDictionaryPack() {
  const pack = window.WORTKARTE_DICTIONARY;
  if (!pack || !pack.levels || typeof pack.levels !== "object") return null;
  const levels = Object.entries(pack.levels).filter(([, data]) => data && Array.isArray(data.words) && data.words.length);
  if (!levels.length) return null;
  return { ...pack, levelEntries: levels };
}

function packKey(word) {
  return `${String(word.word || "").trim().toLocaleLowerCase("de")}|${word.article || ""}`;
}

function importedPackWords() {
  return state.customWords.filter(word => word.pack);
}

function packStatus() {
  const pack = getDictionaryPack();
  if (!pack) return null;
  const existing = new Set(allWords().map(packKey));
  let available = 0;
  let present = 0;
  const levels = pack.levelEntries.map(([level, data]) => {
    let levelPresent = 0;
    for (const word of data.words) {
      available += 1;
      if (existing.has(packKey(word))) {
        present += 1;
        levelPresent += 1;
      }
    }
    return {
      level,
      label: data.label || `Goethe-Zertifikat ${level}`,
      total: data.sourceTotal || data.words.length,
      translated: data.words.length,
      present: levelPresent,
      remaining: data.words.length - levelPresent
    };
  });
  return { pack, levels, available, present, remaining: available - present };
}

function renderPackBanner() {
  const banner = $("#pack-banner");
  if (!banner) return;
  const status = packStatus();
  if (!status) {
    banner.hidden = true;
    return;
  }
  const imported = importedPackWords();
  if (TEXTBOOK_WORDS.length && !imported.length) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  const due = imported.filter(word => isDue(word)).length;
  const levelNames = status.levels.map(item => item.level).join(" / ");
  $("#pack-subtitle").textContent = imported.length
    ? `已导入 ${imported.length} 个官方词条${due ? `，其中 ${due} 个今天到期` : "，可以继续扩展词汇量。"}`
    : `官方词表中已有 ${status.available} 个带中文释义的 ${levelNames} 词，可分批导入。`;
  $("#pack-meta").innerHTML = status.levels.map(item => `
    <span><strong>${esc(item.level)}</strong> ${item.present} / ${item.translated}</span>
  `).join("") + `<span>可用 <strong>${status.available}</strong></span>`;
  const startButton = $('#pack-banner [data-action="start-pack"]');
  if (startButton) startButton.textContent = imported.length ? "学习词表" : "选择词表";
}

function openDictionaryModal() {
  const status = packStatus();
  if (!status) {
    openModal(`
      <div class="modal-head">
        <div>
          <p class="eyebrow">OFFIZIELLER WORTSCHATZ</p>
          <h2>官方词表未生成</h2>
          <p>还没有找到本地词表包。</p>
        </div>
        <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
      </div>
      <div class="dict-source-note">
        <strong>生成方式</strong>
        <p>运行 <code>python tools/build_dictionary_pack.py</code> 生成 <code>dictionary-pack.js</code>，刷新页面后即可导入。</p>
      </div>
      <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
    `);
    return;
  }

  const content = `
    <div class="modal-head">
      <div>
        <p class="eyebrow">GOETHE-INSTITUT · DWDS</p>
        <h2>官方词表</h2>
        <p>导入歌德证书 A1–C2 分级词汇，中文释义来自本地总表。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="dict-intro">
      <span class="dict-intro-icon">${icon("book")}</span>
      <div>
        <strong>歌德证书 A1–C2 词汇</strong>
        <p>德语词头、词性、冠词与中文释义来自本地总表。A1 / A2 / B1 为歌德官方 Wortliste，B2 与 C1 为备考教材词表；原表没有单独列 C2，C1 高阶词覆盖 C2 需求。个别词形由版式自动判定，建议在词卡详情中核对。</p>
      </div>
    </div>
    <div class="dict-levels">
      ${status.levels.map(item => {
        const percent = item.translated ? Math.round((item.present / item.translated) * 100) : 0;
        const done = item.remaining === 0;
        return `
          <div class="dict-level-row">
            <span class="dict-level-badge">${esc(item.level)}</span>
            <span class="dict-level-copy">
              <strong>${esc(item.label)}</strong>
              <small>${item.translated} 个带中文 · 已存在 ${item.present} 个 · 原词表 ${item.total} 个实词</small>
            </span>
            <span class="dict-level-progress"><i style="width:${percent}%"></i></span>
            <button class="btn btn-ghost" data-modal-action="import-pack" data-level="${esc(item.level)}" ${done ? "disabled" : ""}>${done ? "已导入" : item.present ? "继续导入" : "导入"}</button>
          </div>
        `;
      }).join("")}
    </div>
    <div class="dict-source-note">
      <strong>词表来源</strong>
      <p>A1–C1 词条与中文释义来自用户提供的《德语单词总表_歌德分级A1-C2.xlsx》。A1/A2/B1 依据歌德官方 Wortliste；B2 使用 Klett《Aspekte neu B2》备考词表；C1 使用 Praxis《Werkstatt C1》词表，并覆盖 C2 高阶需求。</p>
      <p>歌德词表 © Goethe-Institut；教材级词表版权归原出版社所有。词表包仅用于个人学习，请勿再分发。</p>
      <div class="dict-source-links">
        <a href="https://www.goethe.de/" target="_blank" rel="noopener noreferrer">Goethe-Institut</a>
        <a href="https://www.klett-sprachen.de/" target="_blank" rel="noopener noreferrer">Klett</a>
      </div>
      <p class="dict-license">词表包生成于 ${esc(status.pack.generatedAt || "—")} · 本地保存，不会上传。已存在的词条会自动跳过。</p>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>关闭</button>
      <button class="btn btn-primary" data-modal-action="import-all-packs" ${status.remaining === 0 ? "disabled" : ""}>${status.remaining ? `导入全部（${status.remaining}）` : "全部已导入"}</button>
    </div>
  `;
  openModal(content);
}

function importDictionaryLevels(levelsToImport) {
  const pack = getDictionaryPack();
  if (!pack) return;
  const wanted = new Set(levelsToImport);
  const existingIds = new Set(allWords().map(word => word.id));
  const existingKeys = new Set(allWords().map(packKey));
  let added = 0;
  let skipped = 0;

  for (const [level, data] of pack.levelEntries) {
    if (!wanted.has(level)) continue;
    for (const word of data.words) {
      if (existingIds.has(word.id) || existingKeys.has(packKey(word))) {
        skipped += 1;
        continue;
      }
      state.customWords.push({
        ...word,
        custom: true,
        pack: true,
        topic: "goethe"
      });
      existingIds.add(word.id);
      existingKeys.add(packKey(word));
      added += 1;
    }
  }

  refreshWordIndex();
  persist();
  renderAll();
  openDictionaryModal();
  if (added) {
    showToast(`已导入 ${added} 个官方词条${skipped ? `，跳过 ${skipped} 个已有词` : ""}。`);
  } else {
    showToast("这些词已经在你的词库里了。");
  }
}

function startPackStudy() {
  const imported = importedPackWords();
  if (!imported.length) {
    openDictionaryModal();
    return;
  }
  startStudy({ mode: "daily", topicId: "goethe", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
}

function renderGrammar() {
  const grid = $("#grammar-grid");
  if (!grid) return;
  if (!GRAMMAR_DATA.length) {
    grid.innerHTML = `<div class="library-empty"><h3>语法卡还没有加载</h3><p>请确认 grammar.js 已正确引入。</p></div>`;
    return;
  }
  const seen = new Set(state.grammar?.seen || []);
  const topics = GRAMMAR_DATA.filter(topic => grammarLevel === "all" || topic.level === grammarLevel);
  const exerciseCount = topics.reduce((sum, topic) => sum + topic.exercises.length, 0);
  $("#grammar-seen").textContent = seen.size;
  $("#grammar-total").textContent = GRAMMAR_DATA.length + (OCR_CONTENT.grammar?.length || 0);
  $("#grammar-count").textContent = `${topics.length} 个主题 · ${exerciseCount} 道小练习${OCR_CONTENT.grammar?.length ? ` · ${OCR_CONTENT.grammar.length} 张 OCR 卡` : ""}`;
  const bookMeta = $("#grammar-book-meta");
  if (bookMeta && GRAMMAR_SUMMARY_DATA) {
    bookMeta.textContent = `${GRAMMAR_SUMMARY_DATA.chapters.length} 章 · ${GRAMMAR_SUMMARY_DATA.tableCount} 张表格 · 从发音、格变到从句的完整参考`;
  }
  $$("#grammar-filter [data-grammar-level]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.grammarLevel === grammarLevel);
  });

  grid.innerHTML = topics.map((topic, index) => {
    const isSeen = seen.has(topic.id);
    return `
      <button class="grammar-card ${isSeen ? "is-seen" : ""}" data-grammar-id="${esc(topic.id)}">
        <span class="grammar-card-top">
          <span class="level-chip ${topic.level === "A2" ? "advanced" : ""}">${esc(topic.level)}</span>
          <span class="grammar-index">${String(index + 1).padStart(2, "0")}</span>
        </span>
        <h3>${esc(topic.title)}</h3>
        <p class="grammar-de">${esc(topic.de)}</p>
        <p class="grammar-summary">${esc(topic.summary)}</p>
        <span class="grammar-card-foot">
          <span>${topic.sections.length} 个要点</span>
          <span>·</span>
          <span>${topic.exercises.length} 道练习</span>
          <span class="grammar-seen-mark">${icon("check")} 已读</span>
        </span>
      </button>
    `;
  }).join("");
  if (Array.isArray(state.customGrammar) && state.customGrammar.length) {
    grid.innerHTML += state.customGrammar.map(item => `
      <article class="grammar-card custom-grammar-card">
        <span class="grammar-card-top"><span class="level-chip">导入</span></span>
        <h3>${esc(item.title)}</h3>
        <p class="grammar-summary">${esc(item.summary || "")}</p>
      </article>
    `).join("");
  }
  if (Array.isArray(OCR_CONTENT.grammar) && OCR_CONTENT.grammar.length) {
    grid.innerHTML += OCR_CONTENT.grammar.map(item => `
      <article class="grammar-card custom-grammar-card">
        <span class="grammar-card-top"><span class="level-chip">OCR</span></span>
        <h3>${esc(item.title)}</h3>
        <p class="grammar-summary">${esc(item.summary || "")}</p>
        <small>${esc(item.source || "")}</small>
      </article>
    `).join("");
  }
}

function openGrammarModal(id) {
  const topic = GRAMMAR_DATA.find(item => item.id === id);
  if (!topic) return;
  if (!state.grammar.seen.includes(id)) {
    state.grammar.seen.push(id);
    persist();
  }
  renderGrammar();

  const sections = topic.sections.map(section => {
    const examples = section.examples?.length
      ? `<div class="grammar-examples">${section.examples.map(example => `
          <div class="grammar-example"><strong>${esc(example.de)}</strong><span>${esc(example.zh)}</span></div>
        `).join("")}</div>`
      : "";
    const table = section.table
      ? `<table class="grammar-table"><thead><tr>${section.table.headers.map(header => `<th>${esc(header)}</th>`).join("")}</tr></thead><tbody>${section.table.rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      : "";
    return `
      <section class="grammar-section">
        <h4>${esc(section.heading)}</h4>
        <p>${esc(section.body)}</p>
        ${table}
        ${examples}
      </section>
    `;
  }).join("");

  const exercises = topic.exercises.map((exercise, index) => {
    const key = `${topic.id}-e${index}`;
    const solved = (state.grammar.correct || []).includes(key);
    return `
      <div class="grammar-exercise" data-topic="${esc(topic.id)}" data-exercise="${index}" ${solved ? 'data-answered="1"' : ""}>
        <p class="grammar-question">${index + 1}. ${esc(exercise.q)}</p>
        <div class="grammar-options">
          ${exercise.options.map((option, optionIndex) => {
            const correct = solved && optionIndex === exercise.answer;
            return `<button class="grammar-option ${correct ? "is-correct" : ""}" data-grammar-option="${optionIndex}" ${solved ? "disabled" : ""}>${esc(option)}</button>`;
          }).join("")}
        </div>
        <p class="grammar-explain ${solved ? "is-correct" : "hidden"}">${solved ? esc(exercise.explain) : ""}</p>
      </div>
    `;
  }).join("");

  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">GRAMMATIK · ${esc(topic.level)}</p>
        <h2>${esc(topic.title)}</h2>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="grammar-hero">
      <p class="eyebrow">${esc(topic.level)} · GRAMMATIK</p>
      <h3>${esc(topic.de)}</h3>
      <p class="grammar-de">${esc(topic.title)}</p>
      <p>${esc(topic.summary)}</p>
    </div>
    ${sections}
    <div class="grammar-exercises">
      <div class="grammar-exercises-head"><h4>小练习</h4><span>选出最合适的一项</span></div>
      ${exercises}
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" data-close>读完了</button>
    </div>
  `);
}

function answerGrammar(button) {
  const exerciseEl = button.closest(".grammar-exercise");
  if (!exerciseEl || exerciseEl.dataset.answered === "1") return;
  const topic = GRAMMAR_DATA.find(item => item.id === exerciseEl.dataset.topic);
  const exercise = topic?.exercises[Number(exerciseEl.dataset.exercise)];
  if (!exercise) return;
  const chosen = Number(button.dataset.grammarOption);
  const correct = chosen === exercise.answer;
  exerciseEl.dataset.answered = "1";
  const buttons = $$(".grammar-option", exerciseEl);
  buttons.forEach((option, index) => {
    option.disabled = true;
    if (index === exercise.answer) option.classList.add("is-correct");
    if (index === chosen && !correct) option.classList.add("is-wrong");
    if (index !== chosen && index !== exercise.answer) option.classList.add("is-dimmed");
  });
  const explain = $(".grammar-explain", exerciseEl);
  explain.textContent = exercise.explain;
  explain.classList.remove("hidden");
  explain.classList.add(correct ? "is-correct" : "is-wrong");
  explain.scrollIntoView({ block: "nearest", behavior: "smooth" });
  if (correct) {
    const key = `${topic.id}-e${exerciseEl.dataset.exercise}`;
    if (!state.grammar.correct.includes(key)) {
      state.grammar.correct.push(key);
      persist();
    }
  }
}

function summaryBlockHtml(block) {
  if (!block || !block.type) return "";
  if (block.type === "p") return `<p>${block.html || ""}</p>`;
  if (block.type === "list") {
    return `<ul>${(block.items || []).map(item => `<li>${item}</li>`).join("")}</ul>`;
  }
  if (block.type === "table") {
    const head = block.headers?.length
      ? `<thead><tr>${block.headers.map(cell => `<th>${cell}</th>`).join("")}</tr></thead>`
      : "";
    const body = (block.rows || []).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
    return `<div class="reader-table-wrap"><table class="reader-table">${head}<tbody>${body}</tbody></table></div>`;
  }
  return "";
}

function openGrammarBook() {
  if (!GRAMMAR_SUMMARY_DATA) {
    showToast("语法总结数据还没有生成。");
    return;
  }
  const toc = GRAMMAR_SUMMARY_DATA.chapters.map(chapter => `
    <button class="reader-toc-chapter" data-grammar-jump="summary-${esc(chapter.id)}">
      <span>${esc(chapter.number || "§")}</span>${esc(chapter.title)}
    </button>
    ${chapter.sections.map(section => section.title && section.title !== "正文"
      ? `<button class="reader-toc-section" data-grammar-jump="summary-${esc(section.id)}">${esc(section.number ? `${section.number} ` : "")}${esc(section.title)}</button>`
      : "").join("")}
  `).join("");

  const intro = (GRAMMAR_SUMMARY_DATA.intro || []).map(summaryBlockHtml).join("");
  const chapters = GRAMMAR_SUMMARY_DATA.chapters.map(chapter => `
    <section class="reader-chapter" id="summary-${esc(chapter.id)}">
      <div class="reader-chapter-head">
        <span class="reader-chapter-number">${esc(chapter.number || "§")}</span>
        <h2>${esc(chapter.title)}</h2>
      </div>
      ${chapter.sections.map(section => `
        <section class="reader-section" id="summary-${esc(section.id)}">
          ${section.title && section.title !== "正文" ? `<h3>${section.number ? `<span class="reader-section-number">${esc(section.number)}</span>` : ""}${esc(section.title)}</h3>` : ""}
          ${(section.blocks || []).map(summaryBlockHtml).join("")}
        </section>
      `).join("")}
    </section>
  `).join("");

  openModal(`
    <div class="grammar-reader">
      <aside class="grammar-reader-toc">
        <div class="reader-toc-brand">
          <p class="eyebrow">GRAMMATIK</p>
          <strong>${esc(GRAMMAR_SUMMARY_DATA.title)}</strong>
          <small>${GRAMMAR_SUMMARY_DATA.chapters.length} 章 · ${GRAMMAR_SUMMARY_DATA.tableCount} 张表格</small>
        </div>
        <nav class="reader-toc-nav" aria-label="语法总结目录">${toc}</nav>
      </aside>
      <div class="grammar-reader-main">
        <header class="grammar-reader-top">
          <div><p class="eyebrow">VOLLSTÄNDIGE GRAMMATIK</p><strong>${esc(GRAMMAR_SUMMARY_DATA.title)}</strong></div>
          <button class="reader-close" data-close aria-label="关闭语法书">${icon("close")}</button>
        </header>
        <div class="grammar-reader-content">
          <article class="reader-article">
            ${intro ? `<div class="reader-intro">${intro}</div>` : ""}
            ${chapters}
            <p class="reader-source">来源：${esc(GRAMMAR_SUMMARY_DATA.source || "用户提供的语法总结")}。内容按原文章节整理，仅用于个人学习。</p>
          </article>
        </div>
      </div>
    </div>
  `, "reader-dialog");
}

function renderCulture() {
  const grid = $("#culture-grid");
  if (!grid) return;
  const labels = Object.fromEntries((CULTURE_DATA.categories || []).map(item => [item.id, item.label]));
  const items = CULTURE_DATA.items.filter(item => cultureCategory === "all" || item.category === cultureCategory);
  $("#culture-count").textContent = CULTURE_DATA.items.length;
  $("#culture-meta").textContent = `${items.length} 条 · ${labels[cultureCategory] || "全部"}`;
  $$("#culture-filter [data-culture-category]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.cultureCategory === cultureCategory);
  });
  if (!items.length) {
    grid.innerHTML = `<div class="library-empty"><h3>这个分类还没有内容</h3><p>换一个分类看看。</p></div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <article class="culture-card ${esc(item.category)}">
      <div class="culture-kicker">
        <span>${esc(labels[item.category] || item.category)}</span>
        ${item.year ? `<strong>${esc(item.year)}</strong>` : ""}
      </div>
      <h2>${esc(item.titleZh)}</h2>
      <p class="culture-title-de">${esc(item.titleDe)}</p>
      <p>${esc(item.contentZh)}</p>
      <details class="culture-de">
        <summary>德语原文</summary>
        <p>${esc(item.contentDe)}</p>
      </details>
      <div class="culture-sources">
        ${(item.sources || []).map(source => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>`).join("")}
        <span>${Math.round((Number(item.confidence) || 0.8) * 100)}% 可信度</span>
      </div>
    </article>
  `).join("");
}

function renderWeekStrip(metrics) {
  const container = $("#week-strip");
  if (!container) return;
  const todayStart = startOfDay().getTime();
  const cells = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const ts = todayStart - offset * DAY_MS;
    const d = new Date(ts);
    const has = (state.activity[dayKey(ts)] || 0) > 0;
    const isToday = offset === 0;
    cells.push(`
      <div class="week-day ${has ? "has-activity" : ""} ${isToday ? "is-today" : ""}" title="${dayKey(ts)} · ${state.activity[dayKey(ts)] || 0} 次复习">
        <span>${WEEKDAYS_ZH[d.getDay()]}</span>
        <i>${d.getDate()}</i>
      </div>
    `);
  }
  container.innerHTML = cells.join("");
}

function renderDecks(metrics) {
  const container = $("#deck-grid");
  if (!container) return;
  container.innerHTML = TOPICS.filter(topic => !topic.isPack).map(topic => {
    const words = allWords().filter(word => word.topic === topic.id);
    const mastered = words.filter(word => statusFor(word) === "mastered").length;
    const percent = words.length ? Math.round((mastered / words.length) * 100) : 0;
    return `
      <button class="deck-card" data-action="start-topic" data-topic="${topic.id}" style="--deck-color:${topic.color};--deck-soft:${topic.soft}" aria-label="学习 ${topic.name}">
        <span class="deck-letter">${topic.letter}</span>
        <span class="deck-top">
          <span class="deck-icon">${icon(topic.icon)}</span>
          <span class="deck-count">${words.length} WÖRTER</span>
        </span>
        <span class="deck-arrow">${icon("arrow-right")}</span>
        <h3>${esc(topic.name)}</h3>
        <span class="deck-de">${esc(topic.de)}</span>
        <span class="deck-progress">
          <span class="deck-progress-row"><span>已掌握 ${mastered}</span><span>${percent}%</span></span>
          <span class="deck-track"><i style="width:${percent}%"></i></span>
        </span>
      </button>
    `;
  }).join("");
}

function renderWeekChart() {
  const container = $("#week-chart");
  if (!container) return;
  const todayStart = startOfDay().getTime();
  const entries = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const ts = todayStart - offset * DAY_MS;
    entries.push({ ts, count: state.activity[dayKey(ts)] || 0, isToday: offset === 0 });
  }
  const max = Math.max(1, ...entries.map(entry => entry.count));
  container.innerHTML = entries.map(entry => {
    const d = new Date(entry.ts);
    const height = Math.max(4, Math.round((entry.count / max) * 100));
    return `
      <div class="week-bar ${entry.isToday ? "is-today" : ""} ${entry.count === 0 ? "is-empty" : ""}">
        <span class="week-bar-value">${entry.count || ""}</span>
        <span class="week-bar-track"><i class="week-bar-fill" style="height:${height}%"></i></span>
        <span class="week-bar-day">${WEEKDAYS_ZH[d.getDay()]}</span>
      </div>
    `;
  }).join("");

  const thisWeek = entries.reduce((sum, entry) => sum + entry.count, 0);
  const previous = Array.from({ length: 7 }, (_, index) => state.activity[dayKey(todayStart - (7 + index) * DAY_MS)] || 0)
    .reduce((sum, count) => sum + count, 0);
  $("#week-total").textContent = `${thisWeek} 词`;
  const compare = $("#week-compare");
  if (thisWeek === 0) compare.textContent = "这一周还没开始，今天算数。";
  else if (previous === 0) compare.textContent = "一个很好的开始，继续保持。";
  else if (thisWeek > previous) compare.textContent = `比上周多 ${thisWeek - previous} 次复习。`;
  else if (thisWeek < previous) compare.textContent = `比上周少 ${previous - thisWeek} 次，慢慢来。`;
  else compare.textContent = "和上周一样稳定。";
}

function renderDueList(metrics) {
  const container = $("#home-due-list");
  if (!container) return;
  $("#home-due-more").textContent = metrics.dueToday.length;
  let words = metrics.dueToday.slice().sort(sortByDue).slice(0, 4);
  let isNew = false;
  if (!words.length) {
    words = metrics.words.filter(word => !reviewFor(word.id)).slice(0, 4);
    isNew = true;
  }
  if (!words.length) {
    container.innerHTML = `<p class="queue-empty">今天没有需要复习的卡片。真的很不错。</p>`;
    return;
  }
  container.innerHTML = words.map(word => {
    const article = word.article || "";
    const review = reviewFor(word.id);
    const status = isNew
      ? "新词"
      : review?.due <= Date.now()
        ? "现在"
        : "今天";
    return `
      <button class="due-row" data-start-word="${esc(word.id)}" aria-label="复习 ${esc(wordDisplay(word))}">
        <span class="due-article ${article || "none"}" ${article ? `data-art="${article}"` : ""}>${article || "·"}</span>
        <span class="due-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="due-status">${status} ${icon("chevron")}</span>
      </button>
    `;
  }).join("");
}

function renderWordOfDay() {
  const container = $("#word-of-day");
  if (!container) return;
  const words = allWords();
  if (!words.length) return;
  const index = Math.floor(startOfDay().getTime() / DAY_MS) % words.length;
  const word = words[index];
  const topic = getTopic(word.topic);
  container.dataset.startWord = word.id;
  container.setAttribute("role", "button");
  container.setAttribute("tabindex", "0");
  container.setAttribute("aria-label", `学习今日单词 ${wordDisplay(word)}`);
  container.innerHTML = `
    <div class="wod-label">WORT DES TAGES · ${esc(topic.de.split(" ")[0])}</div>
    <div class="wod-word">${word.article ? `<i>${esc(word.article)}</i>` : ""}${esc(word.word)}</div>
    <div class="wod-translation">${esc(word.translation)}</div>
  `;
}

/* ─────────────────────────── Study session ─────────────────────────── */

function startStudy({ mode = "daily", topicId = null, limit = null, wordId = null, level = "all" } = {}) {
  const dailyCap = Math.max(5, Math.min(100, Number(state.settings.dailyGoal) || 20));
  const requestedLimit = Number(limit) || 12;
  const effectiveLimit = wordId || mode === "repeat" ? requestedLimit : Math.min(requestedLimit, dailyCap);
  const queue = buildQueue(mode, topicId, effectiveLimit, wordId, level);
  if (!queue.length) {
    if (mode === "new") showToast("所有词都学过了，去复习一组吧。");
    else if (mode === "review") showToast("今天没有到期卡片，试试新词。");
    else showToast("暂时没有可学习的卡片。");
    return;
  }

  closeModal();
  stopStudyTimer();
  $("#study-summary").classList.add("hidden");
  $("#study-stage").classList.remove("hidden");
  $("#view-study").classList.remove("is-revealed");

  session = {
    queue: queue.slice(),
    index: 0,
    done: 0,
    ratings: [],
    start: Date.now(),
    mode,
    topicId,
    level,
    limit: effectiveLimit,
    transitioning: false,
    finished: false,
    phase: "card",
    exam: null,
    examStats: { total: 0, correct: 0 }
  };

  const topicLabel = wordId
    ? "单张复习"
    : topicId
      ? getTopic(topicId).name
      : mode === "new"
        ? (level && level !== "all" ? `${level} 新词` : "认识新词")
        : mode === "weak"
          ? "重点复习"
          : "今日复习";
  $("#study-topic-label").textContent = topicLabel;
  $("#study-timer").textContent = "00:00";
  setView("study");
  startStudyTimer();
  renderStudyCard();
}

function startStudyTimer() {
  stopStudyTimer();
  studyTimer = setInterval(() => {
    if (!session || session.finished) return;
    $("#study-timer").textContent = formatClock(Date.now() - session.start);
  }, 1000);
}

function stopStudyTimer() {
  if (studyTimer) {
    clearInterval(studyTimer);
    studyTimer = null;
  }
}

function conjugatePresent(word) {
  const infinitive = String(word.word || "").replace(/^sich\s+/i, "").trim();
  if (!infinitive) return [];
  const modals = {
    sein: ["bin", "bist", "ist", "sind", "seid", "sind"],
    haben: ["habe", "hast", "hat", "haben", "habt", "haben"],
    werden: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    können: ["kann", "kannst", "kann", "können", "könnt", "können"],
    müssen: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    wollen: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    sollen: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    dürfen: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    mögen: ["mag", "magst", "mag", "mögen", "mögt", "mögen"]
  };
  const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
  if (modals[infinitive]) return pronouns.map((pronoun, index) => [pronoun, modals[infinitive][index]]);

  const prefixes = ["zurück", "zusammen", "weiter", "entgegen", "gegenüber", "hin", "her", "auf", "aus", "ein", "mit", "nach", "vor", "weg", "los", "an", "ab", "bei", "zu"];
  let prefix = "";
  let core = infinitive;
  for (const candidate of prefixes) {
    if (core.startsWith(candidate) && core.length > candidate.length + 2) {
      prefix = candidate;
      core = core.slice(candidate.length);
      break;
    }
  }
  const stem = core.endsWith("en") ? core.slice(0, -2) : core.endsWith("n") ? core.slice(0, -1) : core;
  if (!stem) return [];
  const change = {
    fahren: "fähr", laufen: "läuf", sehen: "sieh", lesen: "lies", essen: "iss",
    geben: "gib", nehmen: "nimm", sprechen: "sprich", helfen: "hilf", treffen: "triff",
    schlafen: "schläf", tragen: "träg", waschen: "wäsch", fangen: "fäng",
    halten: "hält", lassen: "lässt", stoßen: "stößt"
  }[infinitive] || stem;
  const duSpecial = { lassen: "lässt", stoßen: "stößt", halten: "hältst" }[infinitive];
  const needsE = /[dt]$/.test(stem);
  const add = suffix => `${prefix ? `${stem}${suffix} ${prefix}` : `${stem}${suffix}`}`;
  const addChanged = suffix => `${prefix ? `${change}${suffix} ${prefix}` : `${change}${suffix}`}`;
  const forms = [
    ["ich", add("e")],
    ["du", duSpecial || addChanged(needsE ? "est" : stem.endsWith("s") || stem.endsWith("ß") || stem.endsWith("z") ? "t" : "st")],
    ["er/sie/es", addChanged(needsE ? "et" : "t")],
    ["wir", add("en")],
    ["ihr", add(needsE ? "et" : "t")],
    ["sie/Sie", add("en")]
  ];
  if (String(word.word || "").startsWith("sich ")) {
    const reflexives = ["mich", "dich", "sich", "uns", "euch", "sich"];
    forms.forEach((row, index) => { row[1] += ` ${reflexives[index]}`; });
  }
  return forms;
}

function buildConjugation(word) {
  if (!word) return "";
  if (word.pos !== "verb" && !word.forms) return "";
  const parts = String(word.forms || "")
    .split(/[,;，；]/)
    .map(part => part.trim())
    .filter(Boolean);
  const rows = [["原形", word.word]];
  if (word.pos === "verb") {
    conjugatePresent(word).forEach(([label, value]) => rows.push([label, value]));
    const labels = ["第三人称 / 变位", "过去式", "第二分词 / 助动词"];
    parts.forEach((part, index) => rows.push([labels[index] || "词形", part]));
    if (!parts.length) rows.push(["过去式 / 第二分词", "词表未提供完整形式"]);
  } else if (word.pos === "adj") {
    const labels = ["比较级", "最高级"];
    parts.slice(0, 2).forEach((part, index) => rows.push([labels[index], part]));
  } else {
    parts.forEach(part => rows.push(["词形", part]));
  }
  return `<table class="conjugation-table"><tbody>${rows.map(([label, value]) => `
    <tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>
  `).join("")}</tbody></table>`;
}

function renderStudyCard() {
  if (!session) return;
  if (session.index >= session.queue.length) {
    finishSession();
    return;
  }
  const word = session.queue[session.index];
  const topic = getTopic(word.topic);
  const review = reviewFor(word.id);
  const view = $("#view-study");
  const flashcard = $("#flashcard");
  session.transitioning = false;

  view.classList.remove("is-revealed");
  flashcard.classList.remove("is-flipped", "is-leaving");
  flashcard.classList.remove("is-entering");
  void flashcard.offsetWidth;
  flashcard.classList.add("is-entering");
  setTimeout(() => flashcard.classList.remove("is-entering"), 380);
  flashcard.setAttribute("aria-label", `点击翻转卡片，查看 ${word.word} 的释义`);

  $("#card-level").textContent = word.level || "A1";
  $("#card-topic").textContent = topic.name;
  $("#back-level").textContent = word.level || "A1";
  $("#back-topic").textContent = topic.name;

  const article = word.article || "";
  const articleRow = $("#card-article-row");
  const cardArticle = $("#card-article");
  const backArticle = $("#back-article");
  if (article) {
    articleRow.style.visibility = "visible";
    cardArticle.style.display = "";
    cardArticle.dataset.art = article;
    cardArticle.textContent = article;
    backArticle.style.display = "";
    backArticle.dataset.art = article;
    backArticle.textContent = article;
  } else {
    articleRow.style.visibility = "hidden";
    cardArticle.style.display = "none";
    backArticle.style.display = "none";
  }

  const wordEl = $("#card-word");
  wordEl.textContent = word.word;
  wordEl.classList.toggle("long", word.word.length >= 12 && word.word.length < 15);
  wordEl.classList.toggle("xlong", word.word.length >= 15);
  $("#card-forms").textContent = formsLine(word);

  $("#back-word").textContent = word.word;
  $("#back-translation").textContent = word.translation;
  $("#back-pos").textContent = POS_LABELS[word.pos] || "词性待补充";
  $("#back-plural").textContent = word.pos === "noun"
    ? pluralLabel(word)
    : word.forms || (word.pos === "adj" ? "比较级待补充" : word.pos === "verb" ? "变位待补充" : "变形待补充");
  $("#back-level-fact").textContent = word.level || "A1";
  const conjugation = buildConjugation(word);
  const conjugationBlock = $("#conjugation-block");
  if (conjugationBlock) {
    conjugationBlock.classList.toggle("hidden", !conjugation);
    conjugationBlock.open = false;
    $("#conjugation-summary").textContent = word.pos === "verb" ? "现在时 / 过去式 / 完成时" : word.pos === "adj" ? "比较级 / 最高级" : "词形";
    $("#conjugation-content").innerHTML = conjugation;
  }
  $("#back-example").textContent = word.example || "例句待补充";
  $("#back-example-zh").textContent = word.exampleZh || (word.example ? "" : "该词暂未匹配到可靠例句，后续批次会继续补充。");
  $("#back-note").textContent = word.note || (word.pack || word.book
    ? "这是教材词表词条。试着用它造一个句子，再按 1–4 评价。"
    : "把这个词和你的生活连起来，它会更容易留下。");
  $("#example-block").classList.remove("hidden");
  const sourceEl = $("#card-source");
  if (sourceEl) {
    sourceEl.classList.toggle("hidden", !word.source);
    sourceEl.innerHTML = word.source
      ? `<span>QUELLE</span>${esc(word.source)}${word.sourceRef ? ` · ${esc(word.sourceRef)}` : ""}`
      : "";
  }

  const total = session.queue.length;
  const current = session.index + 1;
  $("#study-progress-label").textContent = `${current} / ${total}`;
  $("#study-progress-bar").style.width = `${(session.done / total) * 100}%`;
  $("#session-done").textContent = session.done;
  $("#session-left").textContent = total - session.done;

  $("#preview-again").textContent = formatInterval(previewInterval("again"));
  $("#preview-hard").textContent = formatInterval(previewInterval("hard"));
  $("#preview-good").textContent = formatInterval(previewInterval("good"));
  $("#preview-easy").textContent = formatInterval(previewInterval("easy"));

  const upcoming = session.queue.slice(session.index + 1, session.index + 4);
  $("#queue-count").textContent = `${Math.max(0, total - session.index - 1)} 张`;
  $("#queue-preview").innerHTML = upcoming.length
    ? upcoming.map(item => `
        <div class="queue-item">
          <i></i>
          <span style="color:var(--ink);font-size:10px">${esc(item.article ? `${item.article} ` : "")}${esc(item.word)}</span>
          <span>${esc(item.level)}</span>
        </div>
      `).join("")
    : `<p class="queue-empty">这是最后一张了。</p>`;

  $("#session-note").textContent = review
    ? `这个词你已经见过 ${review.reps + review.lapses} 次。现在，试着不看提示说出它的意思。`
    : "第一次见面。别急着背，先读一遍例句，让声音留下来。";
  $("#study-timer").textContent = formatClock(Date.now() - session.start);

  $("#study-stage").classList.remove("exam-active");
  $("#exam-panel").classList.add("hidden");
  session.phase = "card";
  session.exam = null;
  if (review && session.mode !== "new") {
    beginExam(word);
  }
}

function beginExam(word) {
  if (!session) return;
  const direction = Math.random() < 0.5 ? "de-zh" : "zh-de";
  const pool = allWords().filter(candidate =>
    candidate.id !== word.id &&
    candidate.translation &&
    candidate.translation !== word.translation &&
    candidate.pos === word.pos &&
    candidate.level === word.level
  );
  let candidates = shuffle(pool).slice(0, 3);
  if (candidates.length < 3) {
    const fallback = allWords().filter(candidate =>
      candidate.id !== word.id &&
      candidate.translation &&
      candidate.translation !== word.translation &&
      !candidates.some(item => item.id === candidate.id)
    );
    candidates = candidates.concat(shuffle(fallback).slice(0, 3 - candidates.length));
  }
  const options = shuffle([word, ...candidates]).map(candidate => ({
    word: candidate,
    label: direction === "de-zh" ? candidate.translation : wordDisplay(candidate)
  }));
  session.exam = {
    direction,
    options,
    correct: options.findIndex(option => option.word.id === word.id),
    answered: false,
    chosen: null
  };
  session.phase = "exam";
  session.examStats.total += 1;
  renderExam(word);
}

function renderExam(word) {
  const exam = session?.exam;
  if (!exam) return;
  $("#study-stage").classList.add("exam-active");
  $("#exam-panel").classList.remove("hidden");
  $("#exam-progress").textContent = `${session.index + 1} / ${session.queue.length} · 到期复查`;
  $("#exam-question").textContent = exam.direction === "de-zh" ? wordDisplay(word) : word.translation;
  $("#exam-sub").textContent = exam.direction === "de-zh" ? "这个词是什么意思？" : "选出对应的德语词";
  $("#exam-options").innerHTML = exam.options.map((option, index) => `
    <button class="exam-option" data-exam-option="${index}">
      <span class="exam-index">${index + 1}</span>
      <span>${esc(option.label)}</span>
    </button>
  `).join("");
  $("#exam-result").classList.add("hidden");
  $("#exam-result").classList.remove("is-wrong");
  $("#exam-panel").classList.remove("is-answered");
}

function answerExam(index) {
  const exam = session?.exam;
  if (!exam || exam.answered) return;
  const chosen = Number(index);
  if (!Number.isInteger(chosen) || chosen < 0 || chosen >= exam.options.length) return;
  exam.answered = true;
  exam.chosen = chosen;
  const correct = chosen === exam.correct;
  if (correct) session.examStats.correct += 1;
  $$("[data-exam-option]").forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === exam.correct) button.classList.add("is-correct");
    if (optionIndex === chosen && !correct) button.classList.add("is-wrong");
    if (optionIndex !== chosen && optionIndex !== exam.correct) button.classList.add("is-dimmed");
  });
  const result = $("#exam-result");
  result.classList.remove("hidden", "is-wrong");
  result.classList.toggle("is-wrong", !correct);
  $("#exam-result-icon").textContent = correct ? "✓" : "!";
  $("#exam-result-title").textContent = correct ? "Richtig." : "Noch nicht.";
  $("#exam-result-copy").textContent = correct
    ? "回忆命中了。现在查看完整词卡，再评估这次记得有多牢。"
    : `正确答案是「${exam.options[exam.correct].label}」。看过词卡后，把它标成「忘记」或「困难」都可以。`;
  $("#exam-panel").classList.add("is-answered");
  $("#exam-reveal").focus({ preventScroll: true });
}

function revealExamCard() {
  if (!session?.exam?.answered) return;
  session.phase = "card";
  $("#study-stage").classList.remove("exam-active");
  $("#exam-panel").classList.add("hidden");
  const flashcard = $("#flashcard");
  flashcard.classList.remove("is-entering");
  flashcard.classList.add("is-flipped");
  $("#view-study").classList.add("is-revealed");
}

function flipCard() {
  if (!session || session.transitioning || session.finished) return;
  if (session.phase === "exam") return;
  const flashcard = $("#flashcard");
  if (flashcard.classList.contains("is-flipped")) return;
  flashcard.classList.remove("is-entering");
  flashcard.classList.add("is-flipped");
  $("#view-study").classList.add("is-revealed");
}

function rateCard(rating) {
  if (!session || session.transitioning || session.finished) return;
  if (session.phase === "exam") return;
  if (!$("#view-study").classList.contains("is-revealed")) return;
  const word = currentSessionWord();
  if (!word) return;

  if (session.mode === "repeat") {
    session.transitioning = true;
    if (rating === "again" || rating === "hard") {
      state.mistakes[word.id] = (state.mistakes[word.id] || 0) + 1;
      state.mistakeTypes[word.id] = "repeat";
    }
    session.ratings.push({ id: word.id, rating, score: RATING_SCORES[rating] || 0 });
    session.done += 1;
    persist();
    $("#session-done").textContent = session.done;
    $("#session-left").textContent = Math.max(0, session.queue.length - session.done);
    $("#study-progress-bar").style.width = `${(session.done / session.queue.length) * 100}%`;
    $("#view-study").classList.remove("is-revealed");
    $("#flashcard").classList.add("is-leaving");
    setTimeout(() => {
      if (!session) return;
      session.index += 1;
      if (session.index >= session.queue.length) finishSession();
      else renderStudyCard();
    }, 240);
    return;
  }

  session.transitioning = true;
  const previous = reviewFor(word.id);
  const next = scheduleReview(previous, rating);
  state.reviews[word.id] = next;
  state.activity[dayKey()] = (state.activity[dayKey()] || 0) + 1;
  state.stats.reviews = (Number(state.stats.reviews) || 0) + 1;
  if (rating === "good" || rating === "easy") {
    state.stats.correct = (Number(state.stats.correct) || 0) + 1;
    delete state.mistakes[word.id];
    delete state.mistakeTypes[word.id];
  } else {
    state.mistakes[word.id] = (state.mistakes[word.id] || 0) + 1;
    state.mistakeTypes[word.id] = "review";
  }
  session.ratings.push({ id: word.id, rating, score: RATING_SCORES[rating] || 0 });
  session.done += 1;
  persist();

  $("#session-done").textContent = session.done;
  $("#session-left").textContent = Math.max(0, session.queue.length - session.done);
  $("#study-progress-bar").style.width = `${(session.done / session.queue.length) * 100}%`;
  $("#view-study").classList.remove("is-revealed");
  $("#flashcard").classList.add("is-leaving");

  setTimeout(() => {
    if (!session) return;
    session.index += 1;
    if (session.index >= session.queue.length) {
      finishSession();
    } else {
      renderStudyCard();
    }
  }, 240);
}

function finishSession() {
  if (!session || session.finished) return;
  session.finished = true;
  stopStudyTimer();
  if (session.mode === "repeat") logRepeatReview();
  const total = session.queue.length;
  const strong = session.ratings.filter(item => item.rating === "good" || item.rating === "easy").length;
  const rate = total ? Math.round((strong / total) * 100) : 0;
  const elapsed = Date.now() - session.start;

  $("#study-stage").classList.add("hidden");
  const summary = $("#study-summary");
  summary.classList.remove("hidden");
  $("#summary-count").textContent = total;
  $("#summary-accuracy").textContent = `${rate}%`;
  $("#summary-time").textContent = formatClock(elapsed);
  $("#summary-title").textContent =
    rate >= 80 ? "Schön gemacht." : rate >= 55 ? "Weiter so." : "Jeder Anfang zählt.";
  $("#summary-copy").textContent =
    rate >= 80
      ? "你完成了这一组卡片，大部分词都稳稳地接住了。"
      : rate >= 55
        ? "这一组已经完成。记忆需要几次重逢，才能变成自己的东西。"
        : "你完成了这一组。觉得难的词会被安排更早再见，这就是进步。";

  launchConfetti();
  renderChrome();
  renderHome();
  renderStats();
  renderLibrary();
}

function launchConfetti() {
  const container = $("#confetti");
  if (!container) return;
  container.innerHTML = "";
  const colors = ["#c45c3b", "#173f32", "#bd9250", "#8ea28a", "#f4ded2"];
  for (let i = 0; i < 34; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--duration", `${1.8 + Math.random() * 2.4}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.6}s`);
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }
  setTimeout(() => {
    if (container) container.innerHTML = "";
  }, 5000);
}

function exitStudy() {
  if (session && !session.finished && session.done > 0) {
    showToast("本轮学习已结束，进度已经保存。");
  }
  stopStudyTimer();
  session = null;
  $("#study-summary")?.classList.add("hidden");
  $("#study-stage")?.classList.remove("hidden");
  $("#view-study")?.classList.remove("is-revealed");
  navigate("home");
}

/* ─────────────────────────── Reading / phrases ─────────────────────────── */

const CEFR_ORDER = ["C2", "C1", "B2", "B1", "A2", "A1"];
const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function normalizeCefrLevel(level) {
  const value = String(level || "").toUpperCase();
  if (CEFR_LEVELS.includes(value)) return value;
  if (/C1\s*\/\s*C2|C2/.test(value)) return "C2";
  if (/C1/.test(value)) return "C1";
  if (/B2/.test(value)) return "B2";
  if (/B1/.test(value)) return "B1";
  if (/A2/.test(value)) return "A2";
  return "A1";
}

function levelStats(level) {
  const key = normalizeCefrLevel(level);
  const raw = state.progressByLevel?.[key] || {};
  const correct = Math.max(0, Number(raw.correct) || 0);
  const total = Math.max(0, Number(raw.total) || 0);
  return { correct, total, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}

function nextCefrLevel(level) {
  const index = CEFR_LEVELS.indexOf(normalizeCefrLevel(level));
  return index >= 0 && index < CEFR_LEVELS.length - 1 ? CEFR_LEVELS[index + 1] : "";
}

function recordLevelAnswer(level, isCorrect) {
  const key = normalizeCefrLevel(level);
  if (!state.progressByLevel || typeof state.progressByLevel !== "object") state.progressByLevel = {};
  const current = state.progressByLevel[key] || { correct: 0, total: 0 };
  state.progressByLevel[key] = {
    correct: (Number(current.correct) || 0) + (isCorrect ? 1 : 0),
    total: (Number(current.total) || 0) + 1
  };
}

function levelRecommendation(level) {
  const key = normalizeCefrLevel(level);
  const stats = levelStats(key);
  const next = nextCefrLevel(key);
  if (!next || stats.total < 10 || stats.accuracy <= 90) return "";
  return `你在 ${key} 的正确率是 ${stats.accuracy}%（${stats.correct}/${stats.total}），可以进入 ${next} 了。`;
}

function allPhrases() {
  return [...PHRASES, ...(OCR_CONTENT.phrases || []), ...(state.customPhrases || [])];
}

function allArticles() {
  return [...ARTICLES, ...(OCR_CONTENT.articles || []), ...(state.customArticles || [])];
}

function articleLevelMap() {
  const map = new Map();
  for (const word of allWords()) {
    const levels = Array.isArray(word.levels) ? word.levels : [word.level || "A1"];
    const level = [...levels].sort((a, b) => CEFR_ORDER.indexOf(a) - CEFR_ORDER.indexOf(b))[0] || "A1";
    const keys = new Set([word.word, word.de, ...(word.forms ? String(word.forms).split(/[,;，；]/) : [])]);
    for (const key of keys) {
      const normalized = foldSearch(String(key || "").replace(/^(der|die|das|sich)\s+/i, ""));
      if (normalized && !map.has(normalized)) map.set(normalized, level);
    }
  }
  return map;
}

function gradeArticle(article) {
  const tokens = String(article.contentDe || "").match(/[A-Za-zÄÖÜäöüß-]{2,}/g) || [];
  const map = articleLevelMap();
  const counts = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  let recognized = 0;
  for (const raw of tokens) {
    const token = foldSearch(raw);
    let level = map.get(token);
    if (!level && token.length > 5) {
      for (const suffix of ["ungen", "ung", "en", "er", "e", "n", "s", "t"]) {
        if (token.endsWith(suffix) && map.has(token.slice(0, -suffix.length))) {
          level = map.get(token.slice(0, -suffix.length));
          break;
        }
      }
    }
    if (!level) continue;
    counts[level] = (counts[level] || 0) + 1;
    recognized += 1;
  }
  const shares = {};
  for (const level of Object.keys(counts)) shares[level] = recognized ? counts[level] / recognized : 0;
  const CEFR_THRESHOLD = 0.1;
  let level = "A1";
  let matchedShare = 0;
  for (const candidate of CEFR_ORDER) {
    if ((shares[candidate] || 0) > CEFR_THRESHOLD) {
      level = candidate;
      matchedShare = shares[candidate];
      break;
    }
  }
  if (!recognized && article.levelHint) {
    level = article.levelHint;
    matchedShare = 0;
  }
  return { level, shares, recognized, total: tokens.length, unknown: tokens.length - recognized, matchedShare, threshold: CEFR_THRESHOLD };
}

function renderReading() {
  const list = $("#reading-list");
  const reader = $("#article-reader");
  if (!list) return;
  reader?.classList.add("hidden");
  list.classList.remove("hidden");
  $("#view-reading .page-heading")?.classList.remove("hidden");
  const all = allArticles();
  $("#reading-count").textContent = all.length;
  const readCount = Array.isArray(state.readArticles) ? state.readArticles.length : 0;
  const readLabel = $("#reading-read");
  if (readLabel) readLabel.textContent = `已读 ${readCount} 篇 · CEFR 自动分级`;
  $$("#reading-level-filter [data-reading-level]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.readingLevel === readingLevel);
  });
  const readingSearch = $("#reading-search");
  if (readingSearch && document.activeElement !== readingSearch) readingSearch.value = readingQuery;
  const query = foldSearch(readingQuery.trim());
  const articles = all.slice().reverse().filter(article => {
    if (readingLevel !== "all" && gradeArticle(article).level !== readingLevel) return false;
    if (!query) return true;
    return foldSearch([article.titleDe, article.titleZh, article.summaryZh, article.source, ...(article.tags || [])].join(" ")).includes(query);
  });
  if (!articles.length) {
    list.innerHTML = `<div class="library-empty"><h3>没有匹配的文章</h3><p>试试更短的关键词，或切换 CEFR 等级。</p></div>`;
    return;
  }
  list.innerHTML = articles.map(article => {
    const grade = gradeArticle(article);
    const isRead = Array.isArray(state.readArticles) && state.readArticles.includes(article.id);
    return `
      <button class="reading-card ${isRead ? "is-read" : ""}" data-article-id="${esc(article.id)}">
        <div class="reading-card-top">
          <span class="level-chip">${esc(grade.level)}</span>
          <span>${esc(article.tags?.join(" · ") || "Lesetext")}${isRead ? " · 已读" : ""}</span>
        </div>
        <h2>${esc(article.titleDe)}</h2>
        <p class="reading-title-zh">${esc(article.titleZh)}</p>
        <p>${esc(article.summaryZh || "")}</p>
        <div class="reading-card-foot"><span>${esc(article.source)}</span><span>${article.contentDe.split(/\s+/).length} 词</span></div>
      </button>
    `;
  }).join("");
}

function markArticleRead(id) {
  if (!Array.isArray(state.readArticles)) state.readArticles = [];
  if (state.readArticles.includes(id)) return;
  state.readArticles.push(id);
  persist();
  const readLabel = $("#reading-read");
  if (readLabel) readLabel.textContent = `已读 ${state.readArticles.length} 篇 · CEFR 自动分级`;
}

function openArticle(id) {
  const article = allArticles().find(item => item.id === id);
  if (!article) return;
  readingArticleId = id;
  markArticleRead(id);
  const grade = gradeArticle(article);
  $("#reading-list")?.classList.add("hidden");
  $("#view-reading .page-heading")?.classList.add("hidden");
  const reader = $("#article-reader");
  if (!reader) return;
  reader.classList.remove("hidden");
  $("#article-level").textContent = grade.level;
  const dominant = Math.round((grade.shares[grade.level] || 0) * 100);
  $("#article-kicker").textContent = `LESETEXT · ${grade.level} · ${dominant}% ${grade.level}-Wortanteil`;
  $("#article-title").textContent = article.titleDe;
  $("#article-subtitle").textContent = `${article.titleZh} · ${article.tags?.join(" · ") || ""}`;
  $("#article-meta").innerHTML = `<span>${esc(article.source)}</span><span>${article.contentDe.split(/\s+/).length} 词</span><span>${Math.round(grade.recognized / Math.max(1, grade.total) * 100)}% 词表覆盖</span><span>${grade.total - grade.recognized} 个词未收录</span>`;
  const translationHtml = ARTICLE_TRANSLATIONS[article.id]
    ? `<section class="article-translation">
         <div class="article-translation-head"><strong>AI 中文译文</strong><span>仅供学习参考</span></div>
         ${ARTICLE_TRANSLATIONS[article.id].split(/\n\n+/).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
       </section>`
    : "";
  $("#article-body").innerHTML = article.contentDe.split(/\n\n+/).map(paragraph => `<p>${esc(paragraph)}</p>`).join("") + translationHtml;
  $$("#article-reader .article-quiz-row").forEach(row => row.remove());
  $("#article-source").innerHTML = article.sourceUrl
    ? `<strong>来源 / 出处</strong> <a href="${esc(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(article.source)}</a>`
    : `<strong>来源 / 出处</strong> ${esc(article.source)}`;
  const questions = ARTICLE_QUESTIONS[article.id] || [];
  const quizButton = questions.length
    ? `<div class="article-quiz-row"><button class="btn btn-primary" data-action="article-quiz" data-article-id="${esc(article.id)}">读后练习 · ${questions.length} 题</button></div>`
    : "";
  $("#article-body").insertAdjacentHTML("afterend", quizButton);
  try {
    history.replaceState(null, "", `#artikel/${encodeURIComponent(article.id)}`);
  } catch {
    /* file:// or embedded webview may reject history changes */
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function articleFromHash() {
  const match = String(location.hash || "").match(/^#artikel\/(.+)$/);
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "";
  }
}

function renderPhrases() {
  const grid = $("#phrase-grid");
  if (!grid) return;
  $("#phrase-count").textContent = allPhrases().length;
  const query = foldSearch(phraseQuery.trim());
  const items = allPhrases().slice().reverse().filter(item => {
    if (!query) return true;
    return foldSearch([item.de, item.zh, item.example, item.exampleZh, item.category].join(" ")).includes(query);
  });
  grid.innerHTML = items.length ? items.map(item => `
    <article class="phrase-card">
      <div class="phrase-head"><span class="level-chip">${esc(item.level)}</span><span class="phrase-scene">${esc(item.category)}</span></div>
      <h2>${esc(item.de)}</h2>
      <p class="phrase-zh">${esc(item.zh)}</p>
      ${item.example
        ? `<blockquote><p>${esc(item.example)}</p><footer>${esc(item.exampleZh)}</footer></blockquote>`
        : `<blockquote class="is-empty"><p>例句待补充</p></blockquote>`}
      <small>${esc(item.source)}</small>
    </article>
  `).join("") : `<div class="library-empty"><h3>没有匹配的短语</h3><p>换一个关键词试试。</p></div>`;
}

function phraseQuestionBank(category = "all", level = "all", type = "mixed") {
  const pool = allPhrases().filter(item => (category === "all" || category === "phrases") && (level === "all" || item.level === level));
  return pool.slice(0, 12).map((item, index) => {
    const mode = type === "zh-de" || (type === "mixed" && index % 2) ? "zh-de" : "de-zh";
    const others = shuffle(allPhrases().filter(other => other.id !== item.id)).slice(0, 3);
    const options = shuffle([item, ...others]).map(other => ({ text: mode === "zh-de" ? other.de : other.zh, correct: other.id === item.id }));
    return {
      mode,
      word: { id: item.id, word: mode === "zh-de" ? item.zh : item.de, translation: mode === "zh-de" ? item.de : item.zh, level: item.level, article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: `${item.de} — ${item.zh}。例：${item.example}`
    };
  });
}

function articleQuestionBank(level = "all") {
  const articles = allArticles();
  return articles
    .filter(article => level === "all" || gradeArticle(article).level === level)
    .flatMap(article => {
      const specific = ARTICLE_QUESTIONS[article.id] || [];
      if (specific.length) {
        return specific.map((question, index) => {
          const options = shuffle(question.options.map((text, optionIndex) => ({ text, correct: optionIndex === question.answer })));
          return {
            mode: "de-zh",
            word: { id: `${article.id}-q${index}`, word: question.q, translation: question.options[question.answer], level: gradeArticle(article).level, article: "" },
            options,
            correctIndex: options.findIndex(option => option.correct),
            explanation: question.explain
          };
        });
      }
      // 没有手工题的文章自动生成一道主旨题，保证每篇文章都能进入题库。
      const distractors = shuffle(articles.filter(other => other.id !== article.id && other.titleZh))
        .slice(0, 3)
        .map(other => other.titleZh);
      const options = shuffle([article.titleZh, ...distractors].map(text => ({ text, correct: text === article.titleZh })));
      return [{
        mode: "de-zh",
        word: { id: `${article.id}-auto`, word: article.titleDe, translation: article.titleZh, level: gradeArticle(article).level, article: "" },
        options,
        correctIndex: options.findIndex(option => option.correct),
        explanation: `《${article.titleDe}》的主题是「${article.titleZh}」。${article.summaryZh || ""}`
      }];
    });
}

function grammarQuestionBank(level = "all", type = "mixed") {
  const topics = (typeof GRAMMAR_TOPICS !== "undefined" ? GRAMMAR_TOPICS : [])
    .filter(topic => level === "all" || topic.level === level);
  const questions = topics.flatMap(topic => (topic.exercises || []).map((exercise, index) => {
    const options = shuffle(exercise.options.map((text, optionIndex) => ({ text, correct: optionIndex === exercise.answer })));
    return {
      mode: "de-zh",
      word: { id: `${topic.id}-ex${index}`, word: exercise.q, translation: exercise.options[exercise.answer], level: topic.level, article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: exercise.explain
    };
  }));
  // OCR 语法卡没有手写练习时，自动生成“标题—说明”匹配题。
  const ocrCards = (OCR_CONTENT.grammar || []).filter(card => level === "all" || (card.level || "B1") === level);
  for (const card of ocrCards) {
    const others = shuffle((OCR_CONTENT.grammar || []).filter(other => other.id !== card.id && other.summary)).slice(0, 3);
    if (!card.summary || others.length < 3) continue;
    const options = shuffle([card, ...others].map(item => ({ text: item.summary, correct: item.id === card.id })));
    questions.push({
      mode: "de-zh",
      word: { id: `${card.id}-auto`, word: card.title, translation: card.summary, level: card.level || "B1", article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: `${card.title}：${card.summary}`
    });
  }
  return questions;
}



function currentStatus(word) {
  if (isDue(word)) return "due";
  return statusFor(word);
}

function filteredWords() {
  const query = libraryFilters.query.trim();
  let words = allWords()
    .map(word => {
      if (libraryFilters.level !== "all" && word.level !== libraryFilters.level) return null;
      if (libraryFilters.status !== "all" && currentStatus(word) !== libraryFilters.status) return null;
      const score = query ? scoreWordSearch(word, query) : 1;
      if (!score) return null;
      return { word, score };
    })
    .filter(Boolean)
    .sort((a, b) => query ? b.score - a.score || a.word.word.localeCompare(b.word.word, "de") : 0)
    .map(item => item.word);

  if (libraryFilters.sort === "level") {
    const order = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
    words = words.slice().sort((a, b) => (order[a.level] || 9) - (order[b.level] || 9) || a.word.localeCompare(b.word, "de"));
  } else if (libraryFilters.sort === "due") {
    words = words.slice().sort((a, b) => {
      const ra = reviewFor(a.id);
      const rb = reviewFor(b.id);
      if (!ra && !rb) return 0;
      if (!ra) return 1;
      if (!rb) return -1;
      return (ra.due || 0) - (rb.due || 0);
    });
  }

  return words;
}

function renderLevelProgress() {
  const container = $("#level-progress");
  if (!container) return;
  const active = libraryFilters.level;
  const rows = CEFR_LEVELS.map(level => {
    const stats = levelStats(level);
    const isActive = active === level;
    return `
      <button class="level-progress-row ${isActive ? "is-active" : ""}" data-progress-level="${level}" aria-label="查看 ${level} 单词">
        <span class="level-progress-name">${level}</span>
        <span class="level-progress-bar"><i style="width:${stats.total ? stats.accuracy : 0}%"></i></span>
        <span class="level-progress-value">${stats.total ? `${stats.accuracy}%` : "—"}</span>
        <small>${stats.total} 题</small>
      </button>
    `;
  }).join("");
  const recommendations = CEFR_LEVELS.map(levelRecommendation).filter(Boolean);
  container.innerHTML = `
    <div class="level-progress-head">
      <div><strong>难度进阶</strong><span>作答正确率按等级独立记录；同一等级超过 90% 自动推荐下一级。</span></div>
      <span class="level-progress-tip">${active === "all" ? "选择等级后可直接背诵" : `当前筛选：${active}`}</span>
    </div>
    <div class="level-progress-grid">${rows}</div>
    ${recommendations.length ? `<p class="level-recommend">${icon("spark")} ${esc(recommendations[0])}</p>` : `<p class="level-recommend is-muted">先完成至少 10 题，系统会在这里给出进阶建议。</p>`}
  `;
}

function renderLibrary() {
  const metrics = getMetrics();
  $("#library-total").textContent = metrics.total;
  $("#library-mastered").textContent = metrics.mastered;
  $("#library-learning").textContent = metrics.learning;
  $("#library-new").textContent = metrics.fresh;
  renderLevelProgress();

  const searchInput = $("#library-search");
  if (searchInput && document.activeElement !== searchInput) searchInput.value = libraryFilters.query;

  $$("#level-filter .chip").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.level === libraryFilters.level);
  });
  const statusFilter = $("#status-filter");
  if (statusFilter) statusFilter.value = libraryFilters.status;
  const sortFilter = $("#sort-filter");
  if (sortFilter) sortFilter.value = libraryFilters.sort;

  const allFiltered = filteredWords();
  const words = allFiltered.slice(0, libraryVisibleLimit);
  const body = $("#library-body");
  const empty = $("#library-empty");
  $("#library-count").textContent = `显示 ${words.length} / ${allFiltered.length} 个词`;
  const moreButton = $("#library-more");
  if (moreButton) moreButton.hidden = words.length >= allFiltered.length;
  const homeLink = $("#home-library-link");
  if (homeLink) homeLink.innerHTML = `查看全部 ${metrics.total} 词 ${icon("arrow-right")}`;
  const packCount = state.customWords.filter(word => word.pack).length;
  const customCount = state.customWords.length - packCount;
  const textbookCount = TEXTBOOK_WORDS.length;
  const goetheCount = GOETHE_WORDS.length;
  $("#library-subline").textContent = textbookCount
    ? `${metrics.total} 个德语词，包含 ${textbookCount} 个《新求精》教材词条${goetheCount ? `，${goetheCount} 个歌德分级词表词条` : ""}${packCount ? `，${packCount} 个手动导入词条` : ""}${customCount ? `，${customCount} 个自定义收藏` : ""}。`
    : goetheCount
      ? `${metrics.total} 个德语词，其中 ${goetheCount} 个来自歌德分级词表${customCount ? `，${customCount} 个自定义收藏` : ""}。`
      : `${metrics.total} 个精心挑选的德语词，加上你自己添加的收藏。`;
  $("#library-subline").textContent += " 词性、变形或例句缺失的词条会标为“待补充”，后续批次继续补齐。";

  if (!words.length) {
    body.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  body.innerHTML = words.map(word => {
    const status = currentStatus(word);
    const statusMeta = STATUS_META[status] || STATUS_META.learning;
    const review = reviewFor(word.id);
    const dueText = !review ? "—" : formatDue(review.due);
    const favorite = state.favorites.includes(word.id);
    return `
      <tr data-word-row="${esc(word.id)}">
        <td data-label="单词">
          <span class="word-cell">
            <span class="article" data-art="${esc(word.article || "none")}">${esc(word.article || "·")}</span>
            <strong>${esc(word.word)}</strong>
            ${favorite ? `<span title="已收藏" style="color:var(--amber)">${icon("star")}</span>` : ""}
          </span>
        </td>
        <td class="translation-cell" data-label="释义">${esc(word.translation)}</td>
        <td class="morph-cell" data-label="词性 / 复数" title="${esc(morphLine(word))}">${esc(morphLine(word))}</td>
        <td data-label="等级"><span class="level-chip">${esc(word.level)}</span></td>
        <td data-label="状态"><span class="status-badge ${statusMeta.cls}"><i></i>${statusMeta.label}</span></td>
        <td class="due-cell ${status === "due" ? "is-due" : ""}" data-label="下次复习">${esc(dueText)}</td>
        <td><button class="row-action" aria-label="查看 ${esc(word.word)}">${icon("arrow-right")}</button></td>
      </tr>
    `;
  }).join("");
}

/* ─────────────────────────── Stats render ─────────────────────────── */

function renderStats() {
  const metrics = getMetrics();
  $("#stats-total").textContent = metrics.total;
  $("#stats-mastered").textContent = metrics.mastered;
  $("#stats-reviews").textContent = metrics.totalReviews;
  $("#stats-accuracy").innerHTML = `${metrics.accuracy}<sup>%</sup>`;
  $("#stats-streak").textContent = metrics.streak;

  const percent = metrics.total ? Math.round((metrics.mastered / metrics.total) * 100) : 0;
  $("#mastery-percent").textContent = `${percent}%`;
  $("#mastery-ring").style.strokeDashoffset = String(RING_LARGE * (1 - percent / 100));
  $("#mastery-total-pill").textContent = `${metrics.total} Wörter`;
  $("#legend-mastered").textContent = metrics.mastered;
  $("#legend-learning").textContent = metrics.learning;
  $("#legend-new").textContent = metrics.fresh;
  $("#legend-due").textContent = metrics.dueToday.length;

  const levelOrder = ["A1", "A2", "B1", "B2", "C1"];
  $("#mastery-levels").innerHTML = levelOrder.map(level => {
    const levelWords = metrics.words.filter(word => word.level === level);
    const mastered = levelWords.filter(word => statusFor(word) === "mastered").length;
    const percent = levelWords.length ? Math.round((mastered / levelWords.length) * 100) : 0;
    return `
      <div class="mastery-level-row">
        <span>${level}</span>
        <span class="mastery-level-track"><i style="width:${percent}%"></i></span>
        <span>${mastered} / ${levelWords.length}</span>
      </div>
    `;
  }).join("");

  renderForecast(metrics);
  renderCalendar();
  renderHeatmap();
  renderDifficult(metrics);
  renderChrome();
}

function renderForecast() {
  const container = $("#forecast-chart");
  if (!container) return;
  const words = allWords();
  const todayStart = startOfDay().getTime();
  const entries = [];
  for (let offset = 0; offset < 7; offset += 1) {
    const ts = todayStart + offset * DAY_MS;
    let count;
    if (offset === 0) {
      count = words.filter(word => isDue(word, ts + 12 * HOUR_MS)).length;
    } else {
      count = words.filter(word => {
        const review = reviewFor(word.id);
        return review?.due && dayKey(review.due) === dayKey(ts);
      }).length;
    }
    entries.push({ ts, count });
  }
  const max = Math.max(1, ...entries.map(entry => entry.count));
  const peak = entries.reduce((best, entry) => (entry.count > best.count ? entry : best), entries[0]);
  container.innerHTML = entries.map((entry, index) => {
    const d = new Date(entry.ts);
    const height = Math.max(3, Math.round((entry.count / max) * 100));
    return `
      <div class="forecast-bar ${index === 0 ? "is-today" : ""} ${entry === peak && entry.count > 0 ? "is-peak" : ""}">
        <span class="forecast-value">${entry.count || ""}</span>
        <span class="forecast-track"><i class="forecast-fill" style="height:${height}%"></i></span>
        <span class="forecast-day">${index === 0 ? "今天" : `周${WEEKDAYS_ZH[d.getDay()]}`}</span>
      </div>
    `;
  }).join("");

  $("#forecast-note").textContent = peak.count > 0
    ? `${peak.count === 1 ? "最近" : "峰值"}在${peak === entries[0] ? "今天" : `周${WEEKDAYS_ZH[new Date(peak.ts).getDay()]}`}，共 ${peak.count} 张。提前一点复习，会更轻松。`
    : "未来一周没有到期卡片。可以安心认识新词。";
}

function renderCalendar() {
  const grid = $("#calendar-grid");
  if (!grid) return;
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const todayKey = dayKey();
  const dueByDay = new Map();
  for (const word of allWords()) {
    const review = reviewFor(word.id);
    const due = review?.due ?? review?.nextReviewDate;
    if (!due) continue;
    const key = dayKey(due);
    dueByDay.set(key, (dueByDay.get(key) || 0) + 1);
  }

  $("#calendar-month").textContent = `${year} 年 ${month + 1} 月`;
  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const key = dayKey(date.getTime());
    const count = dueByDay.get(key) || 0;
    cells.push(`
      <div class="calendar-day ${date.getMonth() !== month ? "is-outside" : ""} ${key === todayKey ? "is-today" : ""} ${count ? "has-due" : ""}" title="${key}${count ? ` · ${count} 个词到期` : ""}">
        <span>${date.getDate()}</span>
        ${count ? `<span class="calendar-count">${count}</span>` : ""}
      </div>
    `);
  }
  grid.innerHTML = cells.join("");
}

function icsEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function exportCalendar() {
  const dueByDay = new Map();
  for (const word of allWords()) {
    const review = reviewFor(word.id);
    const due = review?.due ?? review?.nextReviewDate;
    if (!due) continue;
    const key = dayKey(due);
    dueByDay.set(key, (dueByDay.get(key) || 0) + 1);
  }
  if (!dueByDay.size) {
    showToast("还没有安排复习日期。先学几个词吧。");
    return;
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai";
  const todayKey = dayKey();
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wortkarte//Review Calendar//ZH",
    "CALSCALE:GREGORIAN",
    `X-WR-TIMEZONE:${timeZone}`,
    "X-WR-CALNAME:Wortkarte 复习"
  ];
  for (const [key, count] of [...dueByDay.entries()].sort()) {
    if (key < todayKey) continue;
    const [y, m, d] = key.split("-").map(Number);
    const start = new Date(y, m - 1, d, 9, 0, 0, 0);
    const end = new Date(start.getTime() + HOUR_MS);
    const format = date => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    lines.push(
      "BEGIN:VEVENT",
      `UID:wortkarte-${key}@local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${format(start)}`,
      `DTEND:${format(end)}`,
      `SUMMARY:${icsEscape(`Wortkarte 复习 · ${count} 个德语词`)}`,
      `DESCRIPTION:${icsEscape(`今天有 ${count} 个词到期。打开 Wortkarte 完成考察复习。此日历仅反映导出当日的计划。`)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape("Wortkarte 复习提醒")}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wortkarte-review.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("日历已导出。导入手机日历后会有提前 15 分钟的提醒。");
}

function openReminderModal(dueCount) {
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">ZEIT ZUM WIEDERHOLEN</p>
        <h2>该复习了。</h2>
        <p>今天还有 ${dueCount} 个词到期。先用考察模式过一遍，再决定记得多牢。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="dict-intro">
      <span class="dict-intro-icon">${icon("clock")}</span>
      <div>
        <strong>先抽查，再自评</strong>
        <p>到期词会随机出现，答完选择题再看完整词卡。评「忘记」的词明天会再次出现。</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>稍后</button>
      <button class="btn btn-primary" data-modal-action="start-reminder">开始考察</button>
    </div>
  `);
}

function checkReminder(now = new Date()) {
  if (!state.settings.reminderEnabled || session) return;
  if (!$("#modal-root")?.hidden && $("#modal-root")?.innerHTML) return;
  const [hour, minute] = String(state.settings.reminderTime || "20:00").split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return;
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  if (now < target) return;
  const today = dayKey(now.getTime());
  if (state.meta.reminderShown === today) return;
  const dueCount = getMetrics().dueToday.length;
  if (!dueCount) return;
  state.meta.reminderShown = today;
  persist();
  openReminderModal(dueCount);
}

function startReminderLoop() {
  if (reminderTimer) clearInterval(reminderTimer);
  reminderTimer = setInterval(() => checkReminder(), 30000);
  setTimeout(() => checkReminder(), 1200);
}

function renderHeatmap() {  const container = $("#heatmap");
  if (!container) return;
  const now = Date.now();
  const today = startOfDay(now).getTime();
  const mondayOffset = (new Date(today).getDay() + 6) % 7;
  const monday = today - mondayOffset * DAY_MS;
  const start = monday - 49 * DAY_MS;
  const cells = [];
  for (let weekday = 0; weekday < 7; weekday += 1) {
    cells.push(`<span class="heat-label">${WEEKDAYS_ZH[(weekday + 1) % 7]}</span>`);
    for (let week = 0; week < 8; week += 1) {
      const ts = start + (week * 7 + weekday) * DAY_MS;
      const count = state.activity[dayKey(ts)] || 0;
      let level = 0;
      if (count > 0) level = 1;
      if (count > 8) level = 2;
      if (count > 16) level = 3;
      if (count > 24) level = 4;
      const future = ts > today;
      cells.push(`
        <span class="heat-cell" data-level="${future ? 0 : level}" title="${dayKey(ts)} · ${count} 次复习" style="${future ? "opacity:.25" : ""}"></span>
      `);
    }
  }
  container.innerHTML = cells.join("");
}

function renderDifficult(metrics) {
  const container = $("#difficult-list");
  if (!container) return;
  const candidates = metrics.words
    .filter(word => reviewFor(word.id) || state.mistakes[word.id])
    .map(word => {
      const review = reviewFor(word.id);
      const mistakes = state.mistakes[word.id] || 0;
      return { word, review, mistakes, score: (review?.lapses || 0) * 3 + mistakes * 2 };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.review?.interval || 0) - (b.review?.interval || 0))
    .slice(0, 5);

  if (!candidates.length) {
    const fresh = metrics.words.filter(word => !reviewFor(word.id)).slice(0, 5);
    container.innerHTML = fresh.map(word => `
      <div class="difficult-row" data-word-row="${esc(word.id)}">
        <span class="due-article ${word.article || "none"}">${esc(word.article || "·")}</span>
        <span class="difficult-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="difficult-lapses" style="color:var(--blue);background:var(--blue-soft)">新词</span>
      </div>
    `).join("");
    return;
  }

  container.innerHTML = candidates.map(({ word, review, mistakes }) => {
    const typeLabels = { article: "冠词", cloze: "例句", conj: "变位", listening: "听音", review: "复习", de2zh: "义项", zh2de: "拼写" };
    const type = typeLabels[state.mistakeTypes[word.id]] || "";
    const label = mistakes > 0 ? `答错 ${mistakes} 次${type ? ` · ${type}` : ""}` : `遗忘 ${review?.lapses || 0} 次`;
    return `
      <div class="difficult-row" data-word-row="${esc(word.id)}">
        <span class="due-article ${word.article || "none"}">${esc(word.article || "·")}</span>
        <span class="difficult-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="difficult-lapses">${label}</span>
      </div>
    `;
  }).join("");
}

/* ─────────────────────────── Quiz ─────────────────────────── */

function todayReviewedWords() {
  const today = dayKey();
  return allWords().filter(word => {
    const review = reviewFor(word.id);
    return Boolean(review?.last) && dayKey(review.last) === today;
  });
}

function readRepeatLog() {
  try {
    const value = JSON.parse(localStorage.getItem(REPEAT_LOG_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeRepeatLog(log) {
  try {
    localStorage.setItem(REPEAT_LOG_KEY, JSON.stringify(log.slice(-50)));
  } catch {
    /* storage unavailable */
  }
}

function renderRepeatReview() {
  const card = $("#repeat-card");
  if (!card) return;
  const words = todayReviewedWords();
  if (!words.length) {
    card.hidden = true;
    return;
  }
  const today = dayKey();
  const rounds = readRepeatLog().filter(item => item.date === today).length;
  card.hidden = false;
  $("#repeat-copy").textContent = rounds >= 2
    ? `今天已复习 ${words.length} 个词 · 今日回顾已完成`
    : `今天已复习 ${words.length} 个词 · 已完成 ${rounds} / 2 次回顾`;
  const button = $("#repeat-start");
  if (button) {
    button.textContent = rounds >= 2 ? "回顾完成" : rounds ? "再来一次" : "开始回顾";
    button.disabled = rounds >= 2;
  }
}

function startRepeatReview() {
  const queue = shuffle(todayReviewedWords()).slice(0, 40);
  if (!queue.length) {
    showToast("今天还没有复习过的词。先完成一组学习吧。");
    return;
  }
  if (readRepeatLog().filter(item => item.date === dayKey()).length >= 2) {
    showToast("今天的两次回顾已经完成。");
    return;
  }
  const last = readRepeatLog()
    .filter(item => item.date === dayKey() && item.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
  if (last) {
    const wait = Math.ceil((new Date(last.completedAt).getTime() + (Number(state.settings.repeatIntervalMin) || 30) * 60000 - Date.now()) / 60000);
    if (wait > 0) showToast(`建议再等 ${wait} 分钟再回顾，效果更好。`);
  }
  closeModal();
  stopStudyTimer();
  $("#study-summary").classList.add("hidden");
  $("#study-stage").classList.remove("hidden");
  $("#view-study").classList.remove("is-revealed");
  session = {
    queue,
    index: 0,
    done: 0,
    ratings: [],
    start: Date.now(),
    mode: "repeat",
    topicId: null,
    limit: queue.length,
    transitioning: false,
    finished: false,
    phase: "card",
    exam: null,
    examStats: { total: 0, correct: 0 }
  };
  $("#study-topic-label").textContent = "今日回顾";
  $("#study-timer").textContent = "00:00";
  setView("study");
  startStudyTimer();
  renderStudyCard();
}

function logRepeatReview() {
  if (!session || session.mode !== "repeat") return;
  const log = readRepeatLog();
  const correct = session.ratings.filter(item => item.rating === "good" || item.rating === "easy").length;
  log.push({
    date: dayKey(),
    count: session.queue.length,
    correct,
    completedAt: new Date().toISOString()
  });
  writeRepeatLog(log);
  renderRepeatReview();
}

/* ─────────────────────────── Weekly quiz ─────────────────────────── */

function isoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / DAY_MS) + 1) / 7);
  return `${d.getUTCFullYear()}-W${pad(week)}`;
}

function readWeeklyQuiz() {
  try {
    const value = JSON.parse(localStorage.getItem(WEEKLY_QUIZ_KEY) || "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

function writeWeeklyQuiz(value) {
  try {
    if (value) localStorage.setItem(WEEKLY_QUIZ_KEY, JSON.stringify(value));
    else localStorage.removeItem(WEEKLY_QUIZ_KEY);
  } catch {
    /* storage unavailable */
  }
}

function readWeeklyHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(WEEKLY_HISTORY_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeWeeklyHistory(history) {
  try {
    localStorage.setItem(WEEKLY_HISTORY_KEY, JSON.stringify(history.slice(-20)));
  } catch {
    /* storage unavailable */
  }
}

function learnedWords() {
  return allWords().filter(word => {
    const review = reviewFor(word.id);
    return Boolean(review) && statusFor(word) !== "new";
  });
}

function ensureWeeklyQuiz() {
  const week = isoWeekKey();
  let current = readWeeklyQuiz();
  if (current && current.week !== week) {
    if (current.status === "generated" || current.status === "started") {
      const history = readWeeklyHistory();
      history.push({ ...current, status: "expired", archivedAt: new Date().toISOString() });
      writeWeeklyHistory(history);
    }
    current = null;
  }
  if (!current) {
    current = {
      week,
      status: "generated",
      createdAt: new Date().toISOString(),
      score: null,
      total: 8
    };
    writeWeeklyQuiz(current);
  }
  return current;
}

function archiveWeeklyQuiz(current) {
  if (!current) return;
  const history = readWeeklyHistory();
  if (!history.some(item => item.week === current.week && item.status === current.status && item.score === current.score)) {
    history.push({ ...current, archivedAt: new Date().toISOString() });
    writeWeeklyHistory(history);
  }
}

function renderWeeklyQuiz() {
  const card = $("#weekly-quiz-card");
  if (!card) return;
  if (state.settings.weeklyQuizEnabled === false) {
    card.hidden = true;
    return;
  }
  const current = ensureWeeklyQuiz();
  const poolSize = learnedWords().length;
  const questionCount = weeklyQuestionCount();
  if (poolSize < 4) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  const title = $("#weekly-quiz-title");
  const copy = $("#weekly-quiz-copy");
  const start = $("#weekly-quiz-start");
  const skip = $("#weekly-quiz-skip");
  if (current.status === "completed") {
    title.textContent = `本周小测 · ${current.score ?? 0}%`;
    copy.textContent = `已完成 ${current.total || questionCount} 题；可再做一次，不会改变复习进度。`;
    start.textContent = "再做一次";
    skip.hidden = true;
  } else if (current.status === "skipped") {
    title.textContent = "本周小测已跳过";
    copy.textContent = "跳过不会扣除学习进度，下周仍会自动生成新卷。";
    start.textContent = "改变主意";
    skip.hidden = true;
  } else {
    title.textContent = "本周小测";
    copy.textContent = `从 ${poolSize} 个已学词中抽 ${questionCount} 题，约 3 分钟。`;
    start.textContent = current.status === "started" ? "继续小测" : "开始小测";
    skip.hidden = false;
  }
}

function startWeeklyQuiz() {
  const current = ensureWeeklyQuiz();
  const pool = learnedWords();
  if (pool.length < 4) {
    showToast("先学几个词，再回来做本周小测。");
    return;
  }
  quiz.mode = "de-zh";
  quiz.level = "all";
  quiz.weekly = true;
  quiz.weekId = current.week;
  const count = Math.min(weeklyQuestionCount(), pool.length);
  const targets = shuffle(pool).slice(0, count);
  const weeklyModes = ["de-zh", "zh-de", "article", "cloze", "conj", "listening"];
  quiz.questions = targets.map((target, index) => {
    const mode = weeklyModes[index % weeklyModes.length];
    return buildQuizQuestion(target, pool, mode);
  });
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();
  current.status = "started";
  current.total = count;
  writeWeeklyQuiz(current);

  setView("quiz");
  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function skipWeeklyQuiz() {
  const current = ensureWeeklyQuiz();
  current.status = "skipped";
  current.skippedAt = new Date().toISOString();
  writeWeeklyQuiz(current);
  archiveWeeklyQuiz(current);
  renderWeeklyQuiz();
  showToast("本周小测已跳过，不影响复习进度。");
}

function resetQuizSetup() {
  quiz.active = false;
  quiz.answered = false;
  quiz.weekly = false;
  quiz.weekId = "";
  $("#quiz-setup")?.classList.remove("hidden");
  $("#quiz-play")?.classList.add("hidden");
  $("#quiz-result")?.classList.add("hidden");
  $$(".quiz-mode").forEach(mode => {
    mode.classList.toggle("is-selected", mode.dataset.quizMode === quiz.mode);
  });
  const levelSelect = $("#quiz-level");
  if (levelSelect) levelSelect.value = quiz.level || "all";
  const next = $("#quiz-next");
  if (next) next.hidden = true;
}

function selectQuizMode(mode) {
  if (!["de-zh", "zh-de", "article", "listening"].includes(mode)) return;
  quiz.mode = mode;
  $$(".quiz-mode").forEach(button => {
    button.classList.toggle("is-selected", button.dataset.quizMode === mode);
  });
}

function optionText(word, mode) {
  if (mode === "zh-de") return wordDisplay(word);
  return word.translation;
}

function buildQuizQuestion(target, pool, requestedMode = quiz.mode) {
  const mode = ["de-zh", "zh-de", "article", "listening", "cloze", "conj"].includes(requestedMode)
    ? requestedMode
    : "de-zh";
  if (mode === "article") {
    if (target.pos !== "noun" || !target.article) return buildQuizQuestion(target, pool, "de-zh");
    const options = shuffle(["der", "die", "das"]).map(text => ({
      text,
      correct: text === target.article
    }));
    return {
      mode,
      word: target,
      options,
      correctIndex: options.findIndex(option => option.correct)
    };
  }

  if (mode === "cloze") {
    const example = String(target.exampleDe || target.example || "");
    if (!example || !example.toLocaleLowerCase("de").includes(String(target.word).toLocaleLowerCase("de"))) {
      return buildQuizQuestion(target, pool, "zh-de");
    }
    const prompt = example.replace(new RegExp(target.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "___");
    const chosenWords = [target];
    const seenCloze = new Set([wordDisplay(target)]);
    for (const candidate of shuffle(pool.filter(word => word.id !== target.id))) {
      if (!candidate.word || seenCloze.has(wordDisplay(candidate))) continue;
      chosenWords.push(candidate);
      seenCloze.add(wordDisplay(candidate));
      if (chosenWords.length === 4) break;
    }
    const options = shuffle(chosenWords).map(word => ({
      text: wordDisplay(word),
      correct: word.id === target.id
    }));
    return { mode, word: target, prompt, options, correctIndex: options.findIndex(option => option.correct) };
  }

  if (mode === "conj") {
    const pr3sg = target.conj?.pr3sg || String(target.forms || "").split(/[,;，；]/)[0]?.trim();
    if (!pr3sg) return buildQuizQuestion(target, pool, "de-zh");
    const chosenWords = [target];
    const seenConj = new Set([pr3sg]);
    for (const candidate of shuffle(pool.filter(word => word.id !== target.id && word.pos === "verb"))) {
      const form = candidate.conj?.pr3sg || String(candidate.forms || "").split(/[,;，；]/)[0]?.trim();
      if (!form || seenConj.has(form)) continue;
      chosenWords.push({ ...candidate, __form: form });
      seenConj.add(form);
      if (chosenWords.length === 4) break;
    }
    if (chosenWords.length < 4) return buildQuizQuestion(target, pool, "de-zh");
    const options = shuffle(chosenWords).map(word => ({
      text: word.id === target.id ? pr3sg : word.__form,
      correct: word.id === target.id
    }));
    return {
      mode,
      word: target,
      prompt: `${target.word} · er/sie/es ___`,
      options,
      correctIndex: options.findIndex(option => option.correct)
    };
  }

  const chosen = [target];
  const seen = new Set([optionText(target, mode)]);
  const candidates = shuffle(pool.filter(word => word.id !== target.id));
  for (const candidate of candidates) {
    const text = optionText(candidate, mode);
    if (!seen.has(text)) {
      chosen.push(candidate);
      seen.add(text);
    }
    if (chosen.length === 4) break;
  }

  if (chosen.length < 4) {
    for (const candidate of shuffle(allWords())) {
      const text = optionText(candidate, mode);
      if (!seen.has(text)) {
        chosen.push(candidate);
        seen.add(text);
      }
      if (chosen.length === 4) break;
    }
  }

  const options = shuffle(chosen).map(word => ({
    text: optionText(word, mode),
    correct: word.id === target.id
  }));

  return {
    mode,
    word: target,
    options,
    correctIndex: options.findIndex(option => option.correct)
  };
}

function startBankQuiz(category = "all", type = "mixed", level = "all") {
  let questions = [];
  const wants = key => category === "all" || category === key;

  if (wants("words")) {
    const pool = allWords().filter(word => level === "all" || word.level === level);
    const targets = shuffle(pool).slice(0, category === "words" ? 12 : 5);
    for (const target of targets) {
      const mode = type === "zh-de" || (type === "mixed" && Math.random() > 0.55) ? "zh-de" : "de-zh";
      questions.push(buildQuizQuestion(target, pool, mode));
    }
  }
  if (wants("phrases")) questions.push(...phraseQuestionBank(category, level, type));
  if (wants("grammar")) questions.push(...grammarQuestionBank(level, type));
  if (wants("articles")) questions.push(...articleQuestionBank(level));

  if (!questions.length) {
    showToast("这个范围暂时没有可用题目，换一个内容或难度。");
    return;
  }
  quiz.weekly = false;
  quiz.weekId = "";
  quiz.mode = "bank";
  quiz.bankConfig = { category, type, level };
  quiz.questions = shuffle(questions).slice(0, 12);
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();
  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function startQuiz() {
  quiz.weekly = false;
  quiz.weekId = "";
  quiz.bankConfig = null;
  if (!["de-zh", "zh-de", "article", "listening"].includes(quiz.mode)) {
    quiz.mode = "de-zh";
  }
  const level = $("#quiz-level")?.value || "all";
  quiz.level = level;
  let pool = allWords().filter(word => level === "all" || word.level === level);
  if (quiz.mode === "article") pool = pool.filter(word => word.pos === "noun" && word.article);
  if (pool.length < 3) {
    showToast("这个词库范围里的词太少，换一个范围试试。");
    return;
  }
  if (quiz.mode !== "article" && pool.length < 4) {
    showToast("至少需要 4 个词才能生成选项。");
    return;
  }

  const count = Math.min(10, pool.length);
  const targets = shuffle(pool).slice(0, count);
  quiz.questions = targets.map(target => buildQuizQuestion(target, pool));
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();

  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quiz.questions[quiz.index];
  if (!question) return finishQuiz();
  const word = question.word;
  const total = quiz.questions.length;
  const isLast = quiz.index === total - 1;
  const mode = question.mode || quiz.mode;

  quiz.answered = false;
  $("#quiz-progress-label").textContent = `${quiz.index + 1} / ${total}`;
  $("#quiz-progress-bar").style.width = `${(quiz.index / total) * 100}%`;
  $("#quiz-score").textContent = quiz.score;
  $("#quiz-level-chip").textContent = word.level || "A1";

  const promptLabels = {
    "de-zh": "WAS BEDEUTET DAS?",
    "zh-de": "WIE HEISST DAS AUF DEUTSCH?",
    article: "WELCHER ARTIKEL?",
    listening: "WAS HÖRST DU?",
    cloze: "WELCHES WORT PASST?",
    conj: "WELCHE FORM IST RICHTIG?"
  };
  $("#quiz-prompt-label").textContent = promptLabels[mode] || "WAS BEDEUTET DAS?";

  const questionEl = $("#quiz-question");
  questionEl.classList.remove("is-long", "is-zh");
  if (mode === "de-zh") {
    questionEl.innerHTML = `${word.article ? `<span class="article" data-art="${esc(word.article)}">${esc(word.article)}</span> ` : ""}${esc(word.word)}`;
    if (word.word.length > 15) questionEl.classList.add("is-long");
  } else if (mode === "zh-de") {
    questionEl.textContent = word.translation;
    questionEl.classList.add("is-zh");
  } else if (mode === "article") {
    questionEl.innerHTML = `<span class="quiz-blank">___</span> ${esc(word.word)}`;
    if (word.word.length > 13) questionEl.classList.add("is-long");
  } else if (mode === "cloze" || mode === "conj") {
    questionEl.textContent = question.prompt || word.word;
  } else {
    questionEl.textContent = "Hör zu.";
  }

  const audioButton = $('[data-action="speak-quiz"]');
  if (audioButton) {
    audioButton.style.display = mode === "de-zh" || mode === "listening" ? "" : "none";
    audioButton.classList.remove("is-speaking");
  }

  $("#quiz-options").innerHTML = question.options.map((option, index) => `
    <button class="quiz-option" data-quiz-option="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${esc(option.text)}</span>
    </button>
  `).join("");
  $("#quiz-options").classList.toggle("is-three", question.options.length === 3);

  $("#quiz-feedback").classList.add("hidden");
  $("#quiz-feedback").classList.remove("is-wrong");
  $("#quiz-next").hidden = true;
  $("#quiz-hint").textContent = mode === "listening" ? "点击朗读，再选择释义" : "点击选项作答，或按 1–4";

  if (mode === "listening" && state.settings.sound !== false) {
    setTimeout(() => {
      if (quiz.active && quiz.index === quiz.questions.indexOf(question)) {
        speakText(wordDisplay(word), audioButton);
      }
    }, 380);
  }
}

function answerQuiz(index) {
  if (!quiz.active || quiz.answered) return;
  const question = quiz.questions[quiz.index];
  const chosen = question.options[index];
  if (!chosen) return;

  quiz.answered = true;
  const isCorrect = Boolean(chosen.correct);
  recordLevelAnswer(question.word.level, isCorrect);
  if (isCorrect) {
    quiz.score += 1;
  } else {
    if (getWord(question.word.id)) {
      state.mistakes[question.word.id] = (state.mistakes[question.word.id] || 0) + 1;
      state.mistakeTypes[question.word.id] = question.mode || quiz.mode || "quiz";
    }
  }
  persist();
  quiz.answers.push({
    word: question.word,
    chosen: chosen.text,
    correct: isCorrect,
    correctText: question.options[question.correctIndex].text,
    explanation: question.explanation || ""
  });

  $$("#quiz-options .quiz-option").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correctIndex) button.classList.add("is-correct");
    if (buttonIndex === index && !isCorrect) button.classList.add("is-wrong");
    if (buttonIndex !== index && buttonIndex !== question.correctIndex) button.classList.add("is-dimmed");
  });

  $("#quiz-score").textContent = quiz.score;
  $("#quiz-progress-bar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;

  const feedback = $("#quiz-feedback");
  const mark = $("#feedback-mark");
  feedback.classList.remove("hidden");
  feedback.classList.toggle("is-wrong", !isCorrect);
  mark.innerHTML = icon(isCorrect ? "check" : "close");
  $("#feedback-title").textContent = isCorrect ? "Richtig!" : "Fast!";
  $("#feedback-copy").textContent = isCorrect
    ? `${question.explanation || `${wordDisplay(question.word)} — ${question.word.translation}`} ${question.word.exampleZh || ""}`.trim()
    : `${question.explanation || `正确答案是「${question.options[question.correctIndex].text}」。`} ${question.word.example || ""}`.trim();

  const next = $("#quiz-next");
  next.hidden = false;
  next.innerHTML = quiz.index === quiz.questions.length - 1
    ? `查看结果 ${icon("arrow-right")}`
    : `下一题 ${icon("arrow-right")}`;
  $("#quiz-hint").textContent = "按 Enter 继续";
}

function nextQuizQuestion() {
  if (!quiz.active || !quiz.answered) return;
  if (quiz.index >= quiz.questions.length - 1) {
    finishQuiz();
    return;
  }
  quiz.index += 1;
  quiz.answered = false;
  renderQuizQuestion();
}

function finishQuiz() {
  quiz.active = false;
  const total = quiz.questions.length;
  const percent = total ? Math.round((quiz.score / total) * 100) : 0;
  const wrong = quiz.answers.filter(answer => !answer.correct);
  state.quizBest = Math.max(Number(state.quizBest) || 0, percent);
  if (quiz.weekly) {
    const current = readWeeklyQuiz();
    if (current && current.week === quiz.weekId) {
      current.status = "completed";
      current.score = percent;
      current.correct = quiz.score;
      current.total = total;
      current.completedAt = new Date().toISOString();
      writeWeeklyQuiz(current);
      archiveWeeklyQuiz(current);
    }
    renderWeeklyQuiz();
  }
  persist();

  $("#quiz-play").classList.add("hidden");
  $("#quiz-result").classList.remove("hidden");
  $("#result-percent").textContent = percent;
  $("#result-correct").textContent = quiz.score;
  $("#result-wrong").textContent = wrong.length;
  $("#result-best").textContent = `${state.quizBest}%`;
  const ring = $("#result-ring");
  ring.style.strokeDashoffset = String(RING_SMALL * (1 - percent / 100));

  const title = percent >= 90
    ? "Ausgezeichnet."
    : percent >= 70
      ? "Gut gemacht."
      : percent >= 50
        ? "Weiter dran."
        : "Noch eine Runde.";
  const copy = percent >= 90
    ? "这些词已经不只是“见过”，它们开始真正属于你了。"
    : percent >= 70
      ? "大部分词都接住了。再复习一下错题，下次会更稳。"
      : percent >= 50
        ? "已经有一半的词汇站稳了。错题会被安排更早再见。"
        : "第一次测验只是起点。先记住错题里的画面，再来一次。";
  $("#result-title").textContent = title;
  $("#result-copy").textContent = copy;
  const answeredLevels = [...new Set(quiz.answers.map(answer => normalizeCefrLevel(answer.word.level)))];
  const recommendation = answeredLevels.map(levelRecommendation).find(Boolean);
  if (recommendation) $("#result-copy").textContent = `${copy} ${recommendation}`;

  $("#result-review").innerHTML = quiz.answers.length
    ? quiz.answers.map(answer => `
        <div class="result-wrong-row ${answer.correct ? "is-correct" : ""}">
          <span class="article" data-art="${esc(answer.word.article || "none")}">${esc(answer.word.article || "·")}</span>
          <strong>${esc(answer.word.word)}</strong>
          <span>${answer.correct ? "正确" : `正确答案：${esc(answer.correctText)} · 你选了「${esc(answer.chosen)}」`}${answer.explanation ? `<small>${esc(answer.explanation)}</small>` : ""}</span>
        </div>
      `).join("")
    : `<p class="queue-empty" style="text-align:center">本轮没有答题记录。</p>`;
}

function quitQuiz() {
  quiz.active = false;
  resetQuizSetup();
  setView("quiz");
}

/* ─────────────────────────── Modals ─────────────────────────── */

function openWordModal(id) {
  const word = getWord(id);
  if (!word) return;
  const topic = getTopic(word.topic);
  const status = currentStatus(word);
  const statusMeta = STATUS_META[status] || STATUS_META.learning;
  const review = reviewFor(word.id);
  const favorite = state.favorites.includes(word.id);
  const article = word.article || "";

  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">WORTKARTE</p>
        <h2>词卡详情</h2>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="word-modal-hero" style="--topic-soft:${topic.soft};--topic-color:${topic.color}" data-letter="${esc(topic.letter)}">
      <p class="eyebrow">${esc(topic.de)}</p>
      <h3 class="modal-word">${article ? `<span class="article" data-art="${esc(article)}">${esc(article)}</span>` : ""}${esc(word.word)}</h3>
      <p class="modal-translation">${esc(word.translation)}</p>
      <div class="modal-meta">
        <span class="level-chip">${esc(word.level)}</span>
        <span class="status-badge ${statusMeta.cls}"><i></i>${statusMeta.label}</span>
        ${review ? `<span style="color:var(--muted);font-size:8.5px">下次复习 · ${esc(formatDue(review.due))}</span>` : `<span style="color:var(--muted);font-size:8.5px">还没开始学习</span>`}
      </div>
    </div>
    <div class="modal-facts">
      <div><span>词性</span><strong>${esc(POS_LABELS[word.pos] || "词")}</strong></div>
      <div><span>${word.pos === "noun" ? "复数" : "变位"}</span><strong>${esc(word.pos === "noun" ? pluralLabel(word) : (word.forms || "—"))}</strong></div>
      <div><span>等级</span><strong>${esc(word.level)}</strong></div>
    </div>
    ${word.example ? `
      <div class="modal-example">
        <p>${esc(word.example)}</p>
        ${word.exampleZh ? `<p>${esc(word.exampleZh)}</p>` : ""}
      </div>
    ` : ""}
    ${word.note ? `<p class="modal-note"><strong style="color:var(--forest-3)">记忆钩子 · </strong>${esc(word.note)}</p>` : ""}
    ${word.source ? `
      <p class="word-source">
        来源：${word.sourceUrl ? `<a href="${esc(word.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(word.source)}</a>` : esc(word.source)}
        ${word.translationSource ? ` · 中文释义：${esc(word.translationSource)}` : ""}
        ${word.license ? `<br>${esc(word.license)}` : ""}
      </p>
    ` : ""}
    <div class="modal-actions">
      <button class="btn btn-primary" data-modal-action="study" data-word-id="${esc(word.id)}">学习这张卡 ${icon("arrow-right")}</button>
      <button class="btn btn-ghost" data-modal-action="favorite" data-word-id="${esc(word.id)}">${icon("star")} ${favorite ? "已收藏" : "收藏"}</button>
      ${word.custom ? `<button class="btn btn-danger" data-modal-action="delete-word" data-word-id="${esc(word.id)}">删除</button>` : ""}
      <button class="btn btn-ghost" data-close>关闭</button>
    </div>
  `);
}

function openAddWordModal() {
  openModal(`
    <form data-form="add-word">
      <div class="modal-head">
        <div>
          <p class="eyebrow">NEUES WORT</p>
          <h2>添加一张词卡</h2>
          <p>它会加入你的词库，并按照同样的间隔重复节奏复习。</p>
        </div>
        <button class="modal-close" type="button" data-close aria-label="关闭">${icon("close")}</button>
      </div>
      <div class="form-grid">
        <div class="form-field full">
          <label for="new-word">德语单词 *</label>
          <input id="new-word" name="word" required maxlength="48" placeholder="z. B. die Wohnung / lernen">
        </div>
        <div class="form-field">
          <label for="new-pos">词性</label>
          <select id="new-pos" name="pos">
            <option value="noun">名词</option>
            <option value="verb">动词</option>
            <option value="adj">形容词</option>
            <option value="adv">副词</option>
          </select>
        </div>
        <div class="form-field">
          <label for="new-article">冠词（仅名词）</label>
          <select id="new-article" name="article">
            <option value="der">der</option>
            <option value="die">die</option>
            <option value="das">das</option>
            <option value="">无 / 非名词</option>
          </select>
        </div>
        <div class="form-field full">
          <label for="new-translation">中文释义 *</label>
          <input id="new-translation" name="translation" required maxlength="100" placeholder="例如：公寓；住处">
        </div>
        <div class="form-field">
          <label for="new-level">等级</label>
          <select id="new-level" name="level">
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
          </select>
        </div>
        <div class="form-field">
          <label for="new-topic">主题</label>
          <select id="new-topic" name="topic">
            ${TOPICS.filter(topic => !topic.isPack).map(topic => `<option value="${topic.id}">${esc(topic.name)}</option>`).join("")}
          </select>
        </div>
        <div class="form-field full">
          <label for="new-morph">复数 / 动词变位（可选）</label>
          <input id="new-morph" name="morph" maxlength="90" placeholder="die Wohnungen 或 lernt · lernte · hat gelernt">
        </div>
        <div class="form-field full">
          <label for="new-example">德语例句（可选）</label>
          <textarea id="new-example" name="example" maxlength="220" placeholder="Unser Alltag beginnt um sieben Uhr."></textarea>
        </div>
        <div class="form-field full">
          <label for="new-example-zh">例句中文（可选）</label>
          <input id="new-example-zh" name="exampleZh" maxlength="180" placeholder="我们的日常生活七点开始。">
        </div>
        <div class="form-field full">
          <label for="new-note">记忆钩子（可选）</label>
          <textarea id="new-note" name="note" maxlength="260" placeholder="一个画面、词根或和中文的联想……"></textarea>
        </div>
      </div>
      <p class="form-hint">所有内容只保存在当前浏览器。名字和进度可以在设置里管理。</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" type="button" data-close>取消</button>
        <button class="btn btn-primary" type="submit">保存词卡 ${icon("plus")}</button>
      </div>
    </form>
  `);
}

function openChangelogModal() {
  if (!CHANGELOG_DATA.length) {
    showToast("还没有更新日志。");
    return;
  }
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">CHANGELOG</p>
        <h2>更新日志</h2>
        <p>词库修正、功能变更与教材源登记，按版本倒序展示。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    ${CHANGELOG_SUMMARY.length ? (() => {
      const summary = CHANGELOG_SUMMARY[0];
      return `<div class="changelog-summary">
        <div><strong>本次更新总结</strong><small>${esc(summary.runId)} · ${esc(summary.version)} · ${summary.totalChanges} 条变更</small></div>
        <div class="changelog-summary-types">${Object.entries(summary.byType || {}).map(([type, count]) => `<span>${esc(type)} ${count}</span>`).join("")}</div>
        <ul>${(summary.highlights || []).map(item => `<li>${esc(item)}</li>`).join("")}</ul>
      </div>`;
    })() : ""}
    <div class="changelog-list">
      ${CHANGELOG_DATA.slice().reverse().map(entry => `
        <details class="changelog-entry" ${entry === CHANGELOG_DATA[CHANGELOG_DATA.length - 1] ? "open" : ""}>
          <summary>
            <span class="changelog-type ${esc(entry.type)}">${esc(entry.type)}</span>
            <span><strong>${esc(entry.summary)}</strong><small>${esc(entry.version)} · ${esc(entry.date)} · ${esc(entry.scope || "")}</small></span>
          </summary>
          <ul>${(entry.items || []).map(item => `<li>${esc(item)}</li>`).join("")}</ul>
        </details>
      `).join("")}
    </div>
    <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
  `);
}

function openLibraryResourcesModal() {
  const resources = [
    ["同济大学图书馆", "馆藏目录、数据库导航、电子期刊与文献传递入口", "https://www.lib.tongji.edu.cn/"],
    ["德文图书馆 Deutsch-Bibliothek", "德语教材、Duden/Grammatik、分级读物与德语报刊", "https://www.lib.tongji.edu.cn/index.php?classid=11965"],
    ["读者荐购 / 荐购到馆书目", "申请采购缺失的德语教辅与工具书", "https://www.lib.tongji.edu.cn/index.php?classid=11965"],
    ["数据库导航 / 电子期刊", "德语语料库、在线词典与德语期刊", "https://www.lib.tongji.edu.cn/"],
    ["文献传递", "获取本馆未藏的德语参考与专业搭配", "https://www.lib.tongji.edu.cn/"],
    ["PQDT 国际博硕士论文", "含德语术语的学位论文，补充学术例句", "https://www.lib.tongji.edu.cn/"],
    ["馆长信箱", "gzxx@tongji.edu.cn · 021-65983994 / 021-65987652", "mailto:gzxx@tongji.edu.cn"]
  ];
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">BIBLIOTHEK · TONGJI</p>
        <h2>图书馆德语资源</h2>
        <p>官方渠道只用于人工核对与出处登记，运行期不联网、不抓取。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="resource-list">
      ${resources.map(([title, copy, url]) => `
        <a class="resource-item" href="${esc(url)}" target="_blank" rel="noopener noreferrer">
          <span>${icon("arrow-right")}</span>
          <div><strong>${esc(title)}</strong><small>${esc(copy)}</small></div>
        </a>
      `).join("")}
    </div>
    <p class="settings-local-note">请遵守图书馆电子资源版权与访问限制；德文图书馆、荐购到馆书目与文献传递为人工核对渠道，不纳入运行期自动流程。</p>
    <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
  `);
}

function openSettingsModal() {
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">DEIN PROFIL</p>
        <h2>设置</h2>
        <p>让这个小工具更像你自己的学习空间。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="settings-list">
      <h3 class="settings-group-title">学习</h3>
      <div class="settings-row">
        <div><strong>你的名字</strong><small>会出现在首页问候里</small></div>
        <input type="text" id="setting-name" maxlength="24" value="${esc(state.settings.name || "Lena")}" aria-label="你的名字">
      </div>
      <div class="settings-row">
        <div><strong>每日单词量</strong><small>5–100，同时限制当日新词与复习队列</small></div>
        <input type="number" id="setting-goal" min="5" max="100" value="${Number(state.settings.dailyGoal) || 20}" aria-label="每日单词量">
      </div>
      <h3 class="settings-group-title">外观</h3>
      <div class="settings-row">
        <div><strong>页面主题</strong><small>切换整套颜色变量，立即生效</small></div>
        <select id="setting-theme" aria-label="页面主题">
          <option value="warm" ${state.settings.theme === "warm" ? "selected" : ""}>暖色</option>
          <option value="forest" ${state.settings.theme === "forest" ? "selected" : ""}>森林绿</option>
          <option value="blue" ${state.settings.theme === "blue" ? "selected" : ""}>雾蓝</option>
          <option value="dark" ${state.settings.theme === "dark" ? "selected" : ""}>深灰暗色</option>
          <option value="contrast" ${state.settings.theme === "contrast" ? "selected" : ""}>高对比度</option>
        </select>
      </div>
      <div class="settings-row">
        <div><strong>自定义主色</strong><small>覆盖当前主题的强调色</small></div>
        <input type="color" id="setting-accent" value="${esc(state.settings.accent || "#b85c38")}" aria-label="自定义主色">
      </div>
      <h3 class="settings-group-title">小测</h3>
      <div class="settings-row">
        <div><strong>小测难度</strong><small>简单 4 题 / 标准 8 题 / 挑战 12 题</small></div>
        <select id="setting-quiz-difficulty" aria-label="小测难度">
          <option value="simple" ${state.settings.quizDifficulty === "simple" ? "selected" : ""}>简单</option>
          <option value="standard" ${state.settings.quizDifficulty === "standard" ? "selected" : ""}>标准</option>
          <option value="challenge" ${state.settings.quizDifficulty === "challenge" ? "selected" : ""}>挑战</option>
        </select>
      </div>
      <div class="settings-row">
        <div><strong>每周小测推送</strong><small>关闭后主页不再显示本周小测卡片</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-weekly-quiz" ${state.settings.weeklyQuizEnabled !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <h3 class="settings-group-title">学习提醒</h3>
      <div class="settings-row">
        <div><strong>自动朗读</strong><small>听音辨词模式会直接播放发音</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-sound" ${state.settings.sound !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <div class="settings-row">
        <div><strong>复习提醒</strong><small>停留在页面时，到点提醒今日到期词</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-reminder-enabled" ${state.settings.reminderEnabled ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <div class="settings-row">
        <div><strong>晚间提醒时间</strong><small>纯静态页面无法后台唤醒，打开应用时检查</small></div>
        <input type="time" id="setting-reminder-time" value="${esc(state.settings.reminderTime || "20:00")}" aria-label="复习提醒时间">
      </div>
      <div class="settings-row">
        <div><strong>回顾最小间隔</strong><small>两次「今日回顾」之间建议等待的分钟数</small></div>
        <input type="number" id="setting-repeat-interval" min="10" max="120" value="${Number(state.settings.repeatIntervalMin) || 30}" aria-label="回顾最小间隔">
      </div>
      <h3 class="settings-group-title">数据</h3>
      <div class="settings-row">
        <div><strong>官方词表</strong><small>歌德证书 A1–C2 词汇 · 本地词表</small></div>
        <button class="btn btn-ghost" data-modal-action="open-dictionary">管理词表</button>
      </div>
      <div class="settings-row">
        <div><strong>导入学习内容</strong><small>文本 / JSON；失败自动重试 1 次后终止</small></div>
        <button class="btn btn-ghost" data-modal-action="import-content">导入内容</button>
      </div>
      <div class="settings-row">
        <div><strong>个性化推荐</strong><small>根据正确率、错题与学习时段给出本地建议</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-personalization" ${state.settings.personalization !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <h3 class="settings-group-title">关于</h3>
      <div class="settings-row">
        <div><strong>更新日志</strong><small>查看词库修正与功能变更</small></div>
        <button class="btn btn-ghost" data-modal-action="open-changelog">查看</button>
      </div>
      <div class="settings-row">
        <div><strong>图书馆德语资源</strong><small>同济大学图书馆官方德语资源入口</small></div>
        <button class="btn btn-ghost" data-modal-action="open-library-resources">查看</button>
      </div>
      <p class="settings-local-note">学习记录保存在当前浏览器 localStorage（数据结构 v${Number(state.schemaVersion) || 4}，约 ${Math.max(1, Math.round(JSON.stringify(state).length / 1024))} KB）；代码更新不会覆盖它。建议定期导出备份。</p>
    </div>
    <div class="settings-danger">
      <strong>备份与重置</strong>
      <p>导出 JSON 可以换设备继续学；重置只会清空复习进度，保留自定义词卡。</p>
      <div class="settings-actions">
        <button class="btn btn-ghost" data-modal-action="export">${icon("download")} 导出备份</button>
        <button class="btn btn-ghost" data-modal-action="import">导入备份</button>
        <button class="btn btn-danger" data-modal-action="reset-progress">${icon("trash")} 重置进度</button>
      </div>
      <input type="file" id="import-file" accept="application/json,.json" hidden>
      <input type="file" id="content-file" accept=".json,.txt,.md,application/json,text/plain" hidden>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>取消</button>
      <button class="btn btn-primary" data-modal-action="save-settings">保存设置</button>
    </div>
  `);
}

function addWordFromForm(form) {
  const data = new FormData(form);
  const wordValue = String(data.get("word") || "").trim();
  const translation = String(data.get("translation") || "").trim();
  const pos = String(data.get("pos") || "noun");
  const article = pos === "noun" ? String(data.get("article") || "").trim() : "";
  const morph = String(data.get("morph") || "").trim();

  if (!wordValue || !translation) {
    showToast("单词和中文释义都要填写。");
    return;
  }
  if (pos === "noun" && !article) {
    showToast("名词需要选择一个冠词。");
    return;
  }

  const cleanWord = wordValue.replace(/^(der|die|das)\s+/i, "").trim();
  const custom = {
    id: `custom-${Date.now()}`,
    word: cleanWord,
    article: article || null,
    plural: pos === "noun" ? (morph || null) : null,
    forms: pos === "verb" || pos === "adj" ? morph : "",
    pos,
    translation,
    level: String(data.get("level") || "A1"),
    topic: String(data.get("topic") || "alltag"),
    example: String(data.get("example") || "").trim(),
    exampleZh: String(data.get("exampleZh") || "").trim(),
    note: String(data.get("note") || "").trim(),
    custom: true
  };

  state.customWords.push(custom);
  refreshWordIndex();
  persist();
  closeModal();
  libraryFilters.query = "";
  libraryFilters.level = "all";
  libraryFilters.status = "all";
  renderAll();
  navigate("library");
  showToast(`已添加 ${wordDisplay(custom)}。`);
}

async function extractContent(file) {
  const text = await file.text();
  const trimmed = text.trim();
  if (!trimmed) throw new Error("empty");
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    return {
      words: Array.isArray(parsed.words) ? parsed.words : [],
      phrases: Array.isArray(parsed.phrases) ? parsed.phrases : [],
      articles: Array.isArray(parsed.articles) ? parsed.articles : [],
      grammar: Array.isArray(parsed.grammar) ? parsed.grammar : []
    };
  }
  const result = { words: [], phrases: [], articles: [], grammar: [] };
  let article = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("W|")) {
      const [, word, translation, level = "A1", articleValue = ""] = line.split("|");
      if (word && translation) result.words.push({ word: word.trim(), translation: translation.trim(), level, article: articleValue || null });
    } else if (line.startsWith("P|")) {
      const [, de, zh, example = "", exampleZh = "", level = "A1", category = "导入"] = line.split("|");
      if (de && zh) result.phrases.push({ id: `custom-ph-${Date.now()}-${result.phrases.length}`, de, zh, example, exampleZh, level, category, source: file.name });
    } else if (line.startsWith("A|")) {
      const [, titleDe, titleZh = "", contentDe = "", source = ""] = line.split("|");
      if (titleDe && contentDe) result.articles.push({ id: `custom-art-${Date.now()}-${result.articles.length}`, titleDe, titleZh, contentDe, source: source || file.name, sourceUrl: "", tags: ["导入"], summaryZh: "" });
    } else if (line.startsWith("G|")) {
      const [, title, summary = ""] = line.split("|");
      if (title) result.grammar.push({ id: `custom-grammar-${Date.now()}-${result.grammar.length}`, title, summary });
    }
  }
  if (!result.words.length && !result.phrases.length && !result.articles.length && !result.grammar.length) {
    throw new Error("unsupported");
  }
  return result;
}

async function importContentFile(file) {
  if (!file) return;
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const content = await extractContent(file);
      const stamp = Date.now();
      if (content.words.length) {
        state.customWords.push(...content.words.map((item, index) => ({
          id: `custom-import-${stamp}-${index}`,
          word: item.word,
          article: item.article || null,
          plural: item.plural || null,
          forms: item.forms || "",
          pos: item.pos || "noun",
          translation: item.translation || "",
          level: item.level || "A1",
          topic: "imported",
          example: item.example || "",
          exampleZh: item.exampleZh || "",
          source: file.name,
          custom: true
        })));
      }
      if (content.phrases.length) {
        state.customPhrases.push(...content.phrases.map((item, index) => ({
          id: item.id || `custom-ph-${stamp}-${index}`,
          de: item.de || item.word || "",
          zh: item.zh || item.translation || "",
          example: item.example || "",
          exampleZh: item.exampleZh || "",
          level: item.level || "A1",
          category: item.category || "导入",
          source: item.source || file.name
        })).filter(item => item.de && item.zh));
      }
      if (content.articles.length) {
        state.customArticles.push(...content.articles.map((item, index) => ({
          id: item.id || `custom-art-${stamp}-${index}`,
          titleDe: item.titleDe || item.title || "",
          titleZh: item.titleZh || "",
          contentDe: item.contentDe || item.content || "",
          source: item.source || file.name,
          sourceUrl: item.sourceUrl || "",
          tags: item.tags || ["导入"],
          summaryZh: item.summaryZh || ""
        })).filter(item => item.titleDe && item.contentDe));
      }
      if (content.grammar.length) state.customGrammar.push(...content.grammar);
      refreshWordIndex();
      persist();
      renderAll();
      closeModal();
      showToast(`提取成功：单词 ${content.words.length}、短语 ${content.phrases.length}、文章 ${content.articles.length}、语法 ${content.grammar.length}。`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  state.meta.extractionFailures = Array.isArray(state.meta.extractionFailures) ? state.meta.extractionFailures : [];
  state.meta.extractionFailures.push({ file: file.name, attempts: 2, failedAt: new Date().toISOString(), reason: String(lastError?.message || "extract-error") });
  persist();
  showToast(`提取失败：${file.name} 已重试 1 次，任务终止。`);
}

function exportState() {
  try {
    const payload = {
      ...state,
      exportedAt: new Date().toISOString(),
      app: "Wortkarte"
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wortkarte-${dayKey()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast("备份文件已开始下载。");
  } catch {
    showToast("导出失败：浏览器不允许下载或存储空间不足。");
  }
}

function importStateFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!parsed || typeof parsed !== "object" || !parsed.reviews || !parsed.settings) {
        throw new Error("invalid");
      }
      try {
        localStorage.setItem(`${STORAGE_KEY}.pre-import`, JSON.stringify(state));
      } catch {
        /* 保留导入前快照是尽力而为；即使空间不足也继续导入。 */
      }
      state = normalizeState(parsed);
      refreshWordIndex();
      persist();
      closeModal();
      renderAll();
      navigate("home");
      showToast("备份已导入，继续学习吧。");
    } catch {
      showToast("无法读取这个备份文件，请检查格式。");
    }
  };
  reader.onerror = () => showToast("读取备份文件失败，请重试。");
  reader.readAsText(file);
}

function resetProgress() {
  if (!window.confirm("确定要清空所有复习进度吗？自定义词卡会保留。")) return;
  const settings = { ...state.settings };
  const customWords = [...state.customWords];
  state = freshState();
  state.settings = settings;
  state.customWords = customWords;
  state.meta.demo = false;
  refreshWordIndex();
  persist();
  closeModal();
  renderAll();
  navigate("home");
  showToast("进度已重置。新的节奏，从今天开始。");
}

/* ─────────────────────────── Events ─────────────────────────── */

function renderAll() {
  renderHome();
  renderLibrary();
  renderGrammar();
  renderStats();
  renderChrome();
}

function handleAction(action, element) {
  switch (action) {
    case "start-daily":
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      break;
    case "quick-review":
      startStudy({ mode: "review", limit: 20 });
      break;
    case "quick-new":
      startStudy({ mode: "new", limit: 10 });
      break;
    case "start-topic":
      startStudy({ mode: "daily", topicId: element.dataset.topic, limit: 10 });
      break;
    case "start-weak":
      startStudy({ mode: "weak", limit: 8 });
      break;
    case "add-word":
      openAddWordModal();
      break;
    case "open-dictionary":
      openDictionaryModal();
      break;
    case "open-changelog":
      openChangelogModal();
      break;
    case "open-grammar-book":
      openGrammarBook();
      break;
    case "close-article":
      renderReading();
      try {
        history.replaceState(null, "", "#lesen");
      } catch {
        /* ignore embedded webview */
      }
      break;
    case "article-quiz": {
      const article = allArticles().find(item => item.id === element.dataset.articleId);
      const level = article ? gradeArticle(article).level : "all";
      startBankQuiz("articles", "de-zh", level);
      break;
    }
    case "start-pack":
      startPackStudy();
      break;
    case "settings":
      openSettingsModal();
      break;
    case "exit-study":
      exitStudy();
      break;
    case "study-again":
      if (session) {
        startStudy({ mode: session.mode, topicId: session.topicId, limit: session.limit });
      } else {
        startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      }
      break;
    case "exam-reveal":
      revealExamCard();
      break;
    case "calendar-prev":
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
      renderCalendar();
      break;
    case "calendar-next":
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
      renderCalendar();
      break;
    case "export-ics":
      exportCalendar();
      break;
    case "start-reminder":
      closeModal();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      break;
    case "speak-card":
      speakCurrentWord(element);
      break;
    case "speak-quiz":
      if (quiz.questions[quiz.index]) speakText(wordDisplay(quiz.questions[quiz.index].word), element);
      break;
    case "study-level": {
      const level = libraryFilters.level === "all" ? "A1" : libraryFilters.level;
      startStudy({ mode: "new", level, limit: 20 });
      break;
    }
    case "clear-filters":
      libraryFilters.query = "";
      libraryFilters.level = "all";
      libraryFilters.status = "all";
      libraryFilters.sort = "default";
      libraryVisibleLimit = 80;
      renderLibrary();
      break;
    case "library-more":
      libraryVisibleLimit += 160;
      renderLibrary();
      break;
    case "quit-quiz":
      quitQuiz();
      break;
    case "quiz-retry":
      if (quiz.mode === "bank" && quiz.bankConfig) {
        startBankQuiz(quiz.bankConfig.category, quiz.bankConfig.type, quiz.bankConfig.level);
      } else {
        startQuiz();
      }
      break;
    case "start-weekly-quiz":
      startWeeklyQuiz();
      break;
    case "skip-weekly-quiz":
      skipWeeklyQuiz();
      break;
    case "start-repeat":
      startRepeatReview();
      break;
    default:
      break;
  }
}

function bindEvents() {
  document.addEventListener("click", event => {
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      navigate(nav.dataset.nav);
      return;
    }

    const actionEl = event.target.closest("[data-action]");
    if (actionEl) {
      event.preventDefault();
      handleAction(actionEl.dataset.action, actionEl);
      return;
    }

    const ratingEl = event.target.closest("[data-rating]");
    if (ratingEl) {
      rateCard(ratingEl.dataset.rating);
      return;
    }

    const examOption = event.target.closest("[data-exam-option]");
    if (examOption) {
      answerExam(Number(examOption.dataset.examOption));
      return;
    }

    const quizModeEl = event.target.closest("[data-quiz-mode]");
    if (quizModeEl) {
      selectQuizMode(quizModeEl.dataset.quizMode);
      return;
    }

    const quizOption = event.target.closest("[data-quiz-option]");
    if (quizOption && !quizOption.disabled) {
      answerQuiz(Number(quizOption.dataset.quizOption));
      return;
    }

    const progressLevel = event.target.closest("[data-progress-level]");
    if (progressLevel) {
      const level = progressLevel.dataset.progressLevel;
      libraryFilters.level = libraryFilters.level === level ? "all" : level;
      libraryVisibleLimit = 80;
      renderLibrary();
      return;
    }

    const levelChip = event.target.closest("#level-filter [data-level]");
    if (levelChip) {
      libraryFilters.level = levelChip.dataset.level;
      libraryVisibleLimit = 80;
      renderLibrary();
      return;
    }

    const grammarLevelChip = event.target.closest("#grammar-filter [data-grammar-level]");
    if (grammarLevelChip) {
      grammarLevel = grammarLevelChip.dataset.grammarLevel;
      renderGrammar();
      return;
    }

    const cultureChip = event.target.closest("#culture-filter [data-culture-category]");
    if (cultureChip) {
      cultureCategory = cultureChip.dataset.cultureCategory;
      renderCulture();
      return;
    }

    const readingLevelChip = event.target.closest("#reading-level-filter [data-reading-level]");
    if (readingLevelChip) {
      readingLevel = readingLevelChip.dataset.readingLevel;
      renderReading();
      return;
    }

    const readingCard = event.target.closest("[data-article-id]");
    if (readingCard && !event.target.closest("[data-action]")) {
      openArticle(readingCard.dataset.articleId);
      return;
    }

    const grammarOption = event.target.closest("[data-grammar-option]");
    if (grammarOption && !grammarOption.disabled) {
      answerGrammar(grammarOption);
      return;
    }

    const grammarCard = event.target.closest("[data-grammar-id]");
    if (grammarCard) {
      openGrammarModal(grammarCard.dataset.grammarId);
      return;
    }

    const startWord = event.target.closest("[data-start-word]");
    if (startWord) {
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId: startWord.dataset.startWord });
      return;
    }

    const wordRow = event.target.closest("[data-word-row]");
    if (wordRow) {
      openWordModal(wordRow.dataset.wordRow);
      return;
    }
  });

  $("#flashcard")?.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    flipCard();
  });

  $("#hero-cta")?.addEventListener("click", () => startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) }));

  $("#library-search")?.addEventListener("input", event => {
    libraryFilters.query = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#phrase-search")?.addEventListener("input", event => {
    phraseQuery = event.target.value;
    renderPhrases();
  });

  $("#reading-search")?.addEventListener("input", event => {
    readingQuery = event.target.value;
    renderReading();
  });

  $("#bank-start")?.addEventListener("click", () => {
    startBankQuiz(
      $("#bank-category")?.value || "all",
      $("#bank-type")?.value || "mixed",
      $("#bank-level")?.value || "all"
    );
  });

  $("#global-search")?.addEventListener("input", event => {
    libraryFilters.query = event.target.value;
    libraryVisibleLimit = 80;
    if (!$("#view-library").classList.contains("is-active") && event.target.value.trim()) {
      navigate("library");
    } else {
      renderLibrary();
    }
  });

  $("#global-search")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate("library");
    }
    if (event.key === "Escape") {
      event.target.value = "";
      libraryFilters.query = "";
      renderLibrary();
      event.target.blur();
    }
  });

  $("#status-filter")?.addEventListener("change", event => {
    libraryFilters.status = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#sort-filter")?.addEventListener("change", event => {
    libraryFilters.sort = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#quiz-start")?.addEventListener("click", startQuiz);
  $("#quiz-level")?.addEventListener("change", event => {
    quiz.level = event.target.value;
  });
  $("#quiz-next")?.addEventListener("click", nextQuizQuestion);

  $("#word-of-day")?.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.currentTarget.dataset.startWord) {
      event.preventDefault();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId: event.currentTarget.dataset.startWord });
    }
  });

  const modalRoot = $("#modal-root");
  modalRoot?.addEventListener("click", event => {
    if (event.target === modalRoot) {
      closeModal();
      return;
    }
    if (event.target.closest("[data-close]")) {
      closeModal();
      return;
    }

    const jump = event.target.closest("[data-grammar-jump]");
    if (jump) {
      const target = document.getElementById(jump.dataset.grammarJump);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const actionEl = event.target.closest("[data-modal-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.modalAction;
    const wordId = actionEl.dataset.wordId;

    if (action === "study" && wordId) {
      closeModal();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId });
    } else if (action === "favorite" && wordId) {
      if (state.favorites.includes(wordId)) {
        state.favorites = state.favorites.filter(id => id !== wordId);
        showToast("已取消收藏。");
      } else {
        state.favorites.push(wordId);
        showToast("已加入收藏。");
      }
      persist();
      openWordModal(wordId);
      renderLibrary();
    } else if (action === "delete-word" && wordId) {
      if (!window.confirm("确定删除这张自定义词卡吗？")) return;
      state.customWords = state.customWords.filter(word => word.id !== wordId);
      delete state.reviews[wordId];
      delete state.mistakes[wordId];
      delete state.mistakeTypes[wordId];
      state.favorites = state.favorites.filter(id => id !== wordId);
      refreshWordIndex();
      persist();
      closeModal();
      renderAll();
      showToast("词卡已删除。");
    } else if (action === "save-settings") {
      const name = String($("#setting-name")?.value || "").trim() || "Lena";
      const goal = Math.max(5, Math.min(100, Number($("#setting-goal")?.value) || 20));
      const sound = Boolean($("#setting-sound")?.checked);
      const reminderEnabled = Boolean($("#setting-reminder-enabled")?.checked);
      const reminderTime = String($("#setting-reminder-time")?.value || "20:00");
      const theme = String($("#setting-theme")?.value || "warm");
      const accent = String($("#setting-accent")?.value || "");
      const quizDifficulty = String($("#setting-quiz-difficulty")?.value || "standard");
      const weeklyQuizEnabled = Boolean($("#setting-weekly-quiz")?.checked);
      const repeatIntervalMin = Math.max(10, Math.min(120, Number($("#setting-repeat-interval")?.value) || 30));
      const personalization = Boolean($("#setting-personalization")?.checked);
      if (!/^\d{2}:\d{2}$/.test(reminderTime)) {
        showToast("提醒时间格式应为 HH:MM。");
        return;
      }
      state.settings = { ...state.settings, name, dailyGoal: goal, sound, reminderEnabled, reminderTime, theme, accent, quizDifficulty, weeklyQuizEnabled, repeatIntervalMin, personalization };
      applyTheme();
      if (reminderEnabled) state.meta.reminderShown = "";
      persist();
      closeModal();
      renderAll();
      showToast(reminderEnabled ? `设置已保存。每天 ${reminderTime} 检查一次到期复习。` : "设置已保存。");
    } else if (action === "export") {
      exportState();
    } else if (action === "import") {
      $("#import-file")?.click();
    } else if (action === "import-content") {
      $("#content-file")?.click();
    } else if (action === "open-changelog") {
      closeModal();
      setTimeout(openChangelogModal, 30);
    } else if (action === "open-library-resources") {
      openLibraryResourcesModal();
    } else if (action === "open-dictionary") {
      closeModal();
      setTimeout(openDictionaryModal, 30);
    } else if (action === "import-pack" && actionEl.dataset.level) {
      importDictionaryLevels([actionEl.dataset.level]);
    } else if (action === "import-all-packs") {
      const status = packStatus();
      if (status) importDictionaryLevels(status.levels.map(item => item.level));
    } else if (action === "reset-progress") {
      resetProgress();
    }
  });

  modalRoot?.addEventListener("submit", event => {
    const form = event.target.closest("[data-form='add-word']");
    if (!form) return;
    event.preventDefault();
    addWordFromForm(form);
  });

  modalRoot?.addEventListener("change", event => {
    if (event.target.id === "import-file") {
      importStateFile(event.target.files?.[0]);
    }
    if (event.target.id === "content-file") {
      importContentFile(event.target.files?.[0]);
    }
  });

  document.addEventListener("keydown", event => {
    const target = event.target;
    const typing = target instanceof HTMLElement &&
      (target.matches("input, textarea, select") || target.isContentEditable);

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      const global = $("#global-search");
      if (global && global.offsetParent !== null) {
        global.focus();
        global.select();
      } else {
        navigate("library");
        $("#library-search")?.focus();
      }
      return;
    }

    if (event.key === "Escape") {
      if (!modalRoot.hidden) {
        closeModal();
        return;
      }
      if ($("#view-study").classList.contains("is-active")) {
        exitStudy();
        return;
      }
      if ($("#view-quiz").classList.contains("is-active") && quiz.active) {
        quitQuiz();
        return;
      }
    }

    if (!modalRoot.hidden || typing) return;

    if ($("#view-study").classList.contains("is-active") && session) {
      if (session.phase === "exam") {
        if (!session.exam?.answered && ["1", "2", "3", "4"].includes(event.key)) {
          event.preventDefault();
          answerExam(Number(event.key) - 1);
          return;
        }
        if (session.exam?.answered && event.key === "Enter") {
          event.preventDefault();
          revealExamCard();
        }
        return;
      }
      if (event.code === "Space") {
        const flipped = $("#flashcard").classList.contains("is-flipped");
        if (!flipped) {
          event.preventDefault();
          flipCard();
        }
        return;
      }
      if (["1", "2", "3", "4"].includes(event.key)) {
        const map = { 1: "again", 2: "hard", 3: "good", 4: "easy" };
        event.preventDefault();
        rateCard(map[event.key]);
        return;
      }
    }

    if ($("#view-quiz").classList.contains("is-active") && quiz.active) {
      if (!quiz.answered && ["1", "2", "3", "4"].includes(event.key)) {
        const index = Number(event.key) - 1;
        if (index < quiz.questions[quiz.index].options.length) {
          event.preventDefault();
          answerQuiz(index);
        }
      } else if (quiz.answered && event.key === "Enter") {
        event.preventDefault();
        nextQuizQuestion();
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    if (session && !session.finished) persist();
  });
}

/* ─────────────────────────── Init ─────────────────────────── */

function init() {
  applyTheme();
  refreshWordIndex();
  bindEvents();
  renderAll();
  resetQuizSetup();
  const deepArticle = articleFromHash();
  if (deepArticle) {
    navigate("reading");
    openArticle(deepArticle);
  } else {
    const initialView = new URLSearchParams(location.search || "").get("view");
    if (initialView && VIEW_LABELS[initialView]) navigate(initialView);
  }
  startReminderLoop();
  const todayWeekday = new Date().getDay();
  if (todayWeekday === 1) {
    // A tiny Monday greeting; harmless if the element is absent.
    document.documentElement.dataset.weekday = "monday";
  }
}

init();



