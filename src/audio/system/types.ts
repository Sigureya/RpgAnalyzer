export interface SystemSoundPath {
  index: number;
  path: string;
}
export interface ExtractedSystemAudio {
  sounds: SystemSoundPath[];
  bgm: SystemSoundPath[];
  me: SystemSoundPath[];
}
