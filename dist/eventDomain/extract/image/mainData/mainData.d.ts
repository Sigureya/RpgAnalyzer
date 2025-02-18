import { ExtractedActorImage, ExtractedEnemyImage, ImageExtractableActor } from './types';
import type * as RpgTypes from "@sigureya/rpgtypes";
export declare const extractImageFromEnemy: (enemy: Pick<RpgTypes.Data_Enemy, "id" | "battlerName">) => ExtractedEnemyImage;
export declare const extractImageFromActor: (actor: ImageExtractableActor) => ExtractedActorImage[];
