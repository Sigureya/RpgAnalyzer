import * as RPG from "@sigureya/rpgtypes";
import type { AudioFileParams } from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { audioPathFromCommands, isAudioCommand } from "./fromCommand";
const mockAudio = Object.freeze<AudioFileParams>({
  name: "test",
  volume: 100,
  pitch: 100,
  pan: 50,
});

const mockPlayBGM: RPG.Command_PlayBGM = {
  code: RPG.PLAY_BGM,
  parameters: [mockAudio],
  indent: 0,
};
const mockPlayBGS: RPG.Command_PlayBGS = {
  code: RPG.PLAY_BGS,
  parameters: [mockAudio],
  indent: 0,
};

const mockPlayME: RPG.Command_PlayME = {
  code: RPG.PLAY_ME,
  parameters: [mockAudio],
  indent: 0,
};

const mockPlaySE: RPG.Command_PlaySE = {
  code: RPG.PLAY_SE,
  parameters: [mockAudio],
  indent: 0,
};

const mockChangeBattleBGM: RPG.Command_ChangeBattleBGM = {
  code: RPG.CHANGE_BATTLE_BGM,
  parameters: [mockAudio],
  indent: 0,
};

const mockChangeVictoryME: RPG.Command_ChangeVictoryME = {
  code: RPG.CHANGE_VICTORY_ME,
  parameters: [mockAudio],
  indent: 0,
};

const mockChangeDefeatME: RPG.Command_ChangeDefeatME = {
  code: RPG.CHANGE_DEFEAT_ME,
  parameters: [mockAudio],
  indent: 0,
};

const mockChangeVehicleME: RPG.Command_ChangeVehicleME = {
  code: RPG.CHANGE_VEHICLE_ME,
  parameters: [mockAudio],
  indent: 0,
};

const mockCommonEvent: RPG.Command_CommonEvent = {
  code: RPG.COMMON_EVENT,
  parameters: [1],
  indent: 0,
};

const mockControlSwitches: RPG.Command_ControlSwitches = {
  code: RPG.CONTROL_SWITCHES,
  parameters: [1, 1, 1],
  indent: 0,
};
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
