import type { CommandParameter } from "@sigureya/rpg-data-tools";
import * as RpgTypes from "@sigureya/rpgtypes";
import type { EventCommand } from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { extractTextFromEventCommands } from "./getTextFromCommand";
const MockJoinedText = "The quick\nbrown fox\njumps over" as const;

const createMockCommand = <
  Code extends RpgTypes.PickCommandByParam<[string]>["code"]
>(
  code: Code,
  textList = ["The quick", "brown fox", "jumps over"]
) =>
  textList.map((s) => ({
    code,
    indent: 0,
    parameters: [s] as [string],
  }));

const flattenExtractedText = (s: EventCommand[]): CommandParameter<string>[] =>
  extractTextFromEventCommands(s).flat();

describe("extractTextFromEventCommands", () => {
  describe("showMessage", () => {
    test("empty", () => {
      const command: RpgTypes.Command_ShowMessage = {
        code: RpgTypes.SHOW_MESSAGE,
        parameters: ["", 0, 0, 0, ""],
        indent: 0,
      };
      const result = flattenExtractedText([command]);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.SHOW_MESSAGE, value: "", paramIndex: 4 },
      ];
      expect(result).toEqual(expected);
      expect(result.length).toEqual(1);
    });
    test("single", () => {
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
      const result = flattenExtractedText(command);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.SHOW_MESSAGE, value: "speaker", paramIndex: 4 },
        { code: RpgTypes.SHOW_MESSAGE_BODY, value: "message", paramIndex: 0 },
      ];
      expect(result).toEqual(expected);
    });
    test("multi", () => {
      const command: RpgTypes.Command_ShowMessage = {
        code: RpgTypes.SHOW_MESSAGE,
        parameters: ["", 0, 0, 0, "speaker"],
        indent: 0,
      };
      const bodies: RpgTypes.Command_ShowMessageBody[] = createMockCommand(
        RpgTypes.SHOW_MESSAGE_BODY
      );
      const result = flattenExtractedText([command, ...bodies]);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.SHOW_MESSAGE, value: "speaker", paramIndex: 4 },
        {
          code: RpgTypes.SHOW_MESSAGE_BODY,
          value: MockJoinedText,
          paramIndex: 0,
        },
      ];
      expect(result).toEqual(expected);
    });
    test("multi with empty", () => {
      const textList = ["", "The quick", "brown fox", "jumps over"];
      const bodies: RpgTypes.Command_ShowMessageBody[] = createMockCommand(
        RpgTypes.SHOW_MESSAGE_BODY,
        textList
      );
      const command: RpgTypes.Command_ShowMessage = {
        code: RpgTypes.SHOW_MESSAGE,
        parameters: ["", 0, 0, 0, "speaker"],
        indent: 0,
      };
      const result = flattenExtractedText([command, ...bodies]);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.SHOW_MESSAGE, value: "speaker", paramIndex: 4 },
        {
          code: RpgTypes.SHOW_MESSAGE_BODY,
          value: textList.join("\n"),
          paramIndex: 0,
        },
      ];
      expect(result).toEqual(expected);
    });
  });
  describe("comment", () => {
    test("empty", () => {
      const command: RpgTypes.Command_Comment = {
        code: RpgTypes.COMMENT,
        parameters: [""],
        indent: 0,
      };
      const result = flattenExtractedText([command]);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.COMMENT, value: "", paramIndex: 0 },
      ];
      expect(result).toEqual(expected);
      expect(result.length).toEqual(1);
    });
  });

  describe("Character Modifications", () => {
    test("changeName", () => {
      const command: RpgTypes.Command_ChangeName = {
        code: RpgTypes.CHANGE_NAME,
        parameters: [1, "name"],
        indent: 0,
      };
      const result = flattenExtractedText([command]);
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
      const result = flattenExtractedText([command]);
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
      const result = flattenExtractedText([command]);
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
      const result = flattenExtractedText([command]);
      expect(result).toEqual([]);
      expect(result.length).toEqual(0);
    });
    test("showChoices", () => {
      const command: RpgTypes.Command_ShowChoices = {
        code: RpgTypes.SHOW_CHOICES,
        parameters: [["choice1", "choice2"], 0, 0, 0, 2],
        indent: 0,
      };
      const result = flattenExtractedText([command]);
      const expected: CommandParameter<string>[] = [
        { code: RpgTypes.SHOW_CHOICES, value: "choice1", paramIndex: 0 },
        { code: RpgTypes.SHOW_CHOICES, value: "choice2", paramIndex: 1 },
      ];
      expect(result).toEqual(expected);
    });
  });
});
