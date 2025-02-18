import { collectMapEvents } from "@sigureya/rpg-data-tools";
import { collectImageCommands } from "./collectCommand";
import type {
  ImageExtractableMap,
  ExtractedMapImages,
  ImageResourcePath,
} from "./types";
import type { MapEvent_Image } from "@sigureya/rpgtypes";
import { FOLDER_IMG_CHACTERS } from "@sigureya/rpgtypes";

export const extractImageFromMap = (
  map: ImageExtractableMap
): ExtractedMapImages => {
  return {
    commands: collectMapEvents(map, collectImageCommands),
    background1: {
      folderName: "battlebacks1",
      fileName: map.battleback1Name,
    },
    background2: {
      folderName: "battlebacks2",
      fileName: map.battleback2Name,
    },
    parallax: {
      folderName: "parallaxes",
      fileName: map.parallaxName,
    },
  };
};

export const eventPageCharacterImage = (
  pageImage: MapEvent_Image
): ImageResourcePath => {
  return {
    folderName: FOLDER_IMG_CHACTERS,
    fileName: pageImage.characterName,
  };
};
