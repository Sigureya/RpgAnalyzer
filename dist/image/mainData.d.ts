import type * as RpgTypes from "@sigureya/rpgtypes";
export interface ExtractedImageItem {
    key: string;
    image: string;
    id: number;
}
export declare const extractedImageItem: (key: string, image: string, data: {
    id: number;
}) => ExtractedImageItem;
export declare const extractImageData: <T extends {
    id: number;
    note: string;
}, KeyType extends string & keyof RpgTypes.PickByType<T, string>>(data: T, keyList: ReadonlyArray<KeyType>) => ExtractedImageItem[];
export declare const extractImageFromActor: (actor: RpgTypes.Data_Actor) => ExtractedImageItem[];
export declare const extractImageFromEnemy: (enemy: RpgTypes.Data_Enemy) => ExtractedImageItem[];
