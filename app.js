/* =========================================================
   Wortkarte · application logic
   Vanilla JS, no build step, all progress stored locally.
   ========================================================= */

"use strict";

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MINUTE_MS = 60_000;
const STORAGE_KEY = "wortkarte.v2";
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
  other: "其他"
};

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
const GOETHE_WORDS = (() => {
  const pack = window.WORTKARTE_DICTIONARY;
  if (!pack || !pack.levels) return [];
  return Object.values(pack.levels).flatMap(level => Array.isArray(level.words) ? level.words : []);
})();

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
  if (word.pos === "noun") return `Nomen · ${pluralLabel(word)}`;
  if (word.forms) return `${POS_LABELS[word.pos] || "词"} · ${word.forms}`;
  return POS_LABELS[word.pos] || "词";
}

function morphLine(word) {
  if (word.pos === "noun") return `Nomen · ${pluralLabel(word)}`;
  if (word.forms) return `${POS_LABELS[word.pos] || "词"} · ${word.forms}`;
  return POS_LABELS[word.pos] || "词";
}

function defaultSettings() {
  return {
    name: "Lena",
    dailyGoal: 20,
    sound: true
  };
}

function freshState() {
  return {
    version: 2,
    settings: defaultSettings(),
    reviews: {},
    customWords: [],
    favorites: [],
    activity: {},
    stats: { reviews: 0, correct: 0 },
    mistakes: {},
    quizBest: 0,
    grammar: { seen: [], correct: [] },
    meta: { demo: false, createdAt: new Date().toISOString() }
  };
}

function makeReview({ reps, interval, ease, lapses, due, last, status }) {
  return {
    reps,
    interval,
    ease,
    lapses,
    due,
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
  return {
    ...base,
    ...raw,
    settings: { ...base.settings, ...(raw.settings || {}) },
    reviews: raw.reviews && typeof raw.reviews === "object" ? raw.reviews : {},
    customWords: Array.isArray(raw.customWords) ? raw.customWords : [],
    favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
    activity: raw.activity && typeof raw.activity === "object" ? raw.activity : {},
    stats: { ...base.stats, ...(raw.stats || {}) },
    mistakes: raw.mistakes && typeof raw.mistakes === "object" ? raw.mistakes : {},
    grammar: {
      ...base.grammar,
      ...(raw.grammar && typeof raw.grammar === "object" ? raw.grammar : {})
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
    return normalizeState(JSON.parse(saved));
  } catch {
    return freshState();
  }
}

let state = loadState();
let allWordList = [];
let wordMap = new Map();
let session = null;
let studyTimer = null;
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
  startTime: 0
};

const libraryFilters = {
  query: "",
  level: "all",
  status: "all",
  sort: "default"
};
let libraryVisibleLimit = 80;
let grammarLevel = "all";

function refreshWordIndex() {
  const seen = new Set();
  allWordList = [];
  for (const word of [...TEXTBOOK_WORDS, ...WORDS, ...GOETHE_WORDS, ...state.customWords]) {
    if (!word || !word.id || !word.word) continue;
    const key = `${String(word.word).trim().toLocaleLowerCase("de")}|${word.article || ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    allWordList.push(word);
  }
  wordMap = new Map(allWordList.map(word => [word.id, word]));
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
  if (review.status === "mastered" && review.reps >= 3) return "mastered";
  return "learning";
}

function isDue(word, now = Date.now()) {
  const review = reviewFor(word.id);
  return Boolean(review && review.due && review.due <= endOfDay(now).getTime());
}

function isDueNow(word, now = Date.now()) {
  const review = reviewFor(word.id);
  return Boolean(review && review.due && review.due <= now);
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
  } catch {
    showToast("浏览器存储空间不足，进度可能无法保存。");
  }
}

/* ─────────────────────────── Spaced repetition ─────────────────────────── */

function scheduleReview(previous, rating, now = Date.now()) {
  const base = previous
    ? {
        reps: Number(previous.reps) || 0,
        interval: Number(previous.interval) || 0,
        ease: Number(previous.ease) || 2.5,
        lapses: Number(previous.lapses) || 0
      }
    : { reps: 0, interval: 0, ease: 2.5, lapses: 0 };

  let { reps, interval, ease, lapses } = base;

  if (rating === "again") {
    reps = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
    interval = 10 / (24 * 60);
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

  const due = rating === "again"
    ? now + 10 * MINUTE_MS
    : now + Math.round(interval * DAY_MS);
  const status = interval >= 21 && reps >= 4 ? "mastered" : "learning";

  return {
    reps,
    interval: round(interval, 4),
    ease: round(ease, 2),
    lapses,
    due,
    last: now,
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
  return (ra?.due || 0) - (rb?.due || 0);
}

function buildQueue(mode = "daily", topicId = null, limit = 12, wordId = null) {
  const now = Date.now();
  let pool = allWords();
  if (topicId) pool = pool.filter(word => word.topic === topicId);

  if (wordId) {
    const chosen = getWord(wordId);
    return chosen ? [chosen] : [];
  }

  const due = pool.filter(word => isDue(word, now)).sort(sortByDue);
  const fresh = pool.filter(word => !reviewFor(word.id));
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
  library: "我的词库",
  grammar: "语法地图",
  quiz: "小测验",
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
  if (!VIEW_LABELS[view] || view === "study") return;
  closeModal();
  stopStudyTimer();
  session = null;
  $("#study-summary")?.classList.add("hidden");
  $("#study-stage")?.classList.remove("hidden");
  $("#view-study")?.classList.remove("is-revealed");
  setView(view);

  if (view === "home") renderHome();
  if (view === "library") renderLibrary();
  if (view === "grammar") renderGrammar();
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
  if (ctaLabel) ctaLabel.textContent = due > 0 ? "开始复习" : fresh > 0 ? "认识新词" : "再学一组";

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
  startStudy({ mode: "daily", topicId: "goethe", limit: 12 });
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
  $("#grammar-total").textContent = GRAMMAR_DATA.length;
  $("#grammar-count").textContent = `${topics.length} 个主题 · ${exerciseCount} 道小练习`;
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

function startStudy({ mode = "daily", topicId = null, limit = 12, wordId = null } = {}) {
  const queue = buildQueue(mode, topicId, limit, wordId);
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
    limit,
    transitioning: false,
    finished: false
  };

  const topicLabel = wordId
    ? "单张复习"
    : topicId
      ? getTopic(topicId).name
      : mode === "new"
        ? "认识新词"
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
  $("#back-pos").textContent = POS_LABELS[word.pos] || "词";
  $("#back-plural").textContent = word.pos === "noun" ? pluralLabel(word) : (word.forms || "—");
  $("#back-level-fact").textContent = word.level || "A1";
  $("#back-example").textContent = word.example || "—";
  $("#back-example-zh").textContent = word.exampleZh || "";
  $("#back-note").textContent = word.note || (word.pack || word.book
    ? "这是教材词表词条。试着用它造一个句子，再按 1–4 评价。"
    : "把这个词和你的生活连起来，它会更容易留下。");
  $("#example-block").classList.toggle("hidden", !word.example);
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
}

function flipCard() {
  if (!session || session.transitioning || session.finished) return;
  const flashcard = $("#flashcard");
  if (flashcard.classList.contains("is-flipped")) return;
  flashcard.classList.remove("is-entering");
  flashcard.classList.add("is-flipped");
  $("#view-study").classList.add("is-revealed");
}

function rateCard(rating) {
  if (!session || session.transitioning || session.finished) return;
  if (!$("#view-study").classList.contains("is-revealed")) return;
  const word = currentSessionWord();
  if (!word) return;

  session.transitioning = true;
  const previous = reviewFor(word.id);
  const next = scheduleReview(previous, rating);
  state.reviews[word.id] = next;
  state.activity[dayKey()] = (state.activity[dayKey()] || 0) + 1;
  state.stats.reviews = (Number(state.stats.reviews) || 0) + 1;
  if (rating === "good" || rating === "easy") {
    state.stats.correct = (Number(state.stats.correct) || 0) + 1;
    delete state.mistakes[word.id];
  }
  session.ratings.push({ id: word.id, rating });
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

/* ─────────────────────────── Library render ─────────────────────────── */

function currentStatus(word) {
  if (isDue(word)) return "due";
  return statusFor(word);
}

function filteredWords() {
  const query = normalize(libraryFilters.query.trim());
  let words = allWords().filter(word => {
    if (libraryFilters.level !== "all" && word.level !== libraryFilters.level) return false;
    if (libraryFilters.status !== "all" && currentStatus(word) !== libraryFilters.status) return false;
    if (!query) return true;
    const haystack = normalize([
      word.word,
      word.translation,
      word.example,
      word.exampleZh,
      word.note,
      word.plural,
      word.forms,
      word.article
    ].filter(Boolean).join(" "));
    return haystack.includes(query);
  });

  if (libraryFilters.sort === "level") {
    const order = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };
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

function renderLibrary() {
  const metrics = getMetrics();
  $("#library-total").textContent = metrics.total;
  $("#library-mastered").textContent = metrics.mastered;
  $("#library-learning").textContent = metrics.learning;
  $("#library-new").textContent = metrics.fresh;

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
  $("#home-library-link").innerHTML = `查看全部 ${metrics.total} 词 ${icon("arrow-right")}`;
  const packCount = state.customWords.filter(word => word.pack).length;
  const customCount = state.customWords.length - packCount;
  const textbookCount = TEXTBOOK_WORDS.length;
  const goetheCount = GOETHE_WORDS.length;
  $("#library-subline").textContent = textbookCount
    ? `${metrics.total} 个德语词，包含 ${textbookCount} 个《新求精》教材词条${goetheCount ? `，${goetheCount} 个歌德分级词表词条` : ""}${packCount ? `，${packCount} 个手动导入词条` : ""}${customCount ? `，${customCount} 个自定义收藏` : ""}。`
    : goetheCount
      ? `${metrics.total} 个德语词，其中 ${goetheCount} 个来自歌德分级词表${customCount ? `，${customCount} 个自定义收藏` : ""}。`
      : `${metrics.total} 个精心挑选的德语词，加上你自己添加的收藏。`;

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

function renderHeatmap() {
  const container = $("#heatmap");
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
    const label = mistakes > 0 ? `答错 ${mistakes} 次` : `遗忘 ${review?.lapses || 0} 次`;
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

function resetQuizSetup() {
  quiz.active = false;
  quiz.answered = false;
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

function buildQuizQuestion(target, pool) {
  if (quiz.mode === "article") {
    const options = shuffle(["der", "die", "das"]).map(text => ({
      text,
      correct: text === target.article
    }));
    return {
      word: target,
      options,
      correctIndex: options.findIndex(option => option.correct)
    };
  }

  const chosen = [target];
  const seen = new Set([optionText(target, quiz.mode)]);
  const candidates = shuffle(pool.filter(word => word.id !== target.id));
  for (const candidate of candidates) {
    const text = optionText(candidate, quiz.mode);
    if (!seen.has(text)) {
      chosen.push(candidate);
      seen.add(text);
    }
    if (chosen.length === 4) break;
  }

  if (chosen.length < 4) {
    for (const candidate of shuffle(allWords())) {
      const text = optionText(candidate, quiz.mode);
      if (!seen.has(text)) {
        chosen.push(candidate);
        seen.add(text);
      }
      if (chosen.length === 4) break;
    }
  }

  const options = shuffle(chosen).map(word => ({
    text: optionText(word, quiz.mode),
    correct: word.id === target.id
  }));

  return {
    word: target,
    options,
    correctIndex: options.findIndex(option => option.correct)
  };
}

function startQuiz() {
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

  quiz.answered = false;
  $("#quiz-progress-label").textContent = `${quiz.index + 1} / ${total}`;
  $("#quiz-progress-bar").style.width = `${(quiz.index / total) * 100}%`;
  $("#quiz-score").textContent = quiz.score;
  $("#quiz-level-chip").textContent = word.level || "A1";

  const promptLabels = {
    "de-zh": "WAS BEDEUTET DAS?",
    "zh-de": "WIE HEISST DAS AUF DEUTSCH?",
    article: "WELCHER ARTIKEL?",
    listening: "WAS HÖRST DU?"
  };
  $("#quiz-prompt-label").textContent = promptLabels[quiz.mode];

  const questionEl = $("#quiz-question");
  questionEl.classList.remove("is-long", "is-zh");
  if (quiz.mode === "de-zh") {
    questionEl.innerHTML = `${word.article ? `<span class="article" data-art="${esc(word.article)}">${esc(word.article)}</span> ` : ""}${esc(word.word)}`;
    if (word.word.length > 15) questionEl.classList.add("is-long");
  } else if (quiz.mode === "zh-de") {
    questionEl.textContent = word.translation;
    questionEl.classList.add("is-zh");
  } else if (quiz.mode === "article") {
    questionEl.innerHTML = `<span class="quiz-blank">___</span> ${esc(word.word)}`;
    if (word.word.length > 13) questionEl.classList.add("is-long");
  } else {
    questionEl.textContent = "Hör zu.";
  }

  const audioButton = $('[data-action="speak-quiz"]');
  if (audioButton) {
    audioButton.style.display = quiz.mode === "de-zh" || quiz.mode === "listening" ? "" : "none";
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
  $("#quiz-hint").textContent = quiz.mode === "listening" ? "点击朗读，再选择释义" : "点击选项作答，或按 1–4";

  if (quiz.mode === "listening" && state.settings.sound !== false) {
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
  if (isCorrect) {
    quiz.score += 1;
  } else {
    state.mistakes[question.word.id] = (state.mistakes[question.word.id] || 0) + 1;
    persist();
  }
  quiz.answers.push({
    word: question.word,
    chosen: chosen.text,
    correct: isCorrect,
    correctText: question.options[question.correctIndex].text
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
    ? `${wordDisplay(question.word)} — ${question.word.translation}。${question.word.exampleZh || ""}`
    : `正确答案是「${question.options[question.correctIndex].text}」。${question.word.example || ""}`;

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

  $("#result-review").innerHTML = wrong.length
    ? wrong.map(answer => `
        <div class="result-wrong-row">
          <span class="article" data-art="${esc(answer.word.article || "none")}">${esc(answer.word.article || "·")}</span>
          <strong>${esc(answer.word.word)}</strong>
          <span>${esc(answer.correctText)} · 你选了「${esc(answer.chosen)}」</span>
        </div>
      `).join("")
    : `<p class="queue-empty" style="text-align:center">全部答对。今天的记忆状态很好。</p>`;
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
      <div class="settings-row">
        <div><strong>你的名字</strong><small>会出现在首页问候里</small></div>
        <input type="text" id="setting-name" maxlength="24" value="${esc(state.settings.name || "Lena")}" aria-label="你的名字">
      </div>
      <div class="settings-row">
        <div><strong>每日目标</strong><small>建议 10–30 个词</small></div>
        <input type="number" id="setting-goal" min="5" max="80" value="${Number(state.settings.dailyGoal) || 20}" aria-label="每日目标">
      </div>
      <div class="settings-row">
        <div><strong>自动朗读</strong><small>听音辨词模式会直接播放发音</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-sound" ${state.settings.sound !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <div class="settings-row">
        <div><strong>官方词表</strong><small>歌德证书 A1–C2 词汇 · 本地词表</small></div>
        <button class="btn btn-ghost" data-modal-action="open-dictionary">管理词表</button>
      </div>
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

function exportState() {
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
      startStudy({ mode: "daily", limit: 12 });
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
    case "open-grammar-book":
      openGrammarBook();
      break;
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
        startStudy({ mode: "daily", limit: 12 });
      }
      break;
    case "speak-card":
      speakCurrentWord(element);
      break;
    case "speak-quiz":
      if (quiz.questions[quiz.index]) speakText(wordDisplay(quiz.questions[quiz.index].word), element);
      break;
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
      startQuiz();
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
      startStudy({ mode: "daily", limit: 12, wordId: startWord.dataset.startWord });
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

  $("#hero-cta")?.addEventListener("click", () => startStudy({ mode: "daily", limit: 12 }));

  $("#library-search")?.addEventListener("input", event => {
    libraryFilters.query = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
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
      startStudy({ mode: "daily", limit: 12, wordId: event.currentTarget.dataset.startWord });
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
      startStudy({ mode: "daily", limit: 12, wordId });
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
      state.favorites = state.favorites.filter(id => id !== wordId);
      refreshWordIndex();
      persist();
      closeModal();
      renderAll();
      showToast("词卡已删除。");
    } else if (action === "save-settings") {
      const name = String($("#setting-name")?.value || "").trim() || "Lena";
      const goal = Math.max(5, Math.min(80, Number($("#setting-goal")?.value) || 20));
      const sound = Boolean($("#setting-sound")?.checked);
      state.settings = { ...state.settings, name, dailyGoal: goal, sound };
      persist();
      closeModal();
      renderAll();
      showToast("设置已保存。");
    } else if (action === "export") {
      exportState();
    } else if (action === "import") {
      $("#import-file")?.click();
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
  refreshWordIndex();
  bindEvents();
  renderAll();
  resetQuizSetup();
  const todayWeekday = new Date().getDay();
  if (todayWeekday === 1) {
    // A tiny Monday greeting; harmless if the element is absent.
    document.documentElement.dataset.weekday = "monday";
  }
}

init();

