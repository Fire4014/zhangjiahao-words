"use strict";

/* =========================================================
 * 《张佳昊今天背单词了没》主逻辑
 * 纯原生，零依赖，双击 index.html 即可离线游玩。
 * ========================================================= */

const WORDS_DATA = (typeof WORDS !== "undefined" ? WORDS : []);
const LEVEL_COUNT = 4;
const WORDS_PER_LEVEL = 15;

/* ---------- 本地存储 ---------- */
const KEYS = {
  unlock: "zjhw_unlock_level",
  stats: "zjhw_stats",
  notebook: "zjhw_notebook",
  muted: "zjhw_muted"
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // 隐私模式等场景下写入失败，静默忽略。
  }
}

function getUnlock() {
  const n = Number(loadJSON(KEYS.unlock, 1));
  return Number.isFinite(n) && n >= 1 ? Math.min(n, LEVEL_COUNT) : 1;
}

function setUnlock(n) {
  saveJSON(KEYS.unlock, Math.max(getUnlock(), Math.min(n, LEVEL_COUNT)));
}

function getStats() {
  return loadJSON(KEYS.stats, {});
}

function setLevelBest(level, correct) {
  const stats = getStats();
  const prev = stats[level] ? stats[level].best : 0;
  stats[level] = { best: Math.max(prev || 0, correct) };
  saveJSON(KEYS.stats, stats);
}

function getNotebook() {
  return loadJSON(KEYS.notebook, []);
}

function saveNotebook(list) {
  saveJSON(KEYS.notebook, list);
}

/* ---------- 全局状态 ---------- */
const state = {
  level: 1,
  queue: [],
  idx: 0,
  correct: 0,
  wrongThisLevel: [],
  answering: false,
  muted: loadJSON(KEYS.muted, false),
  returnScreen: "screen-levels",
  praiseTimer: null,
  boyFace: "idle"
};

/* ---------- 角色表情配置 ----------
 * 未提供照片时使用 emoji 占位；把对应 PNG 放入 assets/img/ 后自动生效。
 * 每个角色有一张 base 通用图，以及各状态的专属图（可选）。 */
const Faces = {
  boy: {
    base: "assets/img/zhangjiahao.png",
    states: {
      lie: { emoji: "🧑", img: "assets/img/zhangjiahao_lie.png" },
      idle: { emoji: "🧑", img: "assets/img/zhangjiahao_idle.png" },
      hit: { emoji: "😖", img: "assets/img/zhangjiahao_hit.png" },
      dizzy: { emoji: "😵", img: "assets/img/zhangjiahao_dizzy.png" },
      recover: { emoji: "🙂", img: "assets/img/zhangjiahao_recover.png" }
    }
  }
};

const FaceCache = {}; // "path" -> true/false

function preloadFaces() {
  const seen = new Set();
  Object.keys(Faces).forEach((kind) => {
    const cfg = Faces[kind];
    if (cfg.base) seen.add(cfg.base);
    Object.keys(cfg.states).forEach((s) => {
      const p = cfg.states[s].img;
      if (p) seen.add(p);
    });
  });
  let pending = seen.size;
  const settle = (p, ok) => {
    FaceCache[p] = ok;
    pending -= 1;
    if (pending <= 0) refreshAllFaces();
  };
  seen.forEach((p) => {
    const img = new Image();
    img.onload = () => settle(p, true);
    img.onerror = () => settle(p, false);
    img.src = p;
  });
  if (pending <= 0) refreshAllFaces();
}

function refreshAllFaces() {
  document.querySelectorAll(".char-bubble").forEach((b) => {
    applyFace(b, b.dataset.face, b.dataset.state || "lie");
  });
  applyFace(el.boyAvatar, "boy", state.boyFace || "idle");
}

/* 把某个头像容器（含 .avatar-emoji 与 .avatar-img）设为指定表情 */
function applyFace(container, kind, stateName) {
  if (!container) return;
  const emojiEl = container.querySelector(".avatar-emoji");
  const imgEl = container.querySelector(".avatar-img");
  if (!emojiEl && !imgEl) return;

  const cfg = Faces[kind];
  const spec = cfg.states[stateName] || cfg.states.idle;
  if (emojiEl) emojiEl.textContent = spec.emoji;

  // 优先状态专属图 → 其次 base 通用图 → 否则 emoji
  const candidates = [spec.img, cfg.base].filter(Boolean);
  let picked = null;
  for (const p of candidates) {
    if (FaceCache[p] === true) {
      picked = p;
      break;
    }
  }
  if (picked && imgEl) {
    imgEl.src = picked;
    imgEl.hidden = false;
    if (emojiEl) emojiEl.style.display = "none";
  } else {
    if (imgEl) imgEl.hidden = true;
    if (emojiEl) emojiEl.style.display = "flex";
  }
}

/* ---------- DOM 引用 ---------- */
const $ = (sel) => document.querySelector(sel);

const el = {
  screens: document.querySelectorAll(".screen"),
  btnNotebook: $("#btn-notebook"),
  btnMute: $("#btn-mute"),
  btnYes: $("#btn-yes"),
  btnOfCourse: $("#btn-ofcourse"),
  btnBackHome: $("#btn-back-home"),
  levelList: $("#level-list"),
  quizLevelLabel: $("#quiz-level-label"),
  quizProgress: $("#quiz-progress"),
  quizProgressFill: $("#quiz-progress-fill"),
  wordMain: $("#word-main"),
  wordPhonetic: $("#word-phonetic"),
  wordPos: $("#word-pos"),
  boyChar: document.querySelector(".char-boy"),
  boyAvatar: $("#boy-avatar"),
  bonk: $("#bonk"),
  dizzyStars: $("#dizzy-stars"),
  praise: $("#praise"),
  options: $("#options"),
  answerBanner: $("#answer-banner"),
  bannerBody: $("#banner-body"),
  btnContinue: $("#btn-continue"),
  resultTitle: $("#result-title"),
  resultScore: $("#result-score"),
  resultSub: $("#result-sub"),
  resultWrong: $("#result-wrong"),
  btnNextLevel: $("#btn-next-level"),
  btnRetry: $("#btn-retry"),
  btnLevels: $("#btn-levels"),
  notebookSummary: $("#notebook-summary"),
  notebookList: $("#notebook-list"),
  btnExport: $("#btn-export"),
  btnClear: $("#btn-clear"),
  btnNotebookBack: $("#btn-notebook-back")
};

/* ---------- 屏幕切换 ---------- */
function showScreen(id) {
  el.screens.forEach((s) => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- 真实音频（可选） ----------
 * 若 assets/audio/ 下存在同名 mp3/wav，则优先播放；
 * 否则回退到 Web Audio 实时合成。两种方式都离线可用。 */
const SOUND_PATHS = {
  ready: "assets/audio/ready.mp3",
  correct: "assets/audio/correct.mp3",
  wow: "assets/audio/wow.mp3",
  wrong: "assets/audio/wrong.mp3",
  hit: "assets/audio/hit.mp3",
  hint: "assets/audio/hint.mp3"
};

const RealAudio = (() => {
  const cache = {};

  function probe(name) {
    if (cache[name] !== undefined) return;
    const a = new Audio();
    a.preload = "auto";
    let settled = false;
    const done = (ok) => {
      if (!settled) {
        settled = true;
        cache[name] = ok;
      }
    };
    a.oncanplaythrough = () => done(true);
    a.onerror = () => done(false);
    a.src = SOUND_PATHS[name];
  }

  return {
    init() {
      Object.keys(SOUND_PATHS).forEach(probe);
    },
    play(name) {
      if (cache[name] !== true) return false;
      try {
        const a = new Audio(SOUND_PATHS[name]);
        a.volume = 0.8;
        a.play().catch(() => {});
        return true;
      } catch (e) {
        return false;
      }
    }
  };
})();

/* ---------- 音效（Web Audio 实时合成兜底，离线可用） ---------- */
const AudioFX = (() => {
  let ctx = null;

  function ac() {
    if (state.muted) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!ctx) ctx = new AC();
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    } catch (e) {
      return null;
    }
  }

  function tone(freq, delay, dur, type, vol, slideTo) {
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.18, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  function noise(delay, dur, vol) {
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.value = vol || 0.25;
    src.connect(g);
    g.connect(c.destination);
    src.start(t0);
  }

  return {
    ready() {
      if (!state.muted && RealAudio.play("ready")) return;
      tone(523.25, 0, 0.13, "sine", 0.2);
      tone(783.99, 0.12, 0.2, "sine", 0.2);
    },
    correct() {
      if (!state.muted && RealAudio.play("correct")) return;
      tone(523.25, 0, 0.13, "triangle", 0.2);
      tone(659.25, 0.09, 0.13, "triangle", 0.2);
      tone(783.99, 0.18, 0.14, "triangle", 0.2);
      tone(1046.5, 0.27, 0.3, "triangle", 0.22);
    },
    wow() {
      if (!state.muted && RealAudio.play("wow")) return;
      tone(660, 0, 0.22, "sine", 0.16, 1320);
      tone(1320, 0.16, 0.24, "sine", 0.1, 1980);
    },
    wrong() {
      if (!state.muted && RealAudio.play("wrong")) return;
      tone(220, 0, 0.18, "sawtooth", 0.12, 180);
      tone(165, 0.17, 0.24, "sawtooth", 0.11, 140);
    },
    hit() {
      if (!state.muted && RealAudio.play("hit")) return;
      tone(150, 0, 0.12, "sine", 0.5, 60);
      noise(0, 0.12, 0.35);
    },
    hint() {
      if (!state.muted && RealAudio.play("hint")) return;
      tone(880, 0, 0.28, "sine", 0.13);
      tone(1174.66, 0.08, 0.3, "sine", 0.07);
    }
  };
})();

/* ---------- 角色动作 ---------- */
function setBoy(s) {
  state.boyFace = s;
  applyFace(el.boyAvatar, "boy", s);
}

function praise(text) {
  if (!el.praise) return;
  if (state.praiseTimer) clearTimeout(state.praiseTimer);
  el.praise.textContent = text;
  el.praise.hidden = false;
  el.praise.classList.remove("show");
  void el.praise.offsetWidth;
  el.praise.classList.add("show");
  state.praiseTimer = setTimeout(() => {
    el.praise.hidden = true;
    el.praise.classList.remove("show");
  }, 1700);
}

function resetCharacters() {
  setBoy("idle");
  if (el.praise) {
    el.praise.hidden = true;
    el.praise.classList.remove("show");
  }
  el.bonk.hidden = true;
  el.bonk.classList.remove("hit");
  el.dizzyStars.hidden = true;
  el.dizzyStars.classList.remove("spin");
  el.boyChar.classList.remove("shaking", "flash");
}

/* ---------- 工具 ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function posGroup(pos) {
  if (pos.includes("v")) return "v";
  if (pos.includes("n")) return "n";
  if (pos.includes("adj")) return "adj";
  if (pos.includes("adv")) return "adv";
  return pos;
}

function hintFor(w) {
  if (w.phrases && w.phrases.length) return "小提示：记住它的搭配「" + w.phrases[0] + "」";
  if (w.derivatives && w.derivatives !== "—") return "小提示：它的派生词是 " + w.derivatives;
  if (w.examples && w.examples.length) return "小提示：多读例句「" + w.examples[0].en + "」";
  return "小提示：多读几遍，结合例句记忆～";
}

function wordSnapshot(w) {
  return {
    word: w.word,
    phonetic: w.phonetic,
    pos: w.pos,
    meaning: w.meaning,
    forms: w.forms,
    derivatives: w.derivatives,
    similar: w.similar,
    antonym: w.antonym,
    phrases: w.phrases || [],
    examples: w.examples || [],
    level: w.level
  };
}

function recordWrong(word, reason) {
  state.wrongThisLevel.push({ word: word.word, meaning: word.meaning, reason });
  const notebook = getNotebook();
  notebook.unshift({
    ...wordSnapshot(word),
    reason,
    time: new Date().toISOString()
  });
  saveNotebook(notebook);
}

/* ---------- 开始 / 选关 ---------- */
function goLevelSelect() {
  AudioFX.ready();
  renderLevelList();
  showScreen("screen-levels");
}

function renderLevelList() {
  const unlock = getUnlock();
  const stats = getStats();
  el.levelList.innerHTML = "";

  for (let n = 1; n <= LEVEL_COUNT; n++) {
    const unlocked = n <= unlock;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "level-card" + (unlocked ? "" : " locked");

    const best = stats[n] && stats[n].best;
    const badge = unlocked
      ? (best != null ? "已通关 · 最佳 " + best + "/15" : "未开始")
      : "🔒 未解锁";

    card.innerHTML =
      '<div class="level-num">第 ' + n + " 关</div>" +
      '<div class="level-name">' + ["热身出发", "小试牛刀", "渐入佳境", "终极挑战"][n - 1] + "</div>" +
      '<div class="level-desc">15 个六级词</div>' +
      '<span class="level-badge">' + badge + "</span>";

    if (unlocked) {
      card.addEventListener("click", () => startLevel(n));
    } else {
      card.title = "先通过上一关解锁";
    }
    el.levelList.appendChild(card);
  }
}

function startLevel(n) {
  state.level = n;
  state.queue = shuffle(WORDS_DATA.filter((w) => w.level === n));
  state.idx = 0;
  state.correct = 0;
  state.wrongThisLevel = [];
  state.answering = false;
  showScreen("screen-quiz");
  renderQuestion();
}

/* ---------- 答题 ---------- */
function renderQuestion() {
  const w = state.queue[state.idx];
  const total = state.queue.length;

  state.answering = false;
  resetCharacters();
  el.answerBanner.hidden = true;
  el.btnContinue.hidden = true;

  el.quizLevelLabel.textContent = "第 " + state.level + " 关";
  el.quizProgress.textContent = (state.idx + 1) + " / " + total;
  el.quizProgressFill.style.width = (state.idx / total) * 100 + "%";

  el.wordMain.textContent = w.word;
  el.wordPhonetic.textContent = w.phonetic;
  el.wordPos.textContent = w.pos;

  renderOptions(w);
}

function buildOptions(w) {
  const correct = { type: "correct", text: w.meaning, word: w.word };
  const group = posGroup(w.pos);

  const pool = WORDS_DATA.filter(
    (o) => o.word !== w.word && o.meaning !== w.meaning
  );
  const sameGroup = pool.filter((o) => posGroup(o.pos) === group);
  const source = sameGroup.length >= 2 ? sameGroup : pool;

  const distractors = [];
  const seen = new Set([w.meaning]);
  for (const o of shuffle(source)) {
    if (distractors.length >= 2) break;
    if (seen.has(o.meaning)) continue;
    seen.add(o.meaning);
    distractors.push({ type: "wrong", text: o.meaning, word: o.word });
  }

  const dunno = { type: "dunno", text: "不会诶", word: null };
  return shuffle([correct, ...distractors, dunno]);
}

function renderOptions(w) {
  const options = buildOptions(w);
  el.options.innerHTML = "";

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option" + (opt.type === "dunno" ? " dunno" : "");
    btn.textContent = opt.text;
    btn.addEventListener("click", () => onSelect(opt, btn, w));
    el.options.appendChild(btn);
  });
}

function lockOptions() {
  el.options.querySelectorAll(".option").forEach((b) => (b.disabled = true));
}

function markAnswer(selectedBtn, word) {
  el.options.querySelectorAll(".option").forEach((b) => {
    if (b.textContent === word.meaning) b.classList.add("correct");
    if (b === selectedBtn && !b.classList.contains("correct")) b.classList.add("wrong");
  });
}

function showBanner(html) {
  el.bannerBody.innerHTML = html;
  el.answerBanner.hidden = false;
  el.btnContinue.hidden = false;
}

function onSelect(opt, btn, word) {
  if (state.answering) return;
  state.answering = true;
  lockOptions();

  if (opt.type === "correct") {
    correctFlow(btn, word);
  } else if (opt.type === "dunno") {
    dunnoFlow(btn, word);
  } else {
    wrongFlow(btn, word);
  }
}

function correctFlow(btn, word) {
  state.correct++;
  AudioFX.correct();
  setTimeout(() => AudioFX.wow(), 220);

  btn.classList.add("correct");
  praise("张佳昊真棒！");

  setTimeout(nextQuestion, 1500);
}

function wrongFlow(btn, word) {
  AudioFX.wrong();
  markAnswer(btn, word);
  recordWrong(word, "答错");

  setTimeout(() => {
    el.bonk.hidden = false;
    el.bonk.classList.remove("hit");
    void el.bonk.offsetWidth;
    el.bonk.classList.add("hit");
    AudioFX.hit();
    setBoy("hit");
    el.boyChar.classList.remove("flash", "shaking");
    void el.boyChar.offsetWidth;
    el.boyChar.classList.add("flash", "shaking");
  }, 210);

  setTimeout(() => {
    setBoy("dizzy");
    el.dizzyStars.hidden = false;
    el.dizzyStars.classList.add("spin");
  }, 720);

  setTimeout(() => {
    setBoy("recover");
    el.dizzyStars.hidden = true;
    el.dizzyStars.classList.remove("spin");
  }, 2250);

  showBanner(
    '正确答案：<span class="banner-correct">' + word.meaning + "</span><br>" +
      '<span class="banner-hint">' + hintFor(word) + "</span>"
  );
}

function dunnoFlow(btn, word) {
  AudioFX.hint();
  praise("没关系，记住它～");
  markAnswer(btn, word);
  recordWrong(word, "不会");

  showBanner(
    '正确答案：<span class="banner-correct">' + word.meaning + "</span><br>" +
      '<span class="banner-hint">' + hintFor(word) + "</span>"
  );
}

function nextQuestion() {
  state.idx++;
  if (state.idx >= state.queue.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

/* ---------- 结算 ---------- */
function showResults() {
  const total = state.queue.length;
  const pct = Math.round((state.correct / total) * 100);

  if (pct >= 80) el.resultTitle.textContent = "太棒了，张佳昊！🎉";
  else if (pct >= 60) el.resultTitle.textContent = "继续加油哦！💪";
  else el.resultTitle.textContent = "再练一练～📖";

  el.resultScore.textContent = "正确率 " + pct + "%";
  el.resultSub.textContent = "本关答对 " + state.correct + " / " + total + " 词";

  if (state.wrongThisLevel.length) {
    el.resultWrong.innerHTML =
      '<div style="margin-bottom:6px;font-weight:800;">本关错词：</div>' +
      state.wrongThisLevel
        .map((w) => '<span class="wrong-word">' + w.word + " · " + w.meaning + "</span>")
        .join("");
    el.resultWrong.hidden = false;
  } else {
    el.resultWrong.hidden = true;
  }

  setLevelBest(state.level, state.correct);

  const hasNext = state.level < LEVEL_COUNT;
  el.btnNextLevel.hidden = !hasNext;
  if (hasNext) {
    setUnlock(state.level + 1);
    el.btnNextLevel.textContent = "下一关 →";
  }

  showScreen("screen-result");
}

/* ---------- 错题本 ---------- */
function openNotebook(returnScreen) {
  state.returnScreen = returnScreen;
  renderNotebook();
  showScreen("screen-notebook");
}

function renderNotebook() {
  const list = getNotebook();
  el.notebookSummary.textContent = list.length
    ? "共 " + list.length + " 条记录，点击展开查看详情"
    : "还没有记录，继续保持～";
  el.notebookList.innerHTML = "";

  if (!list.length) {
    el.notebookList.innerHTML = '<div class="empty-tip">错题本空空的，很棒呀！✌️</div>';
    return;
  }

  list.forEach((w) => {
    const item = document.createElement("div");
    item.className = "nb-item";

    const reasonCls = w.reason === "答错" ? "wrong" : "dunno";
    const head = document.createElement("button");
    head.type = "button";
    head.className = "nb-head";
    head.innerHTML =
      '<span class="nb-word">' + w.word + "</span>" +
      '<span class="nb-meaning">' + w.meaning + "</span>" +
      '<span class="nb-reason ' + reasonCls + '">' + w.reason + "</span>";

    const detail = document.createElement("div");
    detail.className = "nb-detail";
    detail.hidden = true;
    detail.innerHTML =
      '<div class="row"><span class="label">音标</span>：' + w.phonetic + "　" +
      '<span class="label">词性</span>：' + w.pos + "</div>" +
      '<div class="row"><span class="label">变形词</span>：' + w.forms + "</div>" +
      '<div class="row"><span class="label">派生词</span>：' + w.derivatives + "</div>" +
      '<div class="row"><span class="label">形近词</span>：' + w.similar + "</div>" +
      '<div class="row"><span class="label">反义词</span>：' + w.antonym + "</div>" +
      '<div class="row"><span class="label">词组</span>：<ul>' +
        (w.phrases || []).map((p) => "<li>" + p + "</li>").join("") +
      "</ul></div>" +
      '<div class="row"><span class="label">例句</span>：' +
        (w.examples || []).map((e) => '<div class="ex">· ' + e.en + "<br>　" + e.zh + "</div>").join("") +
      "</div>";

    head.addEventListener("click", () => {
      detail.hidden = !detail.hidden;
    });

    item.appendChild(head);
    item.appendChild(detail);
    el.notebookList.appendChild(item);
  });
}

function exportNotebook() {
  const list = getNotebook();
  const payload = JSON.stringify({ app: "张佳昊今天背单词了没", exportedAt: new Date().toISOString(), notebook: list }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "张佳昊错题本备份-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clearNotebook() {
  if (!confirm("确定清空整个错题本吗？清空后无法恢复。")) return;
  saveNotebook([]);
  renderNotebook();
}

/* ---------- 静音 ---------- */
function updateMuteBtn() {
  el.btnMute.textContent = state.muted ? "🔇 已静音" : "🔊 音效开";
}

function toggleMute() {
  state.muted = !state.muted;
  saveJSON(KEYS.muted, state.muted);
  updateMuteBtn();
}

/* ---------- 事件绑定 ---------- */
function bindEvents() {
  el.btnYes.addEventListener("click", goLevelSelect);
  el.btnOfCourse.addEventListener("click", goLevelSelect);
  el.btnBackHome.addEventListener("click", () => showScreen("screen-start"));
  el.btnContinue.addEventListener("click", nextQuestion);

  el.btnNextLevel.addEventListener("click", () => startLevel(state.level + 1));
  el.btnRetry.addEventListener("click", () => startLevel(state.level));
  el.btnLevels.addEventListener("click", () => {
    renderLevelList();
    showScreen("screen-levels");
  });

  el.btnNotebook.addEventListener("click", () => {
    const current = document.querySelector(".screen.active");
    openNotebook(current ? current.id : "screen-levels");
  });
  el.btnNotebookBack.addEventListener("click", () => {
    if (state.returnScreen === "screen-start") showScreen("screen-start");
    else {
      renderLevelList();
      showScreen("screen-levels");
    }
  });

  el.btnExport.addEventListener("click", exportNotebook);
  el.btnClear.addEventListener("click", clearNotebook);
  el.btnMute.addEventListener("click", toggleMute);
}

/* ---------- 启动 ---------- */
function init() {
  RealAudio.init();
  preloadFaces();
  // 开始卡片的小人
  document.querySelectorAll(".char-bubble").forEach((b) => {
    const kind = b.dataset.face;
    const st = b.dataset.state || "lie";
    const cfg = Faces[kind].states[st];
    b.innerHTML =
      '<span class="avatar-emoji">' + cfg.emoji + '</span>' +
      '<img class="avatar-img" alt="" hidden />';
    applyFace(b, kind, st);
  });
  updateMuteBtn();
  bindEvents();
  showScreen("screen-start");
}

document.addEventListener("DOMContentLoaded", init);
