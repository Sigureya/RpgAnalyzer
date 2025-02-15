import type {
  Data_CommonEvent,
  Data_Troop,
  EventCommand,
  MapEventContainer,
  MapEventPage,
} from "@sigureya/rpgtypes";
import type { VariableReference } from "./eventCommand";
import { extractVariableReadingInfos } from "./eventCommand";
import type { ExtractedVariableCommands } from "./types";
import {
  processCommonEvents,
  processMapEvents,
  processTroopEvents,
} from "@sigureya/rpg-data-tools";
import { extractPageCondition } from "./eventConditions";

export const collectVariableReadCommand = <
  Page extends { list: EventCommand[] }
>(
  page: Page,
  pageIndex: number,
  event: { id: number }
): ExtractedVariableCommands => {
  const list: VariableReference[] = extractVariableReadingInfos(page.list);
  return {
    pageIndex,
    eventId: event.id,
    commands: list,
  };
};

type EventPageType = Pick<MapEventPage, "conditions" | "list">;

type EventType = {
  id: number;
  pages: EventPageType[];
};

export const extractVariableReadingFromMap = (
  map: MapEventContainer<EventCommand, EventType>
) => {
  return processMapEvents(map, (page, pageIndex, event) => ({
    page: collectVariableReadCommand(page, pageIndex, event),
    conditions: extractPageCondition(page.conditions),
  })).flat(2);
};

export const extractVariableReadingFromCommonEvent = (
  event: ReadonlyArray<Data_CommonEvent>
): ExtractedVariableCommands[] => {
  return processCommonEvents(event, collectVariableReadCommand);
};

export const extractVariableReadingFromTroop = (
  troops: ReadonlyArray<Data_Troop>
) => {
  return processTroopEvents(troops, collectVariableReadCommand);
};
