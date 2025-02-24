import { describe, expect, test } from "vitest";
import { removeAsset, generateKey, addAsset } from "./utils";
import type { AssetRecord, AssetStore } from "./types2";
import type { ResourcePath } from "./types";

type State = "loaded" | "loading" | "error";
type AssetRecordType = AssetRecord<ResourcePath, State>;
type AssetStoreType = AssetStore<ResourcePath, State>;
const mockHero: AssetRecordType = {
  state: "loaded",
  data: { folderName: "images", fileName: "hero.png" },
};
const mockEnemy: AssetRecordType = {
  state: "loaded",
  data: { folderName: "images", fileName: "enemy.png" },
};
const mockBgm: AssetRecordType = {
  state: "loaded",
  data: { folderName: "audio", fileName: "bgm.mp3" },
};
const createStore = (): AssetStoreType => {
  return {
    "images:hero.png": mockHero,
    "images:enemy.png": mockEnemy,
    "audio:bgm.mp3": mockBgm,
  };
};

describe("", () => {
  describe("addAsset", () => {
    test("", () => {
      const result: AssetStoreType = addAsset(
        {},
        { folderName: "images", fileName: "hero.png" },
        "loaded",
        generateKey
      );
      expect(result).toEqual({
        "images:hero.png": mockHero,
      });
    });
  });
  describe("removeAsset", () => {
    const store = createStore();
    test("", () => {
      const result = removeAsset(
        store,
        { folderName: "images", fileName: "hero.png" },
        generateKey
      );
      expect(result).toEqual({
        "images:enemy.png": mockEnemy,
        "audio:bgm.mp3": mockBgm,
      });
    });

    test("", () => {
      const result = removeAsset(
        store,
        { folderName: "images", fileName: "dragon.png" },
        generateKey
      );
      expect(result).toEqual(store);
    });
  });
});
