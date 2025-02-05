import * as RPG from "@sigureya/rpgtypes";

export const mockAudio = Object.freeze<RPG.AudioFileParams>({
  name: "test",
  volume: 100,
  pitch: 100,
  pan: 50,
});

export const mockPlayBGM: RPG.Command_PlayBGM = {
  code: RPG.PLAY_BGM,
  parameters: [mockAudio],
  indent: 0,
};
export const mockPlayBGS: RPG.Command_PlayBGS = {
  code: RPG.PLAY_BGS,
  parameters: [mockAudio],
  indent: 0,
};

export const mockPlayME: RPG.Command_PlayME = {
  code: RPG.PLAY_ME,
  parameters: [mockAudio],
  indent: 0,
};

export const mockPlaySE: RPG.Command_PlaySE = {
  code: RPG.PLAY_SE,
  parameters: [mockAudio],
  indent: 0,
};

export const mockChangeBattleBGM: RPG.Command_ChangeBattleBGM = {
  code: RPG.CHANGE_BATTLE_BGM,
  parameters: [mockAudio],
  indent: 0,
};

export const mockChangeVictoryME: RPG.Command_ChangeVictoryME = {
  code: RPG.CHANGE_VICTORY_ME,
  parameters: [mockAudio],
  indent: 0,
};

export const mockChangeDefeatME: RPG.Command_ChangeDefeatME = {
  code: RPG.CHANGE_DEFEAT_ME,
  parameters: [mockAudio],
  indent: 0,
};

export const mockChangeVehicleBGM: RPG.Command_ChangeVehicleBGM = {
  code: RPG.CHANGE_VEHICLE_BGM,
  parameters: [mockAudio],
  indent: 0,
};

export const mockCommonEvent: RPG.Command_CommonEvent = {
  code: RPG.COMMON_EVENT,
  parameters: [1],
  indent: 0,
};

export const mockControlSwitches: RPG.Command_ControlSwitches = {
  code: RPG.CONTROL_SWITCHES,
  parameters: [1, 1, 1],
  indent: 0,
};
