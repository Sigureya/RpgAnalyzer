import { Data_Actor, Data_Enemy, Data_Item, Data_Skill, Data_Weapon, Data_Armor, Data_State, Data_Class, PickByType } from '@sigureya/rpgtypes';
export interface TextWithReferences {
    key: string;
    text: string;
    id: number;
}
type TextDataSource<T extends {
    id: number;
}> = PickByType<T, string> & {
    id: number;
};
type DataPicker<T extends {
    id: number;
}> = (data: TextDataSource<T>) => TextWithReferences[];
export declare const extractTextFromActor: DataPicker<Data_Actor>;
export declare const extractTextFromEnemy: DataPicker<Data_Enemy>;
export declare const extractTextFromClass: DataPicker<Data_Class>;
export declare const extractTextFromState: DataPicker<Data_State>;
export declare const extractTextFromSkill: DataPicker<Data_Skill>;
export declare const extractTextFromItem: DataPicker<Data_Item>;
export declare const extractTextFromWeapon: DataPicker<Data_Weapon>;
export declare const extractTextFromArmor: DataPicker<Data_Armor>;
interface DataType {
    id: number;
    note: string;
}
export declare const createTextReference: (key: string, value: string, obj: DataType) => TextWithReferences;
export declare const mapNoteToText: (key: string, value: string, data: DataType) => TextWithReferences;
export declare const extractNotes: (data: DataType) => TextWithReferences[];
export {};
