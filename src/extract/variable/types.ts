import type { VariableReference } from "./eventCommand";

export interface ExtractedVariableCommands {
  pageIndex: number;
  eventId: number;
  commands: VariableReference[];
}
