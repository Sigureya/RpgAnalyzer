import type { AudioFileParams, MapFileInfo } from "@sigureya/rpgtypes";
import type { AudioCommandInfo } from "./resourcePath";

export interface MapAudioList {
  commands: AudioCommandInfo[];
  bgm: AudioFileParams;
  bgs: AudioFileParams;
}

export interface AudioXXX {
  maps: MapFileInfo<MapAudioList>[];
  commons: AudioCommandInfo[];
  troops: AudioCommandInfo[];
}
