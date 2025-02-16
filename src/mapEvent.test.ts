import { describe, expect, test } from "vitest";
import * as RpgTypes from "@sigureya/rpgtypes";
import { createEventCommand } from "@sigureya/rpg-data-tools";
import { extractEventCommandData } from "./mapEvent";

import type * as $ from "./extract/resultTypes";

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

  const showPicture: RpgTypes.Command_ShowPicture = createEventCommand(
    RpgTypes.SHOW_PICTURE,
    [1, "actor1_1", 0, 0, 100, 100, 100, 100, 255, 0]
  );
  return [callCommonnEvent, playBgm, showPicture];
};

describe("extractEventCommandData", () => {
  const commandList = createCommandList();
  const result = extractEventCommandData(commandList);
  test("should extract audio", () => {
    const expected: $.AudioCommandInfo = {
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
  test("should extract images", () => {
    const expected: $.ImageCommand = {
      command: {
        code: RpgTypes.SHOW_PICTURE,
        paramIndex: 1,
        value: "actor1_1",
      },
      folderName: "pictures",
    };
    expect(result.images).toEqual([expected]);
  });
});
