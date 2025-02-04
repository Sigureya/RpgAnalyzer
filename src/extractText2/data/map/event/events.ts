import {
  collectMapEvents,
  processEventPages,
  processMapEvents,
  readNote,
  readNoteEx,
} from "@sigureya/rpg-data-tools";
import type {
  Data_Map,
  EventCommand,
  MapEvent,
  MapEventContainer,
  PickByType,
} from "@sigureya/rpgtypes";
import type { ExtractedMapEventText } from "./types";
import { extractNoteText } from "./mainData";

const correctEventText = (
  event: Pick<MapEvent, "note" | "pages" | "id">
): ExtractedMapEventText => {
  return {
    note: extractNoteText(event),
    eventId: event.id,
    commands: [],
    //    commands: event.,
  };
  processEventPages(event, () => {});
};

const correctMapText = (
  map: MapEventContainer<EventCommand, MapEvent> & PickByType<Data_Map, string>
) => {
  return collectMapEvents(map, (page, pageIndex, event) => {
    //    event.
    return page.list.map((command) => {
      return {
        code: command.code,
        text: command.parameters[0],
        pageIndex,
        eventId: event.id,
      };
    });
  });
};
