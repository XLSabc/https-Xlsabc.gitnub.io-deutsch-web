/* Wortkarte review engine — pure functions, no DOM / localStorage dependency.
 *
 * The browser app is a classic script, so the functions are exported through
 * window.WortkarteReview as well as module.exports for Node-based checks.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.WortkarteReview = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const FORMS = ["de2zh", "zh2de", "spell"];
  const FORM_META = {
    de2zh: { label: "德译中", short: "德→中", hint: "看德语，选中文", difficulty: 0 },
    zh2de: { label: "中译德", short: "中→德", hint: "看中文，选德语", difficulty: 1 },
    spell: { label: "单词拼写", short: "拼写", hint: "看中文，写出德语", difficulty: 2 }
  };
  const INTERVALS = [0, 5 * MINUTE, HOUR, DAY, 3 * DAY, 7 * DAY];
  const MAX_INTERVAL = 15 * DAY;
  const LEVEL_TO_MASTERY = ["unmastered", "forgotten", "shaky", "shaky", "mastered", "mastered"];
  const MASTERY_TO_LEVEL = { unmastered: 0, forgotten: 1, shaky: 3, mastered: 5, new: 0, due: 1 };

  function clampLevel(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(5, Math.round(number)));
  }

  function toTimestamp(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : 0;
  }

  function legacyLevel(rec) {
    if (Number.isFinite(Number(rec.userLevel))) return clampLevel(rec.userLevel);
    if (Number.isFinite(Number(rec.level)) && rec.level !== "") return clampLevel(rec.level);
    return MASTERY_TO_LEVEL[rec.mastery || rec.status] ?? 0;
  }

  function masteryForLevel(level) {
    return LEVEL_TO_MASTERY[clampLevel(level)] || "unmastered";
  }

  function normalize(rec) {
    const source = rec && typeof rec === "object" ? rec : {};
    const out = { ...source };
    out.word = String(source.word || "");
    out.translation = String(source.translation || "");
    out.userLevel = legacyLevel(source);
    out.testedLevels = {};
    for (const form of FORMS) {
      out.testedLevels[form] = source.testedLevels && source.testedLevels[form] ? 1 : 0;
    }
    out.lastTested = {};
    for (const form of FORMS) {
      out.lastTested[form] = toTimestamp(source.lastTested && source.lastTested[form]);
    }
    const legacyAttempts = (Number(source.reps ?? source.repetition) || 0) + (Number(source.lapses) || 0);
    out.attempts = Number.isFinite(Number(source.attempts))
      ? Math.max(0, Number(source.attempts))
      : (legacyAttempts > 0 ? 1 : 0);
    out.level = Number.isFinite(Number(source.level))
      ? clampLevel(source.level)
      : legacyLevel(source);
    out.streak = Number(source.streak ?? source.correctStreak) || 0;
    out.lastPenalty = ["self", "wrong"].includes(source.lastPenalty) ? source.lastPenalty : null;
    out.forceForm = FORMS.includes(source.forceForm) ? source.forceForm : null;
    out.nextReview = toTimestamp(source.nextReview ?? source.due ?? source.nextReviewDate);
    out.reps = Number(source.reps ?? source.repetition) || 0;
    out.lapses = Number(source.lapses) || 0;
    out.ease = Number(source.ease ?? source.easiness) || 2.5;
    out.interval = Number(source.interval) || 0;
    out.due = out.nextReview;
    out.nextReviewDate = out.nextReview;
    out.mastery = source.mastery || masteryForLevel(out.level);
    out.status = source.status || out.mastery;
    out.correctStreak = out.streak;
    return out;
  }

  function passedCount(rec) {
    return FORMS.reduce((count, form) => count + (rec.testedLevels[form] ? 1 : 0), 0);
  }

  function systemLevel(rec) {
    if (!rec.attempts) return null;
    const passed = passedCount(rec);
    return [0, 1, 3, 5][passed];
  }

  function allFormsPassed(rec) {
    return FORMS.every(form => rec.testedLevels[form] === 1);
  }

  function intervalFor(rec) {
    if (rec.lastPenalty === "wrong") return 10 * MINUTE;
    const level = clampLevel(rec.level);
    if (level === 5 && allFormsPassed(rec) && rec.streak >= 2) return MAX_INTERVAL;
    return INTERVALS[level];
  }

  function recompute(rec, now = Date.now(), options = {}) {
    const out = normalize(rec);
    const measured = systemLevel(out);
    out.systemLevel = measured;
    // userLevel 是首次自评起点，不是硬上限：后续由三形式作答结果逐级提高 level。
    out.level = Number.isFinite(Number(rec.level))
      ? clampLevel(rec.level)
      : out.userLevel;
    if (!out.attempts) out.level = out.userLevel;
    out.levelReason = out.lastPenalty === "wrong"
      ? "wrong"
      : out.attempts && !allFormsPassed(out)
        ? "testing"
        : null;
    if (!options.preserveDue || !out.nextReview) {
      out.nextReview = now + intervalFor(out);
    }
    out.due = out.nextReview;
    out.nextReviewDate = out.nextReview;
    out.interval = Math.round(intervalFor(out) / DAY * 10000) / 10000;
    out.mastery = masteryForLevel(out.level);
    out.status = out.mastery;
    out.correctStreak = out.streak;
    return out;
  }

  function setUserLevel(rec, level, now = Date.now()) {
    const out = normalize(rec);
    const target = clampLevel(level);
    if (Number.isFinite(Number(rec.userLevel)) && target > out.userLevel) return out;
    out.userLevel = target;
    out.testedLevels = { de2zh: 0, zh2de: 0, spell: 0 };
    out.lastTested = { de2zh: 0, zh2de: 0, spell: 0 };
    out.attempts = 0;
    out.streak = 0;
    out.lastPenalty = null;
    out.forceForm = null;
    out.lastForm = null;
    out.level = target;
    out.systemLevel = null;
    out.levelReason = null;
    out.reps = 1;
    out.lapses = 0;
    out.last = now;
    out.nextReview = now + INTERVALS[target];
    out.due = out.nextReview;
    out.nextReviewDate = out.nextReview;
    out.interval = Math.round(INTERVALS[target] / DAY * 10000) / 10000;
    out.mastery = masteryForLevel(target);
    out.status = out.mastery;
    out.correctStreak = 0;
    return out;
  }

  function review(rec, form, correct, now = Date.now()) {
    const out = normalize(rec);
    if (!FORMS.includes(form)) return out;
    // userLevel 是首次自评起点；这里只根据作答提高/降低 level，绝不修改 userLevel。
    out.attempts += 1;
    out.lastTested[form] = now;
    out.lastForm = form;
    out.forceForm = null;
    out.last = now;
    out.reps = (Number(out.reps) || 0) + 1;
    if (correct) {
      out.testedLevels[form] = 1;
      out.streak = (Number(out.streak) || 0) + 1;
      if (allFormsPassed(out)) {
        // 三种形式全部通过：掌握等级 +1，并开启下一轮三形式考核。
        out.level = Math.min(5, clampLevel(out.level) + 1);
        out.testedLevels = { de2zh: 0, zh2de: 0, spell: 0 };
        out.lastPenalty = null;
      }
    } else {
      // 任一形式答错：掌握等级 -1，三形式状态重置，10 分钟后重推。
      out.level = Math.max(0, clampLevel(out.level) - 1);
      out.testedLevels = { de2zh: 0, zh2de: 0, spell: 0 };
      out.streak = 0;
      out.lapses = (Number(out.lapses) || 0) + 1;
      out.lastPenalty = "wrong";
    }
    return recompute(out, now, { preserveDue: false });
  }

  function pickForm(rec) {
    const out = normalize(rec);
    if (out.forceForm) return out.forceForm;
    const untested = FORMS
      .filter(form => !out.testedLevels[form])
      .sort((a, b) => (out.lastTested[a] || 0) - (out.lastTested[b] || 0) || FORM_META[a].difficulty - FORM_META[b].difficulty);
    if (untested.length) return untested[0];
    return FORMS
      .slice()
      .sort((a, b) => (out.lastTested[a] || 0) - (out.lastTested[b] || 0) || FORM_META[a].difficulty - FORM_META[b].difficulty)[0];
  }

  function downgrade(rec, target, now = Date.now()) {
    const out = normalize(rec);
    const next = clampLevel(target);
    if (next >= out.userLevel) return out;
    out.userLevel = next;
    out.level = Math.min(clampLevel(out.level), next);
    out.forceForm = "de2zh";
    return recompute(out, now, { preserveDue: false });
  }

  function normalizeSpelling(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/\s+/g, " ");
  }

  function spellingCorrect(input, expected) {
    return normalizeSpelling(input) === normalizeSpelling(expected);
  }

  return {
    FORMS,
    FORM_META,
    INTERVALS,
    MAX_INTERVAL,
    normalize,
    review,
    pickForm,
    downgrade,
    recompute,
    setUserLevel,
    systemLevel,
    intervalFor,
    normalizeSpelling,
    spellingCorrect,
    masteryForLevel,
    clampLevel
  };
});
