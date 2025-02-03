import * as RPG from "@sigureya/rpgtypes";
import type { AudioFileParams } from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { isAudioCommand } from "./fromCommand";
const mockAudio = Object.freeze<AudioFileParams>({
  name: "test",
  volume: 100,
  pitch: 100,
  pan: 50,
});

describe("isAudioCommand truthy", () => {
  test("Play BGM", () => {
    const command: RPG.Command_PlayBGM = {
      code: RPG.PLAY_BGM,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Play BGS", () => {
    const command: RPG.Command_PlayBGS = {
      code: RPG.PLAY_BGS,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Play ME", () => {
    const command: RPG.Command_PlayME = {
      code: RPG.PLAY_ME,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Play SE", () => {
    const command: RPG.Command_PlaySE = {
      code: RPG.PLAY_SE,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Change Battle BGM", () => {
    const command: RPG.Command_ChangeBattleBGM = {
      code: RPG.CHANGE_BATTLE_BGM,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Change Victory ME", () => {
    const command: RPG.Command_ChangeVictoryME = {
      code: RPG.CHANGE_VICTORY_ME,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Change Defeat ME", () => {
    const command: RPG.Command_ChangeDefeatME = {
      code: RPG.CHANGE_DEFEAT_ME,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
  test("Change Vehicle ME", () => {
    const command: RPG.Command_ChangeVehicleME = {
      code: RPG.CHANGE_VEHICLE_ME,
      parameters: [mockAudio],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeTruthy();
  });
});
describe("isAudioCommand falsy", () => {
  test("common event", () => {
    const command: RPG.Command_CommonEvent = {
      code: RPG.COMMON_EVENT,
      parameters: [1],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeFalsy();
  });
  test("control switch", () => {
    const command: RPG.Command_ControlSwitches = {
      code: RPG.CONTROL_SWITCHES,
      parameters: [1, 1, 1],
      indent: 0,
    };
    expect(isAudioCommand(command)).toBeFalsy();
  });
});
