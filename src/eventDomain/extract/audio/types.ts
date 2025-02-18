import type { AudioFileParams, MapFileInfo } from "@sigureya/rpgtypes";
import type { AudioCommandInfoWithLocation } from "./eventCommand";

export interface MapAudioList {
  commands: AudioCommandInfoWithLocation[];
  bgm: AudioFileParams;
  bgs: AudioFileParams;
}

export interface AudioXXX {
  maps: MapFileInfo<MapAudioList>[];
  commons: AudioCommandInfoWithLocation[];
  troops: AudioCommandInfoWithLocation[];
}
