import type { Command_ControlVariables } from "@sigureya/rpgtypes";
import type { CommandTypes } from "./detail/types";

export interface VariableWrite {
  code: number;
  variableId: number;
}
export type Command_VariableWrite =
  | CommandTypes[keyof CommandTypes]
  | Command_ControlVariables;
