import { isImageCommand } from "@sigureya/rpg-data-tools";
import type { Data_NamedItem, EventCommand } from "@sigureya/rpgtypes";
import type { ImageCommand, ImageCommandInfo } from "./eventCommand/";
import { extractImagesFromCommandListOld } from "./eventCommand/";

export const collectImageCommands = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: Data_NamedItem
): ImageCommandInfo[] => {
  const list: ImageCommand[][] = extractImagesFromCommandListOld(
    page.list.filter(isImageCommand)
  );
  return list.flatMap((xx) => mapImageCommands(xx, pageIndex, event));
};

const imageCommandInfo = (
  command: ImageCommand,
  event: Data_NamedItem,
  pageIndex: number
): ImageCommandInfo => ({
  folderName: command.folderName,
  command: command.parameter,
  eventId: event.id,
  pageIndex: pageIndex,
  eventName: event.name,
});

const mapImageCommands = (
  list: ImageCommand[],
  pageIndex: number,
  event: Data_NamedItem
) => {
  return list.map((command) => imageCommandInfo(command, event, pageIndex));
};
