import { AudioResourcePath } from './types';
import { AudioFileParams, ExtractCommandByParam } from '@sigureya/rpgtypes';
export declare const isAudioResource: (path: {
    folder: string;
    fileName: string;
}) => path is AudioResourcePath;
export declare const audioPathFromCommands: <T extends ExtractCommandByParam<[AudioFileParams]>>(command: T) => AudioResourcePath;
