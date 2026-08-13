"use strict";

/* ==========================================================================
   Он бы тебе сказал — игровая логика
   ========================================================================== */

const CATEGORIES = [
  "что-то на кухне",
  "что-то в сумке",
  "что-то в ванной",
  "что-то на рабочем столе",
  "что-то в кармане куртки",
  "что-то в холодильнике",
  "что-то под кроватью",
  "что-то в машине",
  "что-то на полке с обувью",
  "что-то в ящике с зарядками",
];

const RECORD_SECONDS = 10;

/** @type {Record<string, HTMLElement>} */
const screens = {
  start: document.getElementById("screen-start"),
  category: document.getElementById("screen-category"),
  recording: document.getElementById("screen-recording"),
  playback: document.getElementById("screen-playback"),
};

const els = {
  roundNumber: document.getElementById("round-number"),
  categoryText: document.getElementById("category-text"),
  categoryTextRecording: document.getElementById("category-text-recording"),
  categoryTextPlayback: document.getElementById("category-text-playback"),
  micError: document.getElementById("mic-error"),

  btnStart: document.getElementById("btn-start"),
  btnRecord: document.getElementById("btn-record"),
  btnCancelRecording: document.getElementById("btn-cancel-recording"),
  btnPlay: document.getElementById("btn-play"),
  btnSend: document.getElementById("btn-send"),
  btnNext: document.getElementById("btn-next"),

  iconPlay: document.getElementById("icon-play"),
  iconPause: document.getElementById("icon-pause"),

  waveform: document.getElementById("waveform"),
  timerBar: document.getElementById("timer-bar"),
  timerText: document.getElementById("timer-text"),

  audioClip: document.getElementById("audio-clip"),
  playerProgress: document.getElementById("player-progress"),

  toast: document.getElementById("toast"),
};

let state = {
  round: 1,
  category: pickCategory(),
  mediaStream: null,
  mediaRecorder: null,
  audioContext: null,
  analyser: null,
  chunks: [],
  clipUrl: null,
  countdownStart: 0,
  animationFrameId: null,
  countdownTimeoutId: null,
};

function pickCategory(exclude) {
  const pool = exclude ? CATEGORIES.filter((c) => c !== exclude) : CATEGORIES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove("is-active"));
  screens[name].classList.add("is-active");
}

function showToast(message, duration = 2600) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast._timeoutId);
  showToast._timeoutId = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, duration);
}

/* ---------------------------------- flow ---------------------------------- */

function goToCategoryScreen(isNewRound) {
  if (isNewRound) {
    state.round += 1;
    state.category = pickCategory(state.category);
  }
  els.roundNumber.textContent = String(state.round);
  els.categoryText.textContent = state.category;
  els.micError.hidden = true;
  showScreen("category");
}

async function startRecording() {
  els.micError.hidden = true;

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error("getUserMedia failed", err);
    els.micError.hidden = false;
    els.micError.textContent =
      "Не удалось получить доступ к микрофону. Разреши доступ в настройках браузера и попробуй снова.";
    return;
  }

  state.mediaStream = stream;
  state.chunks = [];

  els.categoryTextRecording.textContent = state.category;
  showScreen("recording");

  setupWaveform(stream);
  setupRecorder(stream);
  startCountdown();
}

function setupWaveform(stream) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioCtx();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  source.connect(analyser);

  state.audioContext = audioContext;
  state.analyser = analyser;

  const canvas = els.waveform;
  const ctx = canvas.getContext("2d");
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const styles = getComputedStyle(document.documentElement);
  const pink = styles.getPropertyValue("--pink").trim() || "#e8598b";
  const yellow = styles.getPropertyValue("--yellow").trim() || "#f4b942";

  function draw() {
    state.animationFrameId = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, pink);
    gradient.addColorStop(1, yellow);

    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  draw();
}

function setupRecorder(stream) {
  const mimeType = pickSupportedMimeType();
  const options = mimeType ? { mimeType } : undefined;
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data && event.data.size > 0) {
      state.chunks.push(event.data);
    }
  });

  mediaRecorder.addEventListener("stop", onRecordingStop);

  state.mediaRecorder = mediaRecorder;
  mediaRecorder.start();
}

function pickSupportedMimeType() {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) {
    return null;
  }
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || null;
}

function startCountdown() {
  let secondsLeft = RECORD_SECONDS;
  els.timerText.textContent = String(secondsLeft);
  els.timerBar.style.transform = "scaleX(1)";

  state.countdownStart = performance.now();

  function tick() {
    const elapsed = (performance.now() - state.countdownStart) / 1000;
    const remaining = Math.max(0, RECORD_SECONDS - elapsed);
    const wholeSecondsLeft = Math.ceil(remaining);

    els.timerBar.style.transform = `scaleX(${remaining / RECORD_SECONDS})`;
    if (wholeSecondsLeft !== secondsLeft) {
      secondsLeft = wholeSecondsLeft;
      els.timerText.textContent = String(secondsLeft);
    }

    if (remaining <= 0) {
      stopRecording();
      return;
    }
    state.countdownTimeoutId = window.setTimeout(tick, 100);
  }

  state.countdownTimeoutId = window.setTimeout(tick, 100);
}

function stopRecording() {
  if (state.countdownTimeoutId) {
    window.clearTimeout(state.countdownTimeoutId);
    state.countdownTimeoutId = null;
  }
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    state.mediaRecorder.stop();
  } else {
    cleanupRecordingResources();
  }
}

function cancelRecording() {
  if (state.countdownTimeoutId) {
    window.clearTimeout(state.countdownTimeoutId);
    state.countdownTimeoutId = null;
  }
  if (state.mediaRecorder && state.mediaRecorder.state !== "inactive") {
    // Prevent the queued "stop" handler from advancing to the playback screen.
    state.mediaRecorder.removeEventListener("stop", onRecordingStop);
    state.mediaRecorder.stop();
  }
  cleanupRecordingResources();
  goToCategoryScreen(false);
}

function cleanupRecordingResources() {
  if (state.animationFrameId) {
    cancelAnimationFrame(state.animationFrameId);
    state.animationFrameId = null;
  }
  if (state.audioContext) {
    state.audioContext.close().catch(() => {});
    state.audioContext = null;
  }
  if (state.mediaStream) {
    state.mediaStream.getTracks().forEach((track) => track.stop());
    state.mediaStream = null;
  }
}

function onRecordingStop() {
  cleanupRecordingResources();

  const mimeType = state.mediaRecorder ? state.mediaRecorder.mimeType : "audio/webm";
  const blob = new Blob(state.chunks, { type: mimeType || "audio/webm" });
  state.chunks = [];

  if (state.clipUrl) {
    URL.revokeObjectURL(state.clipUrl);
  }
  state.clipUrl = URL.createObjectURL(blob);

  goToPlaybackScreen();
}

function goToPlaybackScreen() {
  els.categoryTextPlayback.textContent = state.category;
  els.audioClip.src = state.clipUrl;
  resetPlayButton();
  showScreen("playback");
}

/* ---------------------------------- playback ---------------------------------- */

function resetPlayButton() {
  els.iconPlay.hidden = false;
  els.iconPause.hidden = true;
  els.btnPlay.setAttribute("aria-label", "Воспроизвести");
  els.playerProgress.style.width = "0%";
}

function togglePlayback() {
  if (els.audioClip.paused) {
    els.audioClip.play();
  } else {
    els.audioClip.pause();
  }
}

els.audioClip.addEventListener("play", () => {
  els.iconPlay.hidden = true;
  els.iconPause.hidden = false;
  els.btnPlay.setAttribute("aria-label", "Пауза");
});

els.audioClip.addEventListener("pause", () => {
  els.iconPlay.hidden = false;
  els.iconPause.hidden = true;
  els.btnPlay.setAttribute("aria-label", "Воспроизвести");
});

els.audioClip.addEventListener("ended", () => {
  resetPlayButton();
});

els.audioClip.addEventListener("timeupdate", () => {
  const { currentTime, duration } = els.audioClip;
  if (duration && Number.isFinite(duration)) {
    els.playerProgress.style.width = `${(currentTime / duration) * 100}%`;
  }
});

/* ---------------------------------- events ---------------------------------- */

els.btnStart.addEventListener("click", () => goToCategoryScreen(false));
els.btnRecord.addEventListener("click", startRecording);
els.btnCancelRecording.addEventListener("click", cancelRecording);
els.btnPlay.addEventListener("click", togglePlayback);
els.btnNext.addEventListener("click", () => goToCategoryScreen(true));

els.btnSend.addEventListener("click", () => {
  showToast("Клип готов к отправке! 🎉");
});

/* ---------------------------------- init ---------------------------------- */

els.categoryText.textContent = state.category;
els.roundNumber.textContent = String(state.round);
