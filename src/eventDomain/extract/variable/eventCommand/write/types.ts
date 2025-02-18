import type * as RpgTypes from "@sigureya/rpgtypes";
import type { CommandTypes } from "./detail/types";

export interface VariableWrite {
  eventCode: number;
  variableId: number;
}
export type Command_VariableWrite =
  | CommandTypes[keyof CommandTypes]
  | RpgTypes.Command_ControlVariables;
