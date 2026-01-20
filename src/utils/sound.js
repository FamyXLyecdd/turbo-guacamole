
// Simple synth-based sound engine to avoid external assets dependency
const getContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  return new AudioContext();
};

let ctx = null;

const initAudio = () => {
  if (!ctx) ctx = getContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
};

const createOscillator = (freq, type, duration, volume = 0.1) => {
  const context = initAudio();
  if (!context) return;

  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, context.currentTime);

  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

  osc.connect(gain);
  gain.connect(context.destination);

  osc.start();
  osc.stop(context.currentTime + duration);
};

export const playSound = (type) => {
  try {
    switch (type) {
      case 'click':
        // High, short blip
        createOscillator(800, 'sine', 0.1, 0.05);
        break;

      case 'hover':
        // Very soft tick
        createOscillator(400, 'sine', 0.05, 0.02);
        break;

      case 'success':
        // Arpeggio
        setTimeout(() => createOscillator(440, 'sine', 0.2, 0.1), 0);
        setTimeout(() => createOscillator(554, 'sine', 0.2, 0.1), 100); // C#
        setTimeout(() => createOscillator(659, 'sine', 0.4, 0.1), 200); // E
        break;

      case 'error':
        // Low buzz
        createOscillator(150, 'sawtooth', 0.3, 0.1);
        break;

      case 'type':
        // Mechanical switch sound simulation (white noise-ish)
        // Hard to do with just osc, using simple tick
        createOscillator(2000 + Math.random() * 500, 'square', 0.03, 0.01);
        break;

      default:
        break;
    }
  } catch (e) {
    // Audio might be blocked or not supported
    console.error("Audio error", e);
  }
};
