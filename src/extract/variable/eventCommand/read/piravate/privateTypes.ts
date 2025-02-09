import type RpgTypes from "@sigureya/rpgtypes";

export type CommandTypes = {
  [RpgTypes.CHANGE_ENEMY_HP]: RpgTypes.Command_ChangeEnemyHP;
  [RpgTypes.CHANGE_ENEMY_MP]: RpgTypes.Command_ChangeEnemyMP;
  [RpgTypes.TRANSFER_PLAYER]: RpgTypes.Command_TransferPlayer;
  [RpgTypes.SET_VEHICLE_LOCATION]: RpgTypes.Command_SetVehicleLocation;
  [RpgTypes.GET_LOCATION_INFO]: RpgTypes.Command_GetLocationInfo;
  [RpgTypes.BATTLE_PROCESSING]: RpgTypes.Command_BattleProcessing;
};

export type Table_IndexOfDesignation = {
  [K in keyof CommandTypes]: RpgTypes.IndexOfCommandParameter<
    CommandTypes[K],
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  >;
};

export type Table_IndexOfValiableId = {
  [K in keyof CommandTypes]: RpgTypes.IndexOfCommandParameter<
    CommandTypes[K],
    number
  >;
};
