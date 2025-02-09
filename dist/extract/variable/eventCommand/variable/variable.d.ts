import { IndexOfCommandParameter, default as RpgTypes } from '@sigureya/rpgtypes';
export declare const targetsVariables: (command: RpgTypes.Command_ControlVariables) => number[];
export declare const getVariableIdFormControlVariable: (command: RpgTypes.Command_ControlVariables<RpgTypes.Operand_Variable>) => number;
export declare const isVariableDesignated: <Params extends unknown[], Index extends IndexOfCommandParameter<{
    code: number;
    parameters: Params;
}, 1 | 0>>(command: {
    code: number;
    parameters: Params;
}, index: Index) => command is typeof command & {
    parameters: { [K in Index]: 1; };
};
export declare const isControlVariableOperandVariable: (command: RpgTypes.Command_ControlVariables) => command is RpgTypes.Command_ControlVariables<RpgTypes.Operand_Variable>;
