import { processMapEvents } from "@sigureya/rpg-data-tools";
import { extractImagesFromCommands } from "./eventCommand";
import type { ImageExtractableEventPage, ImageExtractableMap } from "./types";

const mapxxx = (map: ImageExtractableMap) => {};

const extractCommands = (map: ImageExtractableMap) => {
  processMapEvents(map, (page) => {
    return extractImagesFromCommands(page.list);
  });
};
const pageXXX = (page: ImageExtractableEventPage) => {};
// const eventXXX = (page:) => {};
