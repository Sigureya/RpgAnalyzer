import { ImageCommand } from './types';
import { EventCommand } from '@sigureya/rpgtypes';
export declare const extractImagesFromCommands: (commands: ReadonlyArray<EventCommand>) => ImageCommand[][];
