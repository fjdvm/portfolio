import { afterEach, expect, test, vi } from "vitest";
import { playPop } from "@/lib/pop-sound";

afterEach(() => vi.unstubAllGlobals());

test("playPop is silent when the browser has no AudioContext", () => {
  expect(() => playPop(0)).not.toThrow();
});

test("playPop plays one short oscillator when audio is running", () => {
  const osc = {
    type: "",
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    connect: vi.fn((n: unknown) => n),
    start: vi.fn(),
    stop: vi.fn(),
  };
  const gain = {
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    connect: vi.fn((n: unknown) => n),
  };
  class FakeAudio {
    state = "running";
    currentTime = 0;
    destination = {};
    createOscillator = () => osc;
    createGain = () => gain;
  }
  vi.stubGlobal("AudioContext", FakeAudio);
  vi.stubGlobal("window", Object.assign(globalThis.window, { AudioContext: FakeAudio }));
  playPop(1);
  expect(osc.start).toHaveBeenCalledTimes(1);
  expect(osc.stop).toHaveBeenCalledTimes(1);
});
