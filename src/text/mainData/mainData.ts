import { pickString, readNoteEx } from "@sigureya/rpg-data-tools";
import type * as RpgTypes from "@sigureya/rpgtypes";
import type {
  ExtractedText,
  ExtractedTextItem,
  TextExtractable,
} from "./types";

const createData = (
  key: string,
  text: string,
  data: { id: number }
): ExtractedTextItem => {
  return { key, text: text, id: data.id };
};

export const extractTextData = <
  T extends { id: number; note: string },
  KeyType extends string & keyof RpgTypes.PickByType<T, string>
>(
  data: T & { id: number },
  keyList: ReadonlyArray<KeyType>
): ExtractedText => {
  return {
    main: pickString<ExtractedTextItem, T>(data, keyList, createData),
    note: extractNoteText(data),
  };
};

export const extractNoteText = (data: {
  note: string;
  id: number;
}): ExtractedTextItem[] => {
  return readNoteEx(data.note, (key, value) => createData(key, value, data));
};

export const extractTextFromActor = (
  actor: TextExtractable<RpgTypes.Data_Actor>
) => {
  return extractTextData(actor, ["name", "nickname", "profile"]);
};

export const extractTextFromEnemy = (
  enemy: TextExtractable<RpgTypes.Data_Enemy>
) => {
  return extractTextData(enemy, ["name"]);
};

export const extractTextFromClass = (
  item: TextExtractable<RpgTypes.Data_Class>
) => {
  return extractTextData(item, ["name"]);
};

export const extractTextFromSkill = (
  skill: TextExtractable<RpgTypes.Data_Skill>
) => {
  return extractTextData(skill, [
    "name",
    "description",
    "message1",
    "message2",
  ]);
};

export const extractTextFromItem = (
  item: TextExtractable<RpgTypes.Data_Item>
) => {
  return extractTextData(item, ["name", "description"]);
};
export const extractTextFromWeapon = (
  weapon: TextExtractable<RpgTypes.Data_Weapon>
) => {
  return extractTextData(weapon, ["name", "description"]);
};

export const extractTextFromArmor = (
  armor: TextExtractable<RpgTypes.Data_Armor>
) => {
  return extractTextData(armor, ["name", "description"]);
};

export const extractTextFromState = (
  state: TextExtractable<RpgTypes.Data_State>
) => {
  return extractTextData(state, [
    "name",
    "message1",
    "message2",
    "message3",
    "message4",
  ]);
};
