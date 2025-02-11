import type {
  Operand_Constatant,
  Operand_Variable,
  Operand_ItemData,
  Operand_LastData,
  Operand_Script,
  Operand_Random,
} from "@sigureya/rpgtypes";

interface XXX {
  code: number;
  parameters: unknown[];
}

const TABLE = {
  0: " operandConstant",
  1: " operandVariable",
  2: " operandItemData",
};

const operandConstant = (ope: Operand_Constatant) => {};

// const operandVariable;
