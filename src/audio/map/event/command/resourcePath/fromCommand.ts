import type { AudioResourcePath } from "./types";
import type {
  AudioFileParams,
  ExtractCommandByParam,
} from "@sigureya/rpgtypes";
import * as RpgTypes from "@sigureya/rpgtypes";

export const isAudioResource = (path: {
  folder: string;
  fileName: string;
}): path is AudioResourcePath => {
  return (
    path.folder === RpgTypes.FOLDER_AUDIO_SE ||
    path.folder === RpgTypes.FOLDER_AUDIO_BGM ||
    path.folder === RpgTypes.FOLDER_AUDIO_BGS ||
    path.folder === RpgTypes.FOLDER_AUDIO_ME
  );
};

const CODE_LIST: ReadonlyArray<RpgTypes.EventCode> = [
  RpgTypes.PLAY_BGM,
  RpgTypes.PLAY_BGS,
  RpgTypes.PLAY_ME,
  RpgTypes.PLAY_SE,
  RpgTypes.CHANGE_BATTLE_BGM,
  RpgTypes.CHANGE_VICTORY_ME,
  RpgTypes.CHANGE_DEFEAT_ME,
  RpgTypes.CHANGE_VEHICLE_ME,
];

export const isAudioCommand = (
  command: RpgTypes.EventCommand
): command is ExtractCommandByParam<[AudioFileParams]> => {
  return CODE_LIST.includes(command.code);
};

export const audioPathFromCommands = <
  T extends ExtractCommandByParam<[AudioFileParams]>
>(
  command: T
): AudioResourcePath => {
  return {
    folder: folderName(command) || "",
    fileName: command.parameters[0].name,
  };
};
const folderName = <Command extends ExtractCommandByParam<[AudioFileParams]>>(
  command: Command
) => {
  return FOLDER_NAME_TABLE[command.code];
};

const FOLDER_NAME_TABLE = {
  [RpgTypes.PLAY_BGM]: RpgTypes.FOLDER_AUDIO_BGM,
  [RpgTypes.PLAY_BGS]: RpgTypes.FOLDER_AUDIO_BGS,
  [RpgTypes.PLAY_ME]: RpgTypes.FOLDER_AUDIO_ME,
  [RpgTypes.PLAY_SE]: RpgTypes.FOLDER_AUDIO_SE,
  [RpgTypes.CHANGE_BATTLE_BGM]: RpgTypes.FOLDER_AUDIO_BGM,
  [RpgTypes.CHANGE_VICTORY_ME]: RpgTypes.FOLDER_AUDIO_ME,
  [RpgTypes.CHANGE_DEFEAT_ME]: RpgTypes.FOLDER_AUDIO_ME,
  [RpgTypes.CHANGE_VEHICLE_ME]: RpgTypes.FOLDER_AUDIO_ME,
} as const;
