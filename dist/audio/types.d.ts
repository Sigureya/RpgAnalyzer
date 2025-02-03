import { AudioFileParams } from '@sigureya/rpgtypes';
import { AudioCommandInfo } from './resourcePath';
export interface MapAudioList {
    commands: AudioCommandInfo[];
    bgm: AudioFileParams;
    bgs: AudioFileParams;
}
