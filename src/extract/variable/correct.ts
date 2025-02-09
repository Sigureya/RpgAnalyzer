import type { EventCommand } from "@sigureya/rpgtypes";

export const collectVariableReadCommand = (
  page: { list: EventCommand[] },
  pageIndex: number,
  event: { id: number }
) => {};
