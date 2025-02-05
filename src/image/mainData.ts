import { pickString } from "@sigureya/rpg-data-tools";
import type * as RpgTypes from "@sigureya/rpgtypes";

export interface ExtractedImageItem {
  key: string;
  image: string;
  id: number;
}

export const extractedImageItem = (
  key: string,
  image: string,
  data: { id: number }
): ExtractedImageItem => {
  return { key, image, id: data.id };
};

export const extractImageData = <
  T extends { note: string } & Record<KeyType, string>,
  KeyType extends string & keyof RpgTypes.PickByType<T, string>
>(
  data: T & { id: number },
  keyList: ReadonlyArray<KeyType>
): ExtractedImageItem[] => {
  return pickString<ExtractedImageItem, T>(data, keyList, (key, value) =>
    extractedImageItem(key, value, data)
  );
};

export const extractImageFromActor = (
  actor: RpgTypes.Data_Actor
): ExtractedImageItem[] => {
  return extractImageData(actor, ["characterName", "faceName", "battlerName"]);
};

export const extractImageFromEnemy = (
  enemy: RpgTypes.Data_Enemy
): ExtractedImageItem[] => {
  return extractImageData(enemy, ["battlerName"]);
};
