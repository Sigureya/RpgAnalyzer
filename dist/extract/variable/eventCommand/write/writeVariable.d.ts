import { Command_VariableWrite, ExtractedVariableWrite } from './types';
import * as RpgTypes from "@sigureya/rpgtypes";
export declare const isVariableWriteCommand: (command: RpgTypes.EventCommand) => command is {
    parameters: [variableId: number, maxDigits: number];
    code: 103;
    indent: number;
} | {
    parameters: [variableId: number, itemType: number];
    code: 104;
    indent: number;
} | {
    parameters: RpgTypes.ControlVariables;
    code: 122;
    indent: number;
} | {
    parameters: [variableId: number, mode: number, designation: RpgTypes.ValueOf<RpgTypes.Designation>, x: number, y: number];
    code: 285;
    indent: number;
};
export declare const extractVariableWritsFromEventCommand: (command: Command_VariableWrite) => ExtractedVariableWrite[];
interface Command_ControlVariableLike {
    code: typeof RpgTypes.CONTROL_VARIABLES;
    parameters: {
        0: number;
        1: number;
    };
}
export declare const extractVariableWritsFromControlVariable: (command: Command_ControlVariableLike) => ExtractedVariableWrite[];
export {};
