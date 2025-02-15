import { VariableDesignationCommand, VariableReference } from './types';
import { EventCommand } from '@sigureya/rpgtypes';
export declare const extractVariableReadingInfos: (commandList: ReadonlyArray<EventCommand>) => VariableReference[];
export declare const extractVariableReference: (command: VariableDesignationCommand) => VariableReference[];
export declare const isVariableReadCommand: (command: EventCommand) => command is VariableDesignationCommand;
