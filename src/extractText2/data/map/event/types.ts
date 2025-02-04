import type { CommandParameter } from "@sigureya/rpg-data-tools";
import type { ExtractedTextItem } from "./mainData";

export interface ExtractedMapEventText {
  eventId: number;
  commands: CommandParameter<string>[];
  note: ExtractedTextItem[];
}
