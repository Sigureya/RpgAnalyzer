import { describe, expect, test } from "vitest";
import { operandIsConstants, operandIsVariable } from "./params";
import * as RpgTypes from "@sigureya/rpgtypes";

const createCommand = <Param extends RpgTypes.ControlVariables>(
  params: Param
): RpgTypes.Command_ControlVariables => ({
  code: RpgTypes.CONTROL_VARIABLES,
  parameters: params,
  indent: 0,
});

describe("is", () => {
  test("constant", () => {
    const command: RpgTypes.Command_ControlVariables =
      createCommand<RpgTypes.Operand_Constatant>([0, 0, 0, 0, 0]);

    expect(operandIsConstants(command)).toBe(true);
  });
  test("variable", () => {
    const command: RpgTypes.Command_ControlVariables =
      createCommand<RpgTypes.Operand_Variable>([0, 0, 0, 1, 0]);

    expect(operandIsVariable(command)).toBe(true);
  });
});
