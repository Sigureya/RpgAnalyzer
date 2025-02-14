import type { MapEvent_PageCondition } from "@sigureya/rpgtypes";
import type { ExtractedPageCondition } from "./types";

export const extractPageCondition = (
  condtion: MapEvent_PageCondition
): ExtractedPageCondition => {
  return {
    variableId: condtion.variableId,
    valid: condtion.variableValid,
    value: condtion.variableValue,
  };
};
