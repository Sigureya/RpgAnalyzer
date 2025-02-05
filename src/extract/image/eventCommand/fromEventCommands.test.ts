import { describe, expect, test } from "vitest";
import { extractImagesFromCommands } from "./fromEventCommands";
import * as RpgTypes from "@sigureya/rpgtypes";
import type { ImageCommand } from "./types";

const expectFlat = (commands: RpgTypes.EventCommand[]) => {
  return extractImagesFromCommands(commands).flat();
};

describe("extractImagesFromCommands", () => {
  test("showPicture", () => {
    const command: RpgTypes.Command_ShowPicture = {
      code: RpgTypes.SHOW_PICTURE,
      indent: 0,
      parameters: [1, "test", 0, 0, 100, 100, 100, 100, 0],
    };
    const expected: [ImageCommand] = [
      {
        folderName: "pictures",
        command: { value: "test", code: RpgTypes.SHOW_PICTURE, paramIndex: 1 },
      },
    ];
    const result = expectFlat([command]);
    expect(result).toEqual(expected);
  });
  test("changeActorImages", () => {
    const command: RpgTypes.Command_ChangeActorImages = {
      code: RpgTypes.CHANGE_ACTOR_IMAGES,
      indent: 0,
      parameters: [0, "character", 0, "face", 0, "sv_battler"],
    };
    const result = expectFlat([command]);
    const expectedChactor: ImageCommand = {
      folderName: "characters",
      command: {
        value: "character",
        code: RpgTypes.CHANGE_ACTOR_IMAGES,
        paramIndex: 1,
      },
    };
    const expectedFace: ImageCommand = {
      folderName: "faces",
      command: {
        value: "face",
        code: RpgTypes.CHANGE_ACTOR_IMAGES,
        paramIndex: 3,
      },
    };
    const expectedSv: ImageCommand = {
      folderName: "sv_actors",
      command: {
        value: "sv_battler",
        code: RpgTypes.CHANGE_ACTOR_IMAGES,
        paramIndex: 5,
      },
    };
    expect(result).toEqual([expectedChactor, expectedFace, expectedSv]);
  });
  test("changeBattleBackground", () => {
    const command: RpgTypes.Command_ChangeBattleBackground = {
      code: RpgTypes.CHANGE_BATTLE_BACKGROUND,
      indent: 0,
      parameters: ["test1", "test2"],
    };
    const result = expectFlat([command]);
    const expected1: ImageCommand = {
      folderName: "battlebacks1",
      command: {
        value: "test1",
        code: RpgTypes.CHANGE_BATTLE_BACKGROUND,
        paramIndex: 0,
      },
    };
    const expected2: ImageCommand = {
      folderName: "battlebacks2",
      command: {
        value: "test2",
        code: RpgTypes.CHANGE_BATTLE_BACKGROUND,
        paramIndex: 1,
      },
    };
    expect(result).toEqual([expected1, expected2]);
  });
  test("changeParallax", () => {
    const command: RpgTypes.Command_ChangeParallax = {
      code: RpgTypes.CHANGE_PARALLAX,
      indent: 0,
      parameters: ["test", false, false, 100, 100],
    };
    const result = expectFlat([command]);
    const expected: ImageCommand = {
      folderName: "parallaxes",
      command: {
        value: "test",
        code: RpgTypes.CHANGE_PARALLAX,
        paramIndex: 0,
      },
    };
    expect(result).toEqual([expected]);
  });
  test("changeVehicleImage", () => {
    const command: RpgTypes.Command_ChangeVehicleImage = {
      code: RpgTypes.CHANGE_VEHICLE_IMAGE,
      indent: 0,
      parameters: [0, "test", 0],
    };
    const result = expectFlat([command]);
    const expected: ImageCommand = {
      folderName: "characters",
      command: {
        value: "test",
        code: RpgTypes.CHANGE_VEHICLE_IMAGE,
        paramIndex: 1,
      },
    };
    expect(result).toEqual([expected]);
  });
});
describe("extractImagesFromCommands other", () => {
  test("Common Event", () => {
    const command: RpgTypes.Command_CommonEvent = {
      code: RpgTypes.COMMON_EVENT,
      indent: 0,
      parameters: [0],
    };
    const result: ImageCommand[] = expectFlat([command]);
    expect(result).toEqual([]);
  });
  test("Control Switches", () => {
    const command: RpgTypes.Command_ControlSwitches = {
      code: RpgTypes.CONTROL_SWITCHES,
      indent: 0,
      parameters: [0, 0, 0],
    };
    const result: ImageCommand[] = expectFlat([command]);
    expect(result).toEqual([]);
  });
});
