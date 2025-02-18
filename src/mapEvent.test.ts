import { describe, expect, test } from "vitest";
import * as RpgTypes from "@sigureya/rpgtypes";
import { createEventCommand } from "@sigureya/rpg-data-tools";
import { extractEventCommandData } from "./mapEvent";

import type * as $ from "./extract/resultTypes";

const createCommandList = () => {
  const callCommonnEvent123: RpgTypes.Command_CommonEvent = createEventCommand(
    RpgTypes.COMMON_EVENT,
    [123]
  );
  const callCommonnEvent235: RpgTypes.Command_CommonEvent = createEventCommand(
    RpgTypes.COMMON_EVENT,
    [235]
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

  const playSE: RpgTypes.Command_PlaySE = createEventCommand(RpgTypes.PLAY_SE, [
    {
      name: "fire",
      volume: 90,
      pitch: 100,
      pan: 0,
    },
  ]);

  const showPicture: RpgTypes.Command_ShowPicture = createEventCommand(
    RpgTypes.SHOW_PICTURE,
    [1, "picture3", 0, 0, 100, 100, 100, 100, 0]
  );
  const showMessageHedder: RpgTypes.Command_ShowMessage = createEventCommand(
    RpgTypes.SHOW_MESSAGE,
    ["face", 0, 0, 2, "speaker"]
  );

  const changeParallax: RpgTypes.Command_ChangeParallax = createEventCommand(
    RpgTypes.CHANGE_PARALLAX,
    ["parallaxImage", true, true, 0, 0]
  );
  const changeActorImaage: RpgTypes.Command_ChangeActorImages =
    createEventCommand(RpgTypes.CHANGE_ACTOR_IMAGES, [
      7,
      "actorCharacter",
      0,
      "actorFace",
      0,
      "svBattler",
    ]);

  return [
    changeActorImaage,
    callCommonnEvent123,
    callCommonnEvent235,
    callCommonnEvent235,
    playBgm,
    playSE,
    showPicture,
    showMessageHedder,
    changeParallax,
  ];
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
    expect(result.audios).toContainEqual(expected);
  });
  test("should extract calls", () => {
    expect(result.calls).toEqual({ 123: 1, 235: 2 });
  });
  describe("should extract images", () => {
    test("picture", () => {
      const expectedPicture: $.ImageCommand = {
        command: {
          code: RpgTypes.SHOW_PICTURE,
          paramIndex: 1,
          value: "picture3",
        },
        folderName: "pictures",
      };
      expect(result.images).toContainEqual(expectedPicture);
    });
    test("showMessage", () => {
      const expected: $.ImageCommand = {
        command: {
          code: RpgTypes.SHOW_MESSAGE,
          paramIndex: 0,
          value: "face",
        },
        folderName: "faces",
      };
      expect(result.images).toContainEqual(expected);
    });
    test("parallax", () => {
      const expected: $.ImageCommand = {
        command: {
          code: RpgTypes.CHANGE_PARALLAX,
          paramIndex: 0,
          value: "parallaxImage",
        },
        folderName: "parallaxes",
      };
      expect(result.images).toContainEqual(expected);
    });
    test("changeActorImages character", () => {
      const character: $.ImageCommand = {
        command: {
          code: RpgTypes.CHANGE_ACTOR_IMAGES,
          paramIndex: 1,
          value: "actorCharacter",
        },
        folderName: "characters",
      };
      expect(result.images).toContainEqual(character);
    });
    test("changeActorImages face", () => {
      const face: $.ImageCommand = {
        command: {
          code: RpgTypes.CHANGE_ACTOR_IMAGES,
          paramIndex: 3,
          value: "actorFace",
        },
        folderName: "faces",
      };
      expect(result.images).toContainEqual(face);
    });
    test("changeActorImages sv", () => {
      const sv: $.ImageCommand = {
        command: {
          code: RpgTypes.CHANGE_ACTOR_IMAGES,
          paramIndex: 5,
          value: "svBattler",
        },
        folderName: "sv_actors",
      };
      expect(result.images).toContainEqual(sv);
    });
  });
  test("should extract texts", () => {
    const expected: $.TextCommandParameter = {
      code: RpgTypes.SHOW_MESSAGE,
      value: "speaker",
      paramIndex: 4,
    };
    expect(result.texts).toContainEqual(expected);
  });
});
