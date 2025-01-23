import { pickString, readNoteObject } from "@sigureya/rpg-data-tools";
import type {
  Data_Actor,
  Data_Enemy,
  Data_Item,
  Data_Skill,
  Data_Weapon,
  Data_Armor,
  Data_State,
  Data_Class,
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
    ...pickString(actor, ["name", "nickname", "profile"], createTextReference),
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

export const extractTextFromClass = (
  class_: Data_Class
): TextWithReferences[] => {
  return [
    ...pickString(class_, ["name"], createTextReference),
    ...extractNotes(class_),
  ];
};

export const extractTextFromState = (
  state: Data_State
): TextWithReferences[] => {
  return [
    ...pickString(
      state,
      ["name", "message1", "message2", "message3", "message4"],
      createTextReference
    ),
    ...extractNotes(state),
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

export const extractTextFromItem = (item: Data_Item): TextWithReferences[] => {
  return [
    ...pickString(item, ["name", "description"], createTextReference),
    ...extractNotes(item),
  ];
};

export const extractTextFromWeapon = (
  weapon: Data_Weapon
): TextWithReferences[] => {
  return [
    ...pickString(weapon, ["name", "description"], createTextReference),
    ...extractNotes(weapon),
  ];
};

export const extractTextFromArmor = (
  armor: Data_Armor
): TextWithReferences[] => {
  return [
    ...pickString(armor, ["name", "description"], createTextReference),
    ...extractNotes(armor),
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
