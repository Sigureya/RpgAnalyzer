import type { AudioFileParams, System_AudioFiles } from "@sigureya/rpgtypes";
import type { ExtractedSystemAudio, SystemSoundPath } from "./types";
/**
 * オーディオファイルのリストをパス情報に変換する
 * @param sounds オーディオファイルのリスト
 * @returns システムサウンドパスリスト
 */
export const systemAudioFiles = (
  system: System_AudioFiles
): ExtractedSystemAudio => {
  return {
    sounds: extractSoundPaths(system.sounds),
    bgm: extractSoundPaths([system.battleBgm, system.titleBgm]),
    me: extractSoundPaths([
      system.defeatMe,
      system.gameoverMe,
      system.victoryMe,
    ]),
  };
};

const extractSoundPaths = (sounds: AudioFileParams[]): SystemSoundPath[] => {
  return sounds.map<SystemSoundPath>((sound, index) => ({
    index,
    path: sound.name,
  }));
};
