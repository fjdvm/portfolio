import { afterEach, beforeEach, expect, test, vi } from "vitest";

function fakeAudio(state: "running" | "suspended") {
  const started = vi.fn();
  const resume = vi.fn(() => {
    audio.state = "running";
    return Promise.resolve();
  });
  const node = () => ({
    connect: vi.fn((n: unknown) => n),
    start: started,
    stop: vi.fn(),
    frequency: {
      value: 0,
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    Q: { value: 0 },
  });
  const audio = {
    state,
    currentTime: 0,
    sampleRate: 8000,
    destination: {},
    resume,
    createBuffer: () => ({ getChannelData: () => new Float32Array(2000) }),
    createBufferSource: node,
    createBiquadFilter: node,
    createOscillator: node,
    createGain: node,
  };
  return { audio, started, resume };
}

let playPop: typeof import("@/lib/pop-sound").playPop;
let primeAudio: typeof import("@/lib/pop-sound").primeAudio;
beforeEach(async () => {
  vi.resetModules();
  ({ playPop, primeAudio } = await import("@/lib/pop-sound"));
});
afterEach(() => vi.unstubAllGlobals());

test("playPop is silent when the browser has no AudioContext", () => {
  expect(() => playPop(0)).not.toThrow();
});

test("a pop is a two-voice bloop when audio is running", () => {
  const { audio, started } = fakeAudio("running");
  vi.stubGlobal("AudioContext", function () { return audio; });
  Object.assign(window, { AudioContext: function () { return audio; } });
  playPop(1);
  expect(started).toHaveBeenCalledTimes(2);
});

test("a pop that cannot wake the engine stays silent and is not played later", async () => {
  const { audio, started } = fakeAudio("suspended");
  audio.resume = vi.fn(() => new Promise<void>(() => {}));
  Object.assign(window, { AudioContext: function () { return audio; } });
  playPop(0);
  await Promise.resolve();
  expect(started).not.toHaveBeenCalled();
});

test("the first pop is not lost when the engine wakes a moment after it is asked", async () => {
  const { audio, started, resume } = fakeAudio("suspended");
  Object.assign(window, { AudioContext: function () { return audio; } });
  playPop(0);
  await Promise.resolve();
  await Promise.resolve();
  expect(resume).toHaveBeenCalledTimes(1);
  expect(started).toHaveBeenCalledTimes(2);
});

test("a pop whose engine wakes too late is dropped", async () => {
  const { audio, started } = fakeAudio("suspended");
  let wake!: () => void;
  audio.resume = vi.fn(
    () => new Promise<void>((r) => (wake = () => ((audio.state = "running"), r()))),
  );
  Object.assign(window, { AudioContext: function () { return audio; } });
  const now = vi.spyOn(performance, "now").mockReturnValue(0);
  playPop(0);
  now.mockReturnValue(5000);
  wake();
  await Promise.resolve();
  await Promise.resolve();
  expect(started).not.toHaveBeenCalled();
});

test("primeAudio creates the engine and wakes it on the first gesture", () => {
  const { audio, resume } = fakeAudio("suspended");
  Object.assign(window, { AudioContext: function () { return audio; } });
  const stop = primeAudio();
  expect(resume).not.toHaveBeenCalled();
  window.dispatchEvent(new Event("pointerdown"));
  expect(resume).toHaveBeenCalledTimes(1);
  stop();
});
