import { Command_VariableWrite, VariableWrite } from './types';
import * as RpgTypes from "@sigureya/rpgtypes";
export declare const extractVariableWriting: (list: ReadonlyArray<RpgTypes.EventCommand>) => VariableWrite[];
export declare const isVariableWriteCommand: (command: RpgTypes.EventCommand) => command is Command_VariableWrite;
export declare const extractVariableWritsFromEventCommand: (command: Command_VariableWrite) => VariableWrite[];
interface Command_ControlVariableLike {
    code: typeof RpgTypes.CONTROL_VARIABLES;
    parameters: {
        0: number;
        1: number;
    };
}
export declare const extractVariableWritsFromControlVariable: (command: Command_ControlVariableLike) => VariableWrite[];
export {};
