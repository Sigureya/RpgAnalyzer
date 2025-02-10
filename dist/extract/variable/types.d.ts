import { VariableReference } from './eventCommand';
export interface ExtractedVariableCommands {
    pageIndex: number;
    eventId: number;
    commands: VariableReference[];
}
export interface ExtractedMapEventPage {
    page: ExtractedVariableCommands;
    conditions: ExtractedPageCondition;
}
export interface ExtractedPageCondition {
    variableId: number;
    value: number;
    valid: boolean;
}
