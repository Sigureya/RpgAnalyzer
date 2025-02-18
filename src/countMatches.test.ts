import { describe, expect, test } from "vitest";
import type { ResourcePath } from "./resourceTag/types";
import { generatePathSet, countMatches } from "./countMatches";

// モックデータ作成
const resourceList: ResourcePath[] = [
  { folderName: "images", fileName: "hero.png" },
  { folderName: "images", fileName: "enemy.png" },
  { folderName: "audio", fileName: "bgm.mp3" },
];

const testData = [
  { folder: "images", fileName: "hero.png" },
  { folder: "images", fileName: "npc.png" },
];

test("generatePathSet creates a valid Set", () => {
  const set = generatePathSet(resourceList, ":");
  expect(set.has("images:hero.png")).toBe(true);
  expect(set.has("images:enemy.png")).toBe(true);
  expect(set.has("audio:bgm.mp3")).toBe(true);
  expect(set.has("images:npc.png")).toBe(false);
});

describe("countMatches", () => {
  test("countMatches counts the correct number of matches", () => {
    const set = generatePathSet(resourceList, ":");
    expect(
      countMatches(testData, set, (item) => `${item.folder}:${item.fileName}`)
    ).toBe(1);
  });
});
