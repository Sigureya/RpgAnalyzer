import type { VariableDesignationCommands, VariableReference } from "./types/";
import type { EventCommand } from "@sigureya/rpgtypes";

import {
  DESIGNATION_INDEX_TABLE,
  VARIABLE_DESIGNATION,
  VARIABLEID_INDEX_TABLE,
} from "./piravate";

export const extractVariableInfos = (
  commandList: ReadonlyArray<EventCommand>
): VariableReference[] => {
  return commandList
    .filter(isVariableDesignationCommand)
    .flatMap(variableReference);
};

export const variableReference = (
  command: VariableDesignationCommands
): VariableReference[] => {
  const indexList = VARIABLEID_INDEX_TABLE[command.code];
  if (indexList === undefined) {
    throw new Error(`code${command.code} is not supported`);
  }
  return indexList.map<VariableReference>((index) => ({
    eventCode: command.code,
    index: index,
    variableId: command.parameters[index] as number,
  }));
};

export const isVariableDesignationCommand = (
  command: EventCommand
): command is VariableDesignationCommands => {
  const index =
    DESIGNATION_INDEX_TABLE[
      command.code as keyof typeof DESIGNATION_INDEX_TABLE
    ];
  if (index === undefined) {
    return false;
  }
  return command.parameters[index] === VARIABLE_DESIGNATION;
};
