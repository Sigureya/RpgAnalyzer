import { describe, expect, test } from "vitest";
import * as RpgTypes from "@sigureya/rpgtypes";
import { createEventCommand } from "@sigureya/rpg-data-tools";
import { extractEventCommandData } from "./mapEvent";
import type { AudioCommandInfo } from "./extract";

const createCommandList = () => {
  const callCommonnEvent: RpgTypes.Command_CommonEvent = createEventCommand(
    RpgTypes.COMMON_EVENT,
    [123]
  );
  const playBgm: RpgTypes.Command_PlayBGM = createEventCommand(
    RpgTypes.PLAY_BGM,
    [
      {
        name: "001-Battle01",
        volume: 90,
        pitch: 100,
        pan: 0,
      },
    ]
  );
  return [callCommonnEvent, playBgm];
};

describe("extractEventCommandData", () => {
  const commandList = createCommandList();
  const result = extractEventCommandData(commandList);
  test("should extract audio", () => {
    const expected: AudioCommandInfo = {
      code: RpgTypes.PLAY_BGM,
      path: {
        folder: "bgm",
        fileName: "001-Battle01",
      },
    };
    expect(result.audios).toEqual([expected]);
  });
  test("should extract calls", () => {
    expect(result.calls).toEqual({ 123: 1 });
  });
});
