import { describe, expect, test } from "vitest";
import type * as RPG from "@sigureya/rpgtypes";
import { isImageCommand } from "@sigureya/rpg-data-tools";
import * as RmmmzMock from "@sigureya/rmmzmock";

describe("isImageCommand", () => {
  test("showPicture", () => {
    const command: RPG.Command_ShowPicture = RmmmzMock.MockShowPicture;
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeActorImages", () => {
    const command: RPG.Command_ChangeActorImages =
      RmmmzMock.MockChangeActorImages;
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeBattleBackground", () => {
    const command: RPG.Command_ChangeBattleBackground =
      RmmmzMock.MockChangeBattleBackground;
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeParallax", () => {
    const command: RPG.Command_ChangeParallax = RmmmzMock.MockChangeParallax;
    expect(isImageCommand(command)).toBeTruthy();
  });
  test("changeVehicleImage", () => {
    const command: RPG.Command_ChangeVehicleImage =
      RmmmzMock.MockChangeVehicleImage;
    expect(isImageCommand(command)).toBeTruthy();
  });
});
describe("isImageCommand falsy", () => {
  const list = [
    RmmmzMock.MockPlayBGM,
    RmmmzMock.MockPlayBGS,
    RmmmzMock.MockPlayME,
    RmmmzMock.MockPlaySE,
    RmmmzMock.MockChangeBattleBGM,
  ];
  test("audio", () => {
    const result = list.filter(isImageCommand);
    expect(result).toEqual([]);
  });
});
