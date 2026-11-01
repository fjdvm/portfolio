// A short synthesised "pop" for Event photos as each one reveals. No audio file: a
// sine that drops in pitch under a fast-decaying envelope. Browsers keep audio
// suspended until the page has had a user gesture, so before that it stays silent.
let ctx: AudioContext | null = null;

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

/** Plays one pop. `step` raises the pitch a little so a run of pops climbs. */
export function playPop(step = 0) {
  const audio = context();
  if (!audio || audio.state !== "running") {
    audio?.resume?.().catch(() => {});
    if (!audio || audio.state !== "running") return;
  }
  const now = audio.currentTime;
  const start = 520 * 2 ** (step / 12 * 2);
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(start, now);
  osc.frequency.exponentialRampToValueAtTime(start * 0.35, now + 0.09);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.14);
}
