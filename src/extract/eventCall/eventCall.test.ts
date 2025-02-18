import { describe, expect, test } from "vitest";
import type { CommonEventCallCount } from "./eventCall";
import { extractCommonEventCalls } from "./eventCall";
import * as RmmzMock from "@sigureya/rmmzmock";
import type { Command_CommonEvent } from "@sigureya/rpgtypes";
import { COMMON_EVENT } from "@sigureya/rpgtypes";
const createCommand = (eventId: number): Command_CommonEvent => ({
  code: COMMON_EVENT,
  parameters: [eventId],
  indent: 0,
});

describe("extractCommonEventCalls", () => {
  test("counts occurrences of common event calls correctly", () => {
    const list = [
      createCommand(235),
      createCommand(353),
      createCommand(235),
      createCommand(353),
      createCommand(259),
      createCommand(235),
    ];
    const expected: CommonEventCallCount = { 235: 3, 353: 2, 259: 1 };
    const result: CommonEventCallCount = extractCommonEventCalls(list);
    expect(result).toEqual(expected);
  });

  test("ignores non-common event commands", () => {
    const list = [
      createCommand(235),
      RmmzMock.MockChangeBattleBGM,
      createCommand(353),
      createCommand(235),
      RmmzMock.MockChangeActorImages,
      createCommand(353),
      createCommand(259),
      createCommand(235),
    ];
    const result: CommonEventCallCount = extractCommonEventCalls(list);
    expect(result).toEqual({ 235: 3, 353: 2, 259: 1 });
  });

  test("returns empty object when no common event commands are present", () => {
    const list = [
      RmmzMock.MockChangeBattleBGM,
      RmmzMock.MockChangeMenuAccess,
      RmmzMock.MockShowPicture,
    ];
    const result = extractCommonEventCalls(list);
    expect(result).toEqual({});
  });
});
