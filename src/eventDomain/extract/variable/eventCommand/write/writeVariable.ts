import * as RpgTypes from "@sigureya/rpgtypes";
import type { Command_VariableWrite, VariableWrite } from "./types";

export const extractVariableWriting = (
  list: ReadonlyArray<RpgTypes.EventCommand>
): VariableWrite[] => {
  return list.flatMap((command) => {
    if (isVariableWriteCommand(command)) {
      return extractVariableWritsFromEventCommand(command);
    }
    return [];
  });
};

export const isVariableWriteCommand = (
  command: RpgTypes.EventCommand
): command is Command_VariableWrite => {
  return (
    command.code === RpgTypes.INPUT_NUMBER ||
    command.code === RpgTypes.SELECT_ITEM ||
    command.code === RpgTypes.GET_LOCATION_INFO ||
    command.code === RpgTypes.CONTROL_VARIABLES
  );
};

export const extractVariableWritsFromEventCommand = (
  command: Command_VariableWrite
): VariableWrite[] => {
  if (command.code === RpgTypes.CONTROL_VARIABLES) {
    return extractVariableWritsFromControlVariable(command);
  }

  return [
    {
      variableId: command.parameters[0],
      eventCode: command.code,
    },
  ];
};

interface Command_ControlVariableLike {
  code: typeof RpgTypes.CONTROL_VARIABLES;
  parameters: {
    0: number;
    1: number;
  };
}

export const extractVariableWritsFromControlVariable = (
  command: Command_ControlVariableLike
): VariableWrite[] => {
  const start = command.parameters[0];
  const end = command.parameters[1];
  return Array.from<unknown, VariableWrite>(
    { length: end - start + 1 },
    (_, i) => ({
      variableId: i + start,
      eventCode: RpgTypes.CONTROL_VARIABLES,
    })
  );
};
