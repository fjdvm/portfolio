// A cute synthesised "bloop" for Event photos: a soft sine that swoops upward, with a
// quiet overtone for sparkle. Successive cards climb a major chord (C, E, G), so the
// three reveals sound like a little arpeggio. No audio file. Browsers keep audio
// suspended until the page has had a user gesture, so a pop with no gesture behind
// it stays silent instead of queueing up to play later.
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

/**
 * Plays one cute pop. `note` picks the pitch from a major chord, so 0, 1, 2 rise.
 * With `gesture` (a click) a suspended context is resumed first; without one the
 * pop only plays if the browser already allows audio.
 */
export function playPop(note = 0, { gesture = false } = {}) {
  const audio = context();
  if (!audio) return;
  if (audio.state === "running") return bloop(audio, note);
  if (gesture) audio.resume().then(() => bloop(audio, note), () => {});
}
