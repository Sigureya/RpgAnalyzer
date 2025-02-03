import type { AudioFileParams } from "@sigureya/rpgtypes";
import type { AudioCommandInfo } from "./resourcePath";

export interface MapAudioList {
  commands: AudioCommandInfo[];
  bgm: AudioFileParams;
  bgs: AudioFileParams;
}
