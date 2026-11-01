// A cute synthesised "bloop" for Event photos: a soft sine that swoops upward, with a
// quiet overtone for sparkle. Successive cards climb a major chord (C, E, G), so the
// three reveals sound like a little arpeggio. No audio file. Browsers keep audio
// suspended until the page has had a user gesture.
let ctx: AudioContext | null = null;

const BASE_HZ = 523.25; // C5
const CHORD = [0, 4, 7, 12]; // semitones above the base

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function bloop(audio: AudioContext, note: number) {
  const now = audio.currentTime;
  const hz = BASE_HZ * 2 ** (CHORD[note % CHORD.length] / 12);

  const voice = (type: OscillatorType, ratio: number, peak: number) => {
    const osc = audio.createOscillator();
    osc.type = type;
    // Start low and swoop up to the note: the "bloop".
    osc.frequency.setValueAtTime(hz * ratio * 0.6, now);
    osc.frequency.exponentialRampToValueAtTime(hz * ratio, now + 0.07);
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  };

  voice("sine", 1, 0.28);
  voice("triangle", 2, 0.07);
}

// A pop that has to wait for the audio engine to wake only plays if it wakes quickly,
// so a pop blocked by the autoplay policy never fires later, out of context.
const WAKE_MS = 250;

/**
 * Creates the audio engine ahead of time and, until the page has had a gesture, keeps
 * trying to wake it, so the very first pop is not lost to a still-sleeping engine.
 * Call once from a client component.
 */
export function primeAudio() {
  const audio = context();
  if (!audio || audio.state === "running") return () => {};
  const wake = () => {
    audio.resume().catch(() => {});
  };
  const events = ["pointerdown", "keydown", "touchstart"] as const;
  const stop = () => events.forEach((e) => window.removeEventListener(e, wake));
  events.forEach((e) => window.addEventListener(e, wake, { once: true, passive: true }));
  return stop;
}

/** Plays one cute pop. `note` picks the pitch from a major chord, so 0, 1, 2 rise. */
export function playPop(note = 0) {
  const audio = context();
  if (!audio) return;
  if (audio.state === "running") return bloop(audio, note);
  const asked = performance.now();
  audio.resume().then(
    () => {
      if (performance.now() - asked < WAKE_MS) bloop(audio, note);
    },
    () => {},
  );
}
