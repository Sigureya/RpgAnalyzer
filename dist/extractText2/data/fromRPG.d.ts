import { Data_Actor, Data_Enemy, Data_Item, Data_Skill, Data_Weapon, Data_Armor, Data_State, Data_Class } from '@sigureya/rpgtypes';
export interface TextWithReferences {
    key: string;
    text: string;
    id: number;
}
export declare const extractTextFromActor: (actor: Data_Actor) => TextWithReferences[];
export declare const extractTextFromEnemy: (enemy: Data_Enemy) => TextWithReferences[];
export declare const extractTextFromClass: (class_: Data_Class) => TextWithReferences[];
export declare const extractTextFromState: (state: Data_State) => TextWithReferences[];
export declare const extractTextFromSkill: (skill: Data_Skill) => TextWithReferences[];
export declare const extractTextFromItem: (item: Data_Item) => TextWithReferences[];
export declare const extractTextFromWeapon: (weapon: Data_Weapon) => TextWithReferences[];
export declare const extractTextFromArmor: (armor: Data_Armor) => TextWithReferences[];
interface DataType {
    id: number;
    note: string;
}
export declare const createTextReference: (key: string, value: string, obj: DataType) => TextWithReferences;
export declare const mapNoteToText: (key: string, value: string, data: DataType) => TextWithReferences;
export declare const extractNotes: (data: DataType) => TextWithReferences[];
export {};
