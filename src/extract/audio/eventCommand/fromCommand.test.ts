import * as RPG from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { audioPathFromCommands, isAudioCommand } from "./fromCommand";
import {
  mockChangeVehicleME,
  mockCommonEvent,
  mockControlSwitches,
} from "./mockCommands";
import {
  MockChangeBattleBGM,
  MockChangeDefeatME,
  MockChangeVictoryME,
  MockPlayBGM,
  MockPlayBGS,
  MockPlayME,
  MockPlaySE,
} from "@sigureya/rmmzmock";
import { createAudioCommand } from "@sigureya/rpg-data-tools";
import type { AudioResourcePath } from "./types";
describe("isAudioCommand truthy", () => {
  test("Play BGM", () => {
    expect(isAudioCommand(MockPlayBGM)).toBeTruthy();
  });
  test("Play BGS", () => {
    expect(isAudioCommand(MockPlayBGS)).toBeTruthy();
  });
  test("Play ME", () => {
    expect(isAudioCommand(MockPlayME)).toBeTruthy();
  });
  test("Play SE", () => {
    expect(isAudioCommand(MockPlaySE)).toBeTruthy();
  });
  test("Change Battle BGM", () => {
    expect(isAudioCommand(MockChangeBattleBGM)).toBeTruthy();
  });
  test("Change Victory ME", () => {
    expect(isAudioCommand(MockChangeVictoryME)).toBeTruthy();
  });
  test("Change Defeat ME", () => {
    expect(isAudioCommand(MockChangeDefeatME)).toBeTruthy();
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
    const playBGM: RPG.Command_PlayBGM = createAudioCommand(
      RPG.PLAY_BGM,
      "test"
    );
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_BGM,
      fileName: "test",
    };
    expect(audioPathFromCommands(playBGM)).toEqual(expected);
  });
  test("Play BGS", () => {
    const playBGS: RPG.Command_PlayBGS = createAudioCommand(
      RPG.PLAY_BGS,
      "test"
    );
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_BGS,
      fileName: "test",
    };
    expect(audioPathFromCommands(playBGS)).toEqual(expected);
  });
  test("Play ME", () => {
    const playME: RPG.Command_PlayME = createAudioCommand(RPG.PLAY_ME, "test");
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    };
    expect(audioPathFromCommands(playME)).toEqual(expected);
  });
  test("Play SE", () => {
    const playSE: RPG.Command_PlaySE = createAudioCommand(RPG.PLAY_SE, "test");
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_SE,
      fileName: "test",
    };
    expect(audioPathFromCommands(playSE)).toEqual(expected);
  });
  test("Change Battle BGM", () => {
    const changeBattleBGM: RPG.Command_ChangeBattleBGM = createAudioCommand(
      RPG.CHANGE_BATTLE_BGM,
      "test"
    );
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_BGM,
      fileName: "test",
    };
    expect(audioPathFromCommands(changeBattleBGM)).toEqual(expected);
  });
  test("Change Victory ME", () => {
    const changeVictoryME: RPG.Command_ChangeVictoryME = createAudioCommand(
      RPG.CHANGE_VICTORY_ME,
      "test"
    );
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    };
    expect(audioPathFromCommands(changeVictoryME)).toEqual(expected);
  });
  test("Change Defeat ME", () => {
    const changeDefeatME: RPG.Command_ChangeDefeatME = createAudioCommand(
      RPG.CHANGE_DEFEAT_ME,
      "test"
    );
    const expected: AudioResourcePath = {
      folder: RPG.FOLDER_AUDIO_ME,
      fileName: "test",
    };
    expect(audioPathFromCommands(changeDefeatME)).toEqual(expected);
  });
});
