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
  PickByType,
} from "@sigureya/rpgtypes";
export interface TextWithReferences {
  key: string;
  text: string;
  id: number;
}

type TextDataSource<T extends { id: number }> = PickByType<T, string> & {
  id: number;
};

type DataPicker<T extends { id: number }> = (
  data: TextDataSource<T>
) => TextWithReferences[];

export const extractTextFromActor: DataPicker<Data_Actor> = (
  actor
): TextWithReferences[] => {
  return [
    ...pickString(actor, ["name", "nickname", "profile"], createTextReference),
    ...extractNotes(actor),
  ];
};

export const extractTextFromEnemy: DataPicker<Data_Enemy> = (
  enemy
): TextWithReferences[] => {
  return [
    ...pickString(enemy, ["name"], createTextReference),
    ...extractNotes(enemy),
  ];
};

export const extractTextFromClass: DataPicker<Data_Class> = (
  class_
): TextWithReferences[] => {
  return [
    ...pickString(class_, ["name"], createTextReference),
    ...extractNotes(class_),
  ];
};

export const extractTextFromState: DataPicker<Data_State> = (
  state
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
export const extractTextFromSkill: DataPicker<Data_Skill> = (
  skill
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

export const extractTextFromItem: DataPicker<Data_Item> = (
  item
): TextWithReferences[] => {
  return [
    ...pickString(item, ["name", "description"], createTextReference),
    ...extractNotes(item),
  ];
};

export const extractTextFromWeapon: DataPicker<Data_Weapon> = (
  weapon
): TextWithReferences[] => {
  return [
    ...pickString(weapon, ["name", "description"], createTextReference),
    ...extractNotes(weapon),
  ];
};

export const extractTextFromArmor: DataPicker<Data_Armor> = (
  armor
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
