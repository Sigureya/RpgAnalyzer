import { Data_CommonEvent, Data_Troop, MapEvent } from '@sigureya/rpgtypes';
import { ExtractedCommonEventText, ExtractedMapEventText, ExtractedTroopText } from './types';
export declare const correctMapEventText: (event: Pick<MapEvent, "note" | "pages" | "id">) => ExtractedMapEventText;
export declare const extractTextFromTroop: (troop: Pick<Data_Troop, "pages" | "id">) => ExtractedTroopText;
export declare const extractTextFromCommonEvent: (event: Pick<Data_CommonEvent, "list" | "id">) => ExtractedCommonEventText;
