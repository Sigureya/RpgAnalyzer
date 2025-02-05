import { isImageCommand } from "@sigureya/rpg-data-tools";
import type { Command_ShowPicture } from "@sigureya/rpgtypes";
import { SHOW_PICTURE, type EventCommand } from "@sigureya/rpgtypes";

const collectImageCommands = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: { id: number }
) => {
  const list = page.list.filter(isImageCommand);
};
