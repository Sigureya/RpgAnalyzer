import type { CommandParameter } from "@sigureya/rpg-data-tools";

export interface ExtractedEventText {
  eventId: number;
  pageIndex: number;
  commands: CommandParameter<string>[];
}
