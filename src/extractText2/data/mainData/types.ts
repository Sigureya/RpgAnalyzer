import type { PickByType } from "@sigureya/rpgtypes";

export interface ExtractedText {
  key: string;
  text: string;
  id: number;
}
export type TextExtractable<T> = PickByType<T, string> & {
  id: number;
  note: string;
};
