import { ImageExtractableMap, ExtractedMapImages, ImageResourcePath } from './types';
import { MapEvent_Image } from '@sigureya/rpgtypes';
export declare const extractImageFromMap: (map: ImageExtractableMap) => ExtractedMapImages;
export declare const eventPageCharacterImage: (pageImage: MapEvent_Image) => ImageResourcePath;
