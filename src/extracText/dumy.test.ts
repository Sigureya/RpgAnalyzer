import { expect, test } from "vitest";
import { item } from "./dummy";

test("ss", () => {
  expect(item.name).toBe("やくそう");
});
