import { ImageCommand } from './types';
import { EventCommand } from '@sigureya/rpgtypes';
export declare const extractImagesFromCommandList: (commands: ReadonlyArray<EventCommand>) => ImageCommand[][];
