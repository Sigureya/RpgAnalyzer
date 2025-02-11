import { Command_ControlVariables } from '@sigureya/rpgtypes';
import { CommandTypes } from './detail/types';
export interface ExtractedVariableWrite {
    code: number;
    variableId: number;
}
export type Command_VariableWrite = CommandTypes[keyof CommandTypes] | Command_ControlVariables;
