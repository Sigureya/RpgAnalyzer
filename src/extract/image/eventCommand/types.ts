import type { CommandParameter } from "@sigureya/rpg-data-tools";
import type {
  Data_NamedItem,
  EventCommand,
  ImageFolders,
  MapEventContainer,
} from "@sigureya/rpgtypes";

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
