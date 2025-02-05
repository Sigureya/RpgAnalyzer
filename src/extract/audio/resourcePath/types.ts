import type { AudioFolders } from "@sigureya/rpgtypes";

export interface AudioResourcePath {
  folder: AudioFolders | "";
  fileName: string;
}

export interface AudioCommandInfo {
  code: number;
  path: AudioResourcePath;
  eventId: number;
  pageIndex: number;
}
