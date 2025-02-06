import { describe, expect, test } from "vitest";
import type * as RPG from "@sigureya/rpgtypes";
import { isImageCommand } from "@sigureya/rpg-data-tools";

describe("isImageCommand", () => {
  test("showPicture", () => {
    const command: RPG.Command_ShowPicture = {
      code: 231,
      indent: 0,
      parameters: [1, "test", 0, 0, 100, 100, 100, 100, 0],
    };
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeActorImages", () => {
    const command: RPG.Command_ChangeActorImages = {
      code: 322,
      indent: 0,
      parameters: [0, "character", 0, "face", 0, "sv_battler"],
    };
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeBattleBackground", () => {
    const command: RPG.Command_ChangeBattleBackground = {
      code: 283,
      indent: 0,
      parameters: ["bg1", "bg2"],
    };
    expect(isImageCommand(command)).toBeTruthy();
  });
});
