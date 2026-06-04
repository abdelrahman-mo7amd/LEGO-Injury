let audioCtx = null;
let soundOn  = true;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, dur, type = 'sine', vol = 0.3, delay = 0) {
  if (!soundOn) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur);
  } catch (e) {}
}

function playNoise(dur, vol = 0.15, delay = 0) {
  if (!soundOn) return;
  try {
    const ctx = getCtx();
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    src.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.start(t);
    src.stop(t + dur);
  } catch (e) {}
}

function soundBrickDrop() {
  playNoise(0.08, 0.4);
  playTone(120, 0.12, 'sawtooth', 0.2, 0.05);
  playNoise(0.15, 0.15, 0.08);
  playTone(200, 0.06, 'square', 0.08, 0.12);
}

function soundOuch() {
  if (!soundOn) return;
  try {
    const ctx  = getCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(900, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(250, t + 0.4);
    gain.gain.setValueAtTime(0.0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t);
    osc.stop(t + 0.6);
  } catch (e) {}
}

function soundSuccess() {
  [523, 659, 784, 1047].forEach((f, i) => playTone(f, 0.15, 'sine', 0.2, i * 0.1));
}

function soundClick() {
  playTone(800, 0.05, 'square', 0.1);
}

function soundAlarm() {
  [880, 660, 880, 660].forEach((f, i) => playTone(f, 0.12, 'square', 0.2, i * 0.14));
}

function soundCertificate() {
  [262, 330, 392, 523, 659, 784].forEach((f, i) => playTone(f, 0.18, 'sine', 0.15, i * 0.08));
}

function toggleSound() {
  soundOn = !soundOn;
  document.getElementById('sound-toggle').textContent = soundOn ? '🔊' : '🔇';
  showToast(soundOn ? 'Sound ON 🔊' : 'Sound OFF 🔇');
  if (soundOn) soundClick();
}
