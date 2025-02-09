import type RpgTypes from "@sigureya/rpgtypes";

type VariableDesignationBase<
  T extends { code: number; indent: number; parameters: unknown[] },
  Index extends RpgTypes.IndexOfCommandParameter<T, number>
> = T & { parameters: { [K in Index]: 1 } };

export type VariableDesignation<
  T extends { code: number; indent: number; parameters: unknown[] },
  Index extends RpgTypes.IndexOfCommandParameter<T, 0 | 1>
> = T & { parameters: { [K in Index]: 1 } };

export type VariableDesignationCommands =
  | VariableDesignation_ChangeEnemyHP
  | VariableDesignation_ChangeEnemyMP
  | VariableDesignation_TransferPlayer
  | VariableDesignation_SetVehicleLocation
  | VariableDesignation_GetLocationInfo
  | VariableDesignation_BattleProcessing;

export type VariableDesignation_ChangeEnemyHP = VariableDesignation<
  RpgTypes.Command_ChangeEnemyHP,
  2
>;

export type VariableDesignation_ChangeEnemyMP = VariableDesignation<
  RpgTypes.Command_ChangeEnemyMP,
  2
>;

export type VariableDesignation_TransferPlayer = VariableDesignation<
  RpgTypes.Command_TransferPlayer,
  0
>;
export type VariableDesignation_SetVehicleLocation = VariableDesignation<
  RpgTypes.Command_SetVehicleLocation,
  1
>;

export type VariableDesignation_GetLocationInfo = VariableDesignation<
  RpgTypes.Command_GetLocationInfo,
  2
>;

export type VariableDesignation_BattleProcessing = VariableDesignationBase<
  RpgTypes.Command_BattleProcessing,
  0
>;
