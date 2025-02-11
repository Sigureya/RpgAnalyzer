import { describe, expect, test } from "vitest";
import type { Command_VariableWrite } from "./types";
import {
  isVariableWriteCommand,
  extractVariableWritsFromEventCommand,
  extractVariableWritsFromControlVariable,
} from "./writeVariable";
import type {
  BranchParam_Variable,
  Command_GetLocationInfo,
  Command_SelectItem,
  Command_ControlVariables,
  Operand_Variable,
} from "@sigureya/rpgtypes";
import {
  GET_LOCATION_INFO,
  INPUT_NUMBER,
  SELECT_ITEM,
  type Command_InputNumber,
} from "@sigureya/rpgtypes";
const xxxText = <Command extends Command_VariableWrite>(
  testName: string,
  command: Command,
  expected: number[]
) => {
  describe(`${testName} (code: ${command.code})`, () => {
    test("should identify command as a variable write", () => {
      expect(isVariableWriteCommand(command)).toBe(true);
    });
    const reuslt = extractVariableWritsFromEventCommand(command);
    test("should extract correct variable reference", () => {
      expect(reuslt).not.toEqual([]);
      expect(reuslt.map((v) => v.variableId)).toEqual(expected);
    });
  });
};

describe("Variable Write Command Tests:Valid cases", () => {
  xxxText<Command_InputNumber>(
    "Input Number",
    {
      code: INPUT_NUMBER,
      parameters: [201, 1],
      indent: 0,
    },
    [201]
  );
  xxxText<Command_SelectItem>(
    "Select Item",
    { code: SELECT_ITEM, parameters: [351, 1], indent: 0 },
    [351]
  );
  xxxText<Command_GetLocationInfo>(
    "Get Location Info",
    { code: GET_LOCATION_INFO, parameters: [183, 0, 0, 0, 0], indent: 0 },
    [183]
  );
  xxxText<Command_ControlVariables<Operand_Variable>>(
    "Control Variables",
    {
      code: 122,
      parameters: [209, 211, 0, 1, 1],
      indent: 0,
    },
    [209, 210, 211]
  );
});
