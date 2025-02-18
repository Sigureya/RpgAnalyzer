import { Data_NamedItem, EventCommand } from '@sigureya/rpgtypes';
import { ImageCommandInfo } from './eventCommand/';
export declare const collectImageCommands: (page: {
    list: EventCommand[];
}, pageIndex: number, event: Data_NamedItem) => ImageCommandInfo[];
