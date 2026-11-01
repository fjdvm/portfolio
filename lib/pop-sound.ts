// A synthesised balloon pop for Event photos: a sharp burst of filtered noise (the
// rubber snapping) over a short low thump (the air). No audio file. Browsers keep
// audio suspended until the page has had a user gesture, so a pop with no gesture
// behind it stays silent instead of queueing up to play later.
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

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

function noiseBuffer(audio: AudioContext) {
  if (!noise) {
    noise = audio.createBuffer(1, Math.ceil(audio.sampleRate * 0.25), audio.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

function burst(audio: AudioContext, variation: number) {
  const now = audio.currentTime;

  const crack = audio.createBufferSource();
  crack.buffer = noiseBuffer(audio);
  const band = audio.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 1800 + variation * 500;
  band.Q.value = 0.7;
  const crackGain = audio.createGain();
  crackGain.gain.setValueAtTime(0.0001, now);
  crackGain.gain.exponentialRampToValueAtTime(0.9, now + 0.002);
  crackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  crack.connect(band).connect(crackGain).connect(audio.destination);
  crack.start(now);
  crack.stop(now + 0.12);

  const thump = audio.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(220 - variation * 30, now);
  thump.frequency.exponentialRampToValueAtTime(55, now + 0.08);
  const thumpGain = audio.createGain();
  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.5, now + 0.004);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  thump.connect(thumpGain).connect(audio.destination);
  thump.start(now);
  thump.stop(now + 0.12);
}

/**
 * Plays one balloon pop. `variation` (0–1) nudges its pitch so repeats differ.
 * With `gesture` (a click) a suspended context is resumed first; without one the
 * pop only plays if the browser already allows audio.
 */
export function playPop(variation = 0, { gesture = false } = {}) {
  const audio = context();
  if (!audio) return;
  if (audio.state === "running") return burst(audio, variation);
  if (gesture) audio.resume().then(() => burst(audio, variation), () => {});
}
