import { pickString, readNoteEx } from "@sigureya/rpg-data-tools";
import type * as RpgTypes from "@sigureya/rpgtypes";
import type { ExtractedText, TextExtractable } from "./types";

const createData = (
  key: string,
  text: string,
  data: { id: number }
): ExtractedText => {
  return { key, text: text, id: data.id };
};

export const extractNote = (data: {
  note: string;
  id: number;
}): ExtractedText[] => {
  return readNoteEx(data.note, (key, value) =>
    createData(`note.${key}`, value, data)
  );
};

export const extractTextFromActor = (
  actor: TextExtractable<RpgTypes.Data_Actor>
): ExtractedText[] => {
  return [
    ...pickString(actor, ["name", "nickname", "profile"], createData),
    ...extractNote(actor),
  ];
};

export const extractTextFromEnemy = (
  enemy: TextExtractable<RpgTypes.Data_Enemy>
): ExtractedText[] => {
  return [...pickString(enemy, ["name"], createData), ...extractNote(enemy)];
};

export const extractTextFromClass = (
  item: TextExtractable<RpgTypes.Data_Class>
): ExtractedText[] => {
  return [...pickString(item, ["name"], createData), ...extractNote(item)];
};

export const extractTextFromSkill = (
  skill: TextExtractable<RpgTypes.Data_Skill>
): ExtractedText[] => {
  return [
    ...pickString(
      skill,
      ["name", "description", "message1", "message2"],
      createData
    ),
    ...extractNote(skill),
  ];
};

export const extractTextFromItem = (
  item: TextExtractable<RpgTypes.Data_Item>
): ExtractedText[] => {
  return [
    ...pickString(item, ["name", "description"], createData),
    ...extractNote(item),
  ];
};
export const extractTextFromWeapon = (
  weapon: TextExtractable<RpgTypes.Data_Weapon>
): ExtractedText[] => {
  return [
    ...pickString(weapon, ["name", "description"], createData),
    ...extractNote(weapon),
  ];
};

export const extractTextFromArmor = (
  armor: TextExtractable<RpgTypes.Data_Armor>
): ExtractedText[] => {
  return [
    ...pickString(armor, ["name", "description"], createData),
    ...extractNote(armor),
  ];
};

export const extractTextFromState = (
  state: TextExtractable<RpgTypes.Data_State>
): ExtractedText[] => {
  return [
    ...pickString(
      state,
      ["name", "message1", "message2", "message3", "message4"],
      createData
    ),
    ...extractNote(state),
  ];
};
