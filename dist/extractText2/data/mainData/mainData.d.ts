import { ExtractedText, TextExtractable } from './types';
import type * as RpgTypes from "@sigureya/rpgtypes";
export declare const extractTextData: <T extends {
    id: number;
    note: string;
}, KeyType extends string & keyof RpgTypes.PickByType<T, string>>(data: T & {
    id: number;
}, keyList: ReadonlyArray<KeyType>) => ExtractedText[];
export declare const extractTextFromActor: (actor: TextExtractable<RpgTypes.Data_Actor>) => ExtractedText[];
export declare const extractTextFromEnemy: (enemy: TextExtractable<RpgTypes.Data_Enemy>) => ExtractedText[];
export declare const extractTextFromClass: (item: TextExtractable<RpgTypes.Data_Class>) => ExtractedText[];
export declare const extractTextFromSkill: (skill: TextExtractable<RpgTypes.Data_Skill>) => ExtractedText[];
export declare const extractTextFromItem: (item: TextExtractable<RpgTypes.Data_Item>) => ExtractedText[];
export declare const extractTextFromWeapon: (weapon: TextExtractable<RpgTypes.Data_Weapon>) => ExtractedText[];
export declare const extractTextFromArmor: (armor: TextExtractable<RpgTypes.Data_Armor>) => ExtractedText[];
export declare const extractTextFromState: (state: TextExtractable<RpgTypes.Data_State>) => ExtractedText[];
