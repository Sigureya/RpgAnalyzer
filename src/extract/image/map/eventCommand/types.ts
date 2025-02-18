import type { CommandParameter } from "@sigureya/rpg-data-tools";
import type { ImageFolders } from "@sigureya/rpgtypes";

export interface ImageCommand {
  folderName: ImageFolders;
  parameter: CommandParameter<string>;
}

export interface ImageCommandInfo {
  folderName: ImageFolders;
  command: CommandParameter<string>;
  eventId: number;
  pageIndex: number;
  eventName: string;
}

export interface ExtractedImages {
  eventId: number;
  pageIndex: number;
  commands: ImageCommand[];
}
