import { describe, expect, test } from "vitest";
import {
  countCommonEventCall,
  countMatchesAudio,
  countMatchesImage,
  countMatchesVariable,
  countMatchesVariableWrite,
} from "./countAssets";
import type {
  ImageCommand,
  AudioCommandInfo,
  VariableRead,
  CommonEventCallCount,
  VariableWrite,
  ImageResourcePath,
} from "./extract";
import { generatePathSet } from "./countMatches";
import type { ImageFolders } from "@sigureya/rpgtypes";

const imageCommand = (
  folderName: ImageFolders,
  filename: string
): ImageCommand => ({
  folderName,
  parameter: { value: filename, code: 0, paramIndex: 0 },
});

describe("countAssets", () => {
  describe("countMatchesImage", () => {
    test("returns 0 when list is empty", () => {
      const set = generatePathSet([
        { folderName: "sv_actors", fileName: "hero" },
      ]);
      expect(countMatchesImage([], set)).toBe(0);
    });
    test("returns 0 when set is empty", () => {
      const list = [imageCommand("sv_actors", "hero")];
      expect(countMatchesImage(list, new Set())).toBe(0);
    });
    test("counts multiple matches correctly", () => {
      const paths: ImageResourcePath[] = [
        { folderName: "sv_actors", fileName: "hero" },
      ];
      const list: ImageCommand[] = [
        imageCommand("sv_actors", "hero"),
        imageCommand("sv_actors", "hero"),
        imageCommand("sv_actors", "dummy"),
      ];
      expect(countMatchesImage(list, generatePathSet(paths))).toBe(2);
    });
    test("", () => {
      const paths: ImageResourcePath = {
        folderName: "faces",
        fileName: "hero",
      };
      const command: ImageCommand = imageCommand("characters", "hero");
      expect(countMatchesImage([command], generatePathSet([paths]))).toBe(0);
    });
  });

  describe("countMatchesAudio", () => {
    test("returns 0 when list is empty", () => {
      expect(countMatchesAudio([], new Set(["bgm:main"]))).toBe(0);
    });
    test("returns 0 when set is empty", () => {
      const list: Pick<AudioCommandInfo, "path">[] = [
        { path: { folder: "bgm", fileName: "main" } },
      ];
      expect(countMatchesAudio(list, new Set())).toBe(0);
    });
  });

  describe("countMatchesVariable", () => {
    const variables = new Set([1]);
    test("returns 0 when list is empty", () => {
      expect(countMatchesVariable([], variables)).toBe(0);
    });
    test("returns 0 when set is empty", () => {
      const list: VariableRead[] = [{ variableId: 1, eventCode: 0, index: 0 }];
      expect(countMatchesVariable(list, new Set())).toBe(0);
    });
  });

  describe("countCommonEventCall", () => {
    const eventCallCount: CommonEventCallCount = {
      123: 1,
      456: 2,
    };
    test("counts the correct number of matches", () => {
      expect(countCommonEventCall(eventCallCount, [123, 456])).toBe(3);
    });
    test("returns 0 when targetEventIds is empty", () => {
      expect(countCommonEventCall(eventCallCount, [])).toBe(0);
    });
    test("ignores event IDs not present in eventCallCount", () => {
      expect(countCommonEventCall(eventCallCount, [999])).toBe(0);
    });
  });
});
