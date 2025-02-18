import { CommandParameter, EventCommandGroup_Script, TextCommandMapper } from '@sigureya/rpg-data-tools';
import { EventCommand, Command_ShowChoices } from '@sigureya/rpgtypes';
type CommandParam = CommandParameter<string>;
export declare const extractTextFromEventCommands: (list: ReadonlyArray<EventCommand>) => CommandParam[][];
export declare const extractTextFromEventPages: (event: {
    pages: {
        list: EventCommand[];
    }[];
}) => CommandParam[][][];
export declare const extractTextMapper: TextCommandMapper<CommandParam[]>;
export declare const readScript: (script: EventCommandGroup_Script) => CommandParam[];
export declare const commandChoice: (command: Command_ShowChoices) => CommandParam[];
export {};
