import { ImageCommand } from './types';
import { EventCommand } from '@sigureya/rpgtypes';
/**
 * @deprecated
 */
export declare const extractImagesFromCommandListOld: (commands: ReadonlyArray<EventCommand>) => ImageCommand[][];
export declare const extractImagesFromCommandList: (commands: ReadonlyArray<EventCommand>) => ImageCommand[];
