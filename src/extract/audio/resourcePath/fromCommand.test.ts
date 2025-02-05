import * as RPG from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { audioPathFromCommands, isAudioCommand } from "./fromCommand";
import {
  mockChangeBattleBGM,
  mockChangeDefeatME,
  mockChangeVehicleME,
  mockChangeVictoryME,
  mockCommonEvent,
  mockControlSwitches,
  mockPlayBGM,
  mockPlayBGS,
  mockPlayME,
  mockPlaySE,
} from "./mockCommands";
describe("isAudioCommand truthy", () => {
  test("Play BGM", () => {
    expect(isAudioCommand(mockPlayBGM)).toBeTruthy();
  });
  test("Play BGS", () => {
    expect(isAudioCommand(mockPlayBGS)).toBeTruthy();
  });
  test("Play ME", () => {
    expect(isAudioCommand(mockPlayME)).toBeTruthy();
  });
  test("Play SE", () => {
    expect(isAudioCommand(mockPlaySE)).toBeTruthy();
  });
  test("Change Battle BGM", () => {
    expect(isAudioCommand(mockChangeBattleBGM)).toBeTruthy();
  });
  test("Change Victory ME", () => {
    expect(isAudioCommand(mockChangeVictoryME)).toBeTruthy();
  });
  test("Change Defeat ME", () => {
    expect(isAudioCommand(mockChangeDefeatME)).toBeTruthy();
  });
  test("Change Vehicle ME", () => {
    expect(isAudioCommand(mockChangeVehicleME)).toBeTruthy();
  });
});
describe("isAudioCommand falsy", () => {
  test("Common Event", () => {
    expect(isAudioCommand(mockCommonEvent)).toBeFalsy();
  });
  test("Control Switches", () => {
    expect(isAudioCommand(mockControlSwitches)).toBeFalsy();
  });
});

describe("audioPathFromCommands", () => {
  test("Play BGM", () => {
    expect(audioPathFromCommands(mockPlayBGM)).toEqual({
      folder: RPG.FOLDER_AUDIO_BGM,
      fileName: "test",
    });
  });
  test("Play BGS", () => {
    expect(audioPathFromCommands(mockPlayBGS)).toEqual({
      folder: RPG.FOLDER_AUDIO_BGS,
      fileName: "test",
    });
  });
  test("Play ME", () => {
    expect(audioPathFromCommands(mockPlayME)).toEqual({
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    });
  });
  test("Play SE", () => {
    expect(audioPathFromCommands(mockPlaySE)).toEqual({
      folder: RPG.FOLDER_AUDIO_SE,
      fileName: "test",
    });
  });
  test("Change Battle BGM", () => {
    expect(audioPathFromCommands(mockChangeBattleBGM)).toEqual({
      folder: RPG.FOLDER_AUDIO_BGM,
      fileName: "test",
    });
  });
  test("Change Victory ME", () => {
    expect(audioPathFromCommands(mockChangeVictoryME)).toEqual({
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    });
  });
  test("Change Defeat ME", () => {
    expect(audioPathFromCommands(mockChangeDefeatME)).toEqual({
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    });
  });
});
