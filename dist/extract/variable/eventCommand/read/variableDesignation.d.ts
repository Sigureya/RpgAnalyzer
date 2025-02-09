import { VariableDesignationCommands, VariableReference } from './types/';
import { EventCommand } from '@sigureya/rpgtypes';
export declare const extractVariableInfos: (commandList: ReadonlyArray<EventCommand>) => VariableReference[];
export declare const variableReference: (command: VariableDesignationCommands) => VariableReference[];
export declare const isVariableDesignationCommand: (command: EventCommand) => command is VariableDesignationCommands;
