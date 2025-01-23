import { pickString, readNoteObject } from "@sigureya/rpg-data-tools";
import type {
  Data_Actor,
  Data_Enemy,
  Data_Item,
  Data_Skill,
} from "@sigureya/rpgtypes";
export interface TextWithReferences {
  key: string;
  text: string;
  id: number;
}

export const extractTextFromActor = (
  actor: Data_Actor
): TextWithReferences[] => {
  return [
    ...pickString(actor, ["name", "nickname"], createTextReference),
    ...extractNotes(actor),
  ];
};

export const extractTextFromEnemy = (
  enemy: Data_Enemy
): TextWithReferences[] => {
  return [
    ...pickString(enemy, ["name"], createTextReference),
    ...extractNotes(enemy),
  ];
};

export const extractTextFromItem = (item: Data_Item): TextWithReferences[] => {
  return [
    ...pickString(item, ["name", "description"], createTextReference),
    ...extractNotes(item),
  ];
};

export const extractTextFromSkill = (
  skill: Data_Skill
): TextWithReferences[] => {
  return [
    ...pickString(
      skill,
      ["name", "description", "message1", "message2"],
      createTextReference
    ),
    ...extractNotes(skill),
  ];
};

interface DataType {
  id: number;
  note: string;
}

export const createTextReference = (
  key: string,
  value: string,
  obj: DataType
): TextWithReferences => ({
  key,
  text: value,
  id: obj.id,
});

export const mapNoteToText = (
  key: string,
  value: string,
  data: DataType
): TextWithReferences => ({
  key: `note.${key}`,
  id: data.id,
  text: value,
});

export const extractNotes = (data: DataType): TextWithReferences[] =>
  readNoteObject(data, mapNoteToText);
