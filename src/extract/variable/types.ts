import type { VariableReference } from "./eventCommand";
import type { ExtractedPageCondition } from "./eventConditions";

export interface ExtractedVariableCommands {
  pageIndex: number;
  eventId: number;
  commands: VariableReference[];
}
export interface ExtractedMapEventPage {
  page: ExtractedVariableCommands;
  conditions: ExtractedPageCondition;
}
