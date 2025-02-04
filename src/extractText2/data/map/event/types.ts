import type { CommandParameter } from "@sigureya/rpg-data-tools";
import type { ExtractedTextItem } from "./mainData";

export interface ExtractedMapEventText {
  eventId: number;
  commands: CommandParameter<string>[];
  note: ExtractedTextItem[];
}

export interface ExtractedTroopText {
  troopId: number;
  commands: CommandParameter<string>[];
}
export interface ExtractedCommonEventText {
  eventId: number;
  commands: CommandParameter<string>[];
}
