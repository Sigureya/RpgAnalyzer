import type * as RpgTypes from "@sigureya/rpgtypes";
export interface ExtractedImageItem {
    key: string;
    image: string;
    id: number;
}
export interface ExtractedImageItem2 {
    folder: RpgTypes.ImageFolders;
    key: string;
    image: string;
    id: number;
}
export declare const extractImageFromEnemy: (enemy: Pick<RpgTypes.Data_Enemy, "id" | "battlerName">) => ExtractedImageItem;
export declare const extractedImageItem: (key: string, image: string, data: {
    id: number;
}) => ExtractedImageItem;
export declare const extractImageData: <T extends {
    note: string;
} & Record<KeyType, string>, KeyType extends string & keyof RpgTypes.PickByType<T, string>>(data: T & {
    id: number;
}, keyList: ReadonlyArray<KeyType>) => ExtractedImageItem[];
export declare const extractImageFromActor: (actor: RpgTypes.Data_Actor) => ExtractedImageItem[];
