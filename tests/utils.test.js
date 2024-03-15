import { describe, it, expect } from "vitest";
import { parseDuration } from "../src/utils";

describe("parseDuration", () => {
  it("parses HH:MM:SS correctly", () => {
    const durationStr = "02:30:45";
    const expectedSeconds = 2 * 3600 + 30 * 60 + 45;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("parses MM:SS correctly", () => {
    const durationStr = "45:30";
    const expectedSeconds = 45 * 60 + 30;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("parses SS correctly", () => {
    const durationStr = "75";
    const expectedSeconds = 75;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });

  it("handles leading zeros", () => {
    const durationStr = "02:05:09";
    const expectedSeconds = 2 * 3600 + 5 * 60 + 9;
    expect(parseDuration(durationStr)).toBe(expectedSeconds);
  });
});
