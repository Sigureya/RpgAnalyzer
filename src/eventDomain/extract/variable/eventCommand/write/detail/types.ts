import type RpgTypes from "@sigureya/rpgtypes";
import type { IndexOfCommandParameter } from "@sigureya/rpgtypes";
export type CommandTypes = {
  [RpgTypes.GET_LOCATION_INFO]: RpgTypes.Command_GetLocationInfo;
  [RpgTypes.INPUT_NUMBER]: RpgTypes.Command_InputNumber;
  [RpgTypes.SELECT_ITEM]: RpgTypes.Command_SelectItem;
};
export type Table_IndexOfParameter = {
  [K in keyof CommandTypes]: IndexOfCommandParameter<CommandTypes[K], number>;
};
