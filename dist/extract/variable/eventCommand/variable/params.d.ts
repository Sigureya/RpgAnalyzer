import { Command_ControlVariables, CONTROL_VARIABLES, ControlVariables, EventCommand, EventCommandLike, Operand_Constatant, Operand_Variable } from '@sigureya/rpgtypes';
export declare const commandParamIs: <Param extends ControlVariables>(command: EventCommand, operandCode: Param[3]) => command is EventCommandLike<typeof CONTROL_VARIABLES, Param>;
export declare const operandIsConstants: (command: Command_ControlVariables) => command is Command_ControlVariables<Operand_Constatant>;
export declare const operandIsVariable: (command: Command_ControlVariables) => command is Command_ControlVariables<Operand_Variable>;
