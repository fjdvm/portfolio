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
beforeEach(async () => {
  vi.resetModules();
  ({ playPop } = await import("@/lib/pop-sound"));
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

test("without a gesture a suspended context stays silent and is not queued", async () => {
  const { audio, started, resume } = fakeAudio("suspended");
  Object.assign(window, { AudioContext: function () { return audio; } });
  playPop(0);
  await Promise.resolve();
  expect(resume).not.toHaveBeenCalled();
  expect(started).not.toHaveBeenCalled();
});

test("a click resumes a suspended context and then pops", async () => {
  const { audio, started, resume } = fakeAudio("suspended");
  Object.assign(window, { AudioContext: function () { return audio; } });
  playPop(0, { gesture: true });
  await Promise.resolve();
  await Promise.resolve();
  expect(resume).toHaveBeenCalledTimes(1);
  expect(started).toHaveBeenCalledTimes(2);
});
