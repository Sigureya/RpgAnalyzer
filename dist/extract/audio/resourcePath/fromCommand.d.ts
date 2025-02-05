import { AudioResourcePath } from './types';
import { AudioFileParams, ExtractCommandByParam } from '@sigureya/rpgtypes';
import * as RpgTypes from "@sigureya/rpgtypes";
export declare const isAudioResource: (path: {
    folder: string;
    fileName: string;
}) => path is AudioResourcePath;
export declare const isAudioCommand: (command: RpgTypes.EventCommand) => command is ExtractCommandByParam<[AudioFileParams]>;
export declare const audioPathFromCommands: <T extends ExtractCommandByParam<[AudioFileParams]>>(command: T) => AudioResourcePath;
