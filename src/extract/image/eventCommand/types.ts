import type { CommandParameter } from "@sigureya/rpg-data-tools";
import type { ImageFolders } from "@sigureya/rpgtypes";

export interface ImageCommand {
  folderName: ImageFolders;
  command: CommandParameter<string>;
}
