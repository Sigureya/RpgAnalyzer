import type { VariableDesignationCommand, VariableRead } from "./types";
import type { EventCommand } from "@sigureya/rpgtypes";

import {
  DESIGNATION_INDEX_TABLE,
  VARIABLE_DESIGNATION,
  VARIABLEID_INDEX_TABLE,
} from "./piravate";

export const extractVariableReadingInfos = (
  commandList: ReadonlyArray<EventCommand>
): VariableRead[] => {
  return commandList
    .filter(isVariableReadCommand)
    .flatMap(extractVariableReference);
};

export const extractVariableReference = (
  command: VariableDesignationCommand
): VariableRead[] => {
  const indexList = VARIABLEID_INDEX_TABLE[command.code];
  if (indexList === undefined) {
    throw new Error(`code${command.code} is not supported`);
  }
  return indexList.map<VariableRead>((index) => ({
    eventCode: command.code,
    index: index,
    variableId: command.parameters[index] as number,
  }));
};

export const isVariableReadCommand = (
  command: EventCommand
): command is VariableDesignationCommand => {
  const index =
    DESIGNATION_INDEX_TABLE[
      command.code as keyof typeof DESIGNATION_INDEX_TABLE
    ];
  if (index === undefined) {
    return false;
  }
  return command.parameters[index] === VARIABLE_DESIGNATION;
};
