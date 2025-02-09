import type {
  Command_ControlVariables,
  CONTROL_VARIABLES,
  ControlVariables,
  EventCommand,
  EventCommandLike,
  Operand_Constatant,
  Operand_Variable,
} from "@sigureya/rpgtypes";

export const commandParamIs = <Param extends ControlVariables>(
  command: EventCommand,
  operandCode: Param[3]
): command is EventCommandLike<typeof CONTROL_VARIABLES, Param> => {
  return (
    command.parameters[3] === operandCode &&
    command.parameters[3] === operandCode
  );
};
export const operandIsConstants = (
  command: Command_ControlVariables
): command is Command_ControlVariables<Operand_Constatant> => {
  return commandParamIs(command, 0);
};

export const operandIsVariable = (
  command: Command_ControlVariables
): command is Command_ControlVariables<Operand_Variable> => {
  return commandParamIs(command, 1);
};
