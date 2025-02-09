import type { EventCommand, IndexOfCommandParameter } from "@sigureya/rpgtypes";
import { CHANGE_ENEMY_HP } from "@sigureya/rpgtypes";

import { range } from "./detail/detail";

import type RpgTypes from "@sigureya/rpgtypes";
export const targetsVariables = (
  command: RpgTypes.Command_ControlVariables
) => {
  const param = command.parameters;
  return range(param[0], param[1]);
};

export const getVariableIdFormControlVariable = (
  command: RpgTypes.Command_ControlVariables<RpgTypes.Operand_Variable>
): number => {
  return command.parameters[4];
};
export const isVariableDesignated = <
  Params extends unknown[],
  Index extends IndexOfCommandParameter<
    { code: number; parameters: Params },
    1 | 0
  >
>(
  command: { code: number; parameters: Params },
  index: Index
): command is typeof command & { parameters: { [K in Index]: 1 } } => {
  return command.parameters[index] === 1;
};

export const isControlVariableOperandVariable = (
  command: RpgTypes.Command_ControlVariables
): command is RpgTypes.Command_ControlVariables<RpgTypes.Operand_Variable> => {
  return command.parameters[3] === 1;
};
const xxx = (command: RpgTypes.Command_ChangeEnemyHP) => {
  return isVariableDesignated(command, 2);
};
const xxIs = (command: EventCommand) => {
  switch (command.code) {
    case CHANGE_ENEMY_HP:
      return xxx(command);

    default:
      return false;
  }
};
