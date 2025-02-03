import type { CommandParameter } from "@sigureya/rpg-data-tools";
import * as RpgTypes from "@sigureya/rpgtypes";
import {
  SHOW_MESSAGE,
  SHOW_MESSAGE_BODY,
  type EventCommand,
} from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { extractTextFromEventCommands } from "./getTextFromCommand";
// const showMessage

const extract2 = (s: EventCommand[]): CommandParameter<string>[] =>
  extractTextFromEventCommands(s).flat();

describe("-", () => {
  test("changeName", () => {
    const command: RpgTypes.Command_ChangeName = {
      code: RpgTypes.CHANGE_NAME,
      parameters: [1, "name"],
      indent: 0,
    };
    const result = extract2([command]);
    const expected: CommandParameter<string>[] = [
      { code: RpgTypes.CHANGE_NAME, value: "name", paramIndex: 1 },
    ];
    expect(result).toEqual(expected);
  });
  test("changeNickname", () => {
    const command: RpgTypes.Command_ChangeNickName = {
      code: RpgTypes.CHANGE_NICKNAME,
      parameters: [1, "name"],
      indent: 0,
    };
    const result = extract2([command]);
    const expected: CommandParameter<string>[] = [
      { code: RpgTypes.CHANGE_NICKNAME, value: "name", paramIndex: 1 },
    ];
    expect(result).toEqual(expected);
  });
  test("changeProfile", () => {
    const command: RpgTypes.Command_ChangeProfile = {
      code: RpgTypes.CHANGE_PROFILE,
      parameters: [1, "name"],
      indent: 0,
    };
    const result = extract2([command]);
    const expected: CommandParameter<string>[] = [
      { code: RpgTypes.CHANGE_PROFILE, value: "name", paramIndex: 1 },
    ];
    expect(result).toEqual(expected);
  });
});

describe("showChoices", () => {
  test("empty", () => {
    const command: RpgTypes.Command_ShowChoices = {
      code: RpgTypes.SHOW_CHOICES,
      parameters: [[], 0, 0, 0, 2],
      indent: 0,
    };
    const result = extract2([command]);
    expect(result).toEqual([]);
  });
  test("showChoices", () => {
    const command: RpgTypes.Command_ShowChoices = {
      code: RpgTypes.SHOW_CHOICES,
      parameters: [["choice1", "choice2"], 0, 0, 0, 2],
      indent: 0,
    };
    const result = extract2([command]);
    const expected: CommandParameter<string>[] = [
      { code: RpgTypes.SHOW_CHOICES, value: "choice1", paramIndex: 0 },
      { code: RpgTypes.SHOW_CHOICES, value: "choice2", paramIndex: 0 },
    ];
    expect(result).toEqual(expected);
  });
});

describe("xxx", () => {
  test("showMessage", () => {
    const command: [
      RpgTypes.Command_ShowMessage,
      RpgTypes.Command_ShowMessageBody
    ] = [
      {
        code: RpgTypes.SHOW_MESSAGE,
        parameters: ["", 0, 0, 0, "speaker"],
        indent: 0,
      },
      {
        code: RpgTypes.SHOW_MESSAGE_BODY,
        parameters: ["message"],
        indent: 0,
      },
    ];
    const result = extract2(command);
    const expected: CommandParameter<string>[] = [
      { code: SHOW_MESSAGE, value: "speaker", paramIndex: 4 },
      { code: SHOW_MESSAGE_BODY, value: "message", paramIndex: 0 },
    ];
    expect(result).toEqual(expected);
  });
});
