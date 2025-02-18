import { VariableDesignationCommand, VariableRead } from './types';
import { EventCommand } from '@sigureya/rpgtypes';
export declare const extractVariableReadingInfos: (commandList: ReadonlyArray<EventCommand>) => VariableRead[];
export declare const extractVariableReference: (command: VariableDesignationCommand) => VariableRead[];
export declare const isVariableReadCommand: (command: EventCommand) => command is VariableDesignationCommand;
