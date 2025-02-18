import { VariableRead } from './eventCommand';
export interface ExtractedVariableCommands {
    pageIndex: number;
    eventId: number;
    commands: VariableRead[];
}
