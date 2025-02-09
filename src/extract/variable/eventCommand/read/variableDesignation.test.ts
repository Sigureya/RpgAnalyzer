import { describe, expect, test } from "vitest";
import {
  isVariableDesignationCommand,
  variableReference,
} from "./variableDesignation";
import * as RpgTypes from "@sigureya/rpgtypes";
import * as RpgMock from "@sigureya/rmmzmock";
import type { EventCommand } from "@sigureya/rpgtypes";

import type * as VDTypes from "./types/";
import type { VariableReference } from "./types/";

type ExpectedReference = Omit<VariableReference, "index">;

const testVariableDesignationCommand = (
  testName: string,
  command: VDTypes.VariableDesignationCommands,
  expected: ExpectedReference[]
) => {
  describe(`${testName} (code: ${command.code})`, () => {
    test("should identify command as a variable designation", () => {
      expect(isVariableDesignationCommand(command)).toBe(true);
    });
    const reuslt: VariableReference[] = variableReference(command);
    test("should extract correct variable reference", () => {
      expect(reuslt).not.toEqual([]);
      expect(reuslt).toMatchObject(expected);
    });
    const variableIdList = reuslt.map((v) => typeof v.variableId);

    test("should have all variableIds as numbers", () => {
      variableIdList.forEach((id) => {
        expect(id).toBe("number");
      });
    });
  });
};

describe("Variable Designation Command Tests:Valid cases", () => {
  // variableIdに対応する3桁の数字は適当に選んでいる。ただのダミーデータ。
  describe("Change Enemy HP", () => {
    test("should return false for direct value assignment", () => {
      const direct: RpgTypes.Command_ChangeEnemyHP = {
        code: RpgTypes.CHANGE_ENEMY_HP,
        parameters: [0, 0, 0, 0, 0],
        indent: 0,
      };
      expect(isVariableDesignationCommand(direct)).toBe(false);
    });

    const variable: VDTypes.VariableDesignation_ChangeEnemyHP = {
      code: RpgTypes.CHANGE_ENEMY_HP,
      parameters: [0, 0, 1, 0, 233],
      indent: 0,
    };
    testVariableDesignationCommand("ChangeEnemyHP - variable", variable, [
      {
        eventCode: RpgTypes.CHANGE_ENEMY_HP,
        variableId: 233,
      },
    ]);
  });
  describe("Change Enemy MP", () => {
    test("should return false for direct value assignment", () => {
      const direct: RpgTypes.Command_ChangeEnemyMP = {
        code: RpgTypes.CHANGE_ENEMY_MP,
        parameters: [0, 0, 0, 0, 0],
        indent: 0,
      };
      expect(isVariableDesignationCommand(direct)).toBe(false);
    });
    const variable: VDTypes.VariableDesignation_ChangeEnemyMP = {
      code: RpgTypes.CHANGE_ENEMY_MP,
      parameters: [0, 0, 1, 0, 235],
      indent: 0,
    };
    testVariableDesignationCommand("ChangeEnemyMP - variable", variable, [
      {
        eventCode: RpgTypes.CHANGE_ENEMY_MP,
        variableId: 235,
      },
    ]);
  });
  describe("Transfer Player", () => {
    test("should return false for direct value assignment", () => {
      const direct: RpgTypes.Command_TransferPlayer = {
        code: RpgTypes.TRANSFER_PLAYER,
        parameters: [0, 0, 0, 0, 4, 0],
        indent: 0,
      };
      expect(isVariableDesignationCommand(direct)).toBe(false);
    });

    const variable: VDTypes.VariableDesignation_TransferPlayer = {
      code: RpgTypes.TRANSFER_PLAYER,
      parameters: [1, 485, 681, 653, 6, 0],
      indent: 0,
    };
    testVariableDesignationCommand("TransferPlayer - variable", variable, [
      {
        eventCode: RpgTypes.TRANSFER_PLAYER,
        variableId: 485,
      },
      {
        eventCode: RpgTypes.TRANSFER_PLAYER,
        variableId: 681,
      },
      {
        eventCode: RpgTypes.TRANSFER_PLAYER,
        variableId: 653,
      },
    ]);
  });
  describe("Set Vehicle Location", () => {
    test("should return false for direct value assignment", () => {
      const direct: RpgTypes.Command_SetVehicleLocation = {
        code: RpgTypes.SET_VEHICLE_LOCATION,
        parameters: [0, 0, 0, 0, 0],
        indent: 0,
      };
      expect(isVariableDesignationCommand(direct)).toBe(false);
    });

    const variable: VDTypes.VariableDesignation_SetVehicleLocation = {
      code: RpgTypes.SET_VEHICLE_LOCATION,
      parameters: [2, 1, 485, 681, 653],
      indent: 0,
    };
    testVariableDesignationCommand("SetVehicleLocation - variable", variable, [
      {
        eventCode: RpgTypes.SET_VEHICLE_LOCATION,
        variableId: 485,
      },
      {
        eventCode: RpgTypes.SET_VEHICLE_LOCATION,
        variableId: 681,
      },
      {
        eventCode: RpgTypes.SET_VEHICLE_LOCATION,
        variableId: 653,
      },
    ]);
  });
  describe("Get Location Info", () => {
    const variable: VDTypes.VariableDesignation_GetLocationInfo = {
      code: RpgTypes.GET_LOCATION_INFO,
      parameters: [381, 1, 1, 200, 201],
      indent: 0,
    };
    testVariableDesignationCommand("GetLocationInfo - variable", variable, [
      {
        eventCode: RpgTypes.GET_LOCATION_INFO,
        variableId: 381,
      },
    ]);
  });
  describe("Battle Processing", () => {
    const variable: VDTypes.VariableDesignation_BattleProcessing = {
      code: RpgTypes.BATTLE_PROCESSING,
      parameters: [1, 251, false, false],
      indent: 0,
    };
    testVariableDesignationCommand("BattleProcessing - variable", variable, [
      {
        eventCode: RpgTypes.BATTLE_PROCESSING,
        variableId: 251,
      },
    ]);
  });
});
describe("Variable Designation Command:Invalid cases", () => {
  const list: (EventCommand & { code: number })[] = [
    RpgMock.MockPlayBGM,
    RpgMock.MockPlayBGS,
    RpgMock.MockPlayME,
    RpgMock.MockPlaySE,
  ];

  test.each(list)(`code: $code - should return false`, (command) => {
    expect(isVariableDesignationCommand(command)).toBe(false);
    // 万が一、不正なデータが混入した際に例外を投げることができるか？
    expect(() =>
      variableReference(command as VDTypes.VariableDesignationCommands)
    ).toThrow();
  });
});
