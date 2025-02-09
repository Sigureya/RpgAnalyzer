import { describe, expect, test } from "vitest";
import { range } from "./detail";
describe("range", () => {
  test("", () => {
    expect(range(1, 3)).toEqual([1, 2, 3]);
  });
  test("", () => {
    expect(range(1, 1)).toEqual([1]);
  });
});
