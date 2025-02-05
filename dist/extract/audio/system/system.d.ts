import { System_AudioFiles } from '@sigureya/rpgtypes';
import { ExtractedSystemAudio } from './types';
/**
 * オーディオファイルのリストをパス情報に変換する
 * @param sounds オーディオファイルのリスト
 * @returns システムサウンドパスリスト
 */
export declare const systemAudioFiles: (system: System_AudioFiles) => ExtractedSystemAudio;
