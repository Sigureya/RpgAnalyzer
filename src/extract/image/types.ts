import type {
  Data_Map,
  Data_NamedItem,
  EventCommand,
  MapEventContainer,
  MapEventPage,
} from "@sigureya/rpgtypes";

export type ImageExtractableEventPage = Pick<MapEventPage, "image" | "list">;
export type ImageExtractableMap = Pick<
  Data_Map,
  "battleback1Name" | "battleback2Name" | "parallaxName"
> &
  MapEventContainer<
    EventCommand,
    Data_NamedItem & { pages: ImageExtractableEventPage }
  >;
