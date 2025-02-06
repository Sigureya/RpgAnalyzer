import * as RPG from "@sigureya/rpgtypes";

export const mockAudio = Object.freeze<RPG.AudioFileParams>({
  name: "test",
  volume: 100,
  pitch: 100,
  pan: 50,
});

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
