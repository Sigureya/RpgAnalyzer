import { CommandParameter } from '@sigureya/rpg-data-tools';
import { ImageFolders } from '@sigureya/rpgtypes';
export interface ImageCommand {
    folderName: ImageFolders;
    command: CommandParameter<string>;
}
export interface ImageCommandInfo {
    folderName: ImageFolders;
    command: CommandParameter<string>;
    eventId: number;
    pageIndex: number;
    eventName: string;
}
