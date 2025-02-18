import { AudioResourcePath } from './types';
import { AudioFileParams, ExtractCommandByParam } from '@sigureya/rpgtypes';
export declare const isAudioResource: (path: {
    folder: string;
    fileName: string;
}) => path is AudioResourcePath;
export declare const audioCommandInfo: (command: ExtractCommandByParam<[AudioFileParams]>) => {
    code: 132 | 140 | 133 | 139 | 241 | 245 | 250 | 249;
    path: AudioResourcePath;
};
export declare const audioPathFromCommands: <T extends ExtractCommandByParam<[AudioFileParams]>>(command: T) => AudioResourcePath;
