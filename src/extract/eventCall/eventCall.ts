import type { EventCommand } from "@sigureya/rpgtypes";
import { COMMON_EVENT } from "@sigureya/rpgtypes";

export const extractCommonEventCalls = (
  list: ReadonlyArray<EventCommand>
): Record<number, number> => {
  return list.reduce<Record<number, number>>((acc, command) => {
    if (command.code === COMMON_EVENT) {
      const id: number = command.parameters[0];
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {});
};
