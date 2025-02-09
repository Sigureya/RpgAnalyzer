import * as RpgTypes from "@sigureya/rpgtypes";
import type { Table_IndexOfDesignation as Table_IndexOfDesignation } from "./privateTypes";

export const VARIABLE_DESIGNATION = 1 as const;

export const DESIGNATION_INDEX_TABLE: Table_IndexOfDesignation = {
  [RpgTypes.CHANGE_ENEMY_HP]: 2,
  [RpgTypes.CHANGE_ENEMY_MP]: 2,
  [RpgTypes.TRANSFER_PLAYER]: 0,
  [RpgTypes.SET_VEHICLE_LOCATION]: 1,
  [RpgTypes.GET_LOCATION_INFO]: 2,
  [RpgTypes.BATTLE_PROCESSING]: 0,
} as const;

export const VARIABLEID_INDEX_TABLE = {
  [RpgTypes.CHANGE_ENEMY_HP]: [4],
  [RpgTypes.CHANGE_ENEMY_MP]: [4],
  [RpgTypes.TRANSFER_PLAYER]: [1, 2, 3],
  [RpgTypes.SET_VEHICLE_LOCATION]: [2, 3, 4],
  [RpgTypes.GET_LOCATION_INFO]: [0],
  [RpgTypes.BATTLE_PROCESSING]: [1],
} as const;
