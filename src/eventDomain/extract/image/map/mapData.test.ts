import { describe, expect, test } from "vitest";
import { eventPageCharacterImage } from "./mapData";
import type { MapEventPage } from "@sigureya/rpgtypes";

describe("eventPageCharacterImage", () => {
  test("normal", () => {
    const page: Pick<MapEventPage, "image"> = {
      image: {
        characterName: "Actor1_1",
        characterIndex: 0,
        direction: 2,
        pattern: 0,
        tileId: 0,
      },
    };
    const result = eventPageCharacterImage(page.image);
    expect(result).toEqual({
      folderName: "characters",
      fileName: "Actor1_1",
    });
  });
  test("no image", () => {
    const page: Pick<MapEventPage, "image"> = {
      image: {
        characterName: "",
        characterIndex: 0,
        direction: 2,
        pattern: 0,
        tileId: 0,
      },
    };
    const result = eventPageCharacterImage(page.image);
    expect(result).toEqual({
      folderName: "characters",
      fileName: "",
    });
  });
});
