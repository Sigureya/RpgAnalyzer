import { describe, expect, test } from "vitest";
import type {
  AudioFileParams,
  System_AudioFiles,
  System_SoundsArray,
} from "@sigureya/rpgtypes";
import { systemAudioFiles } from "./system";
import type { SystemSoundPath } from "./types";

const crateAudio = (name: string): AudioFileParams => ({
  name,
  pan: 50,
  pitch: 100,
  volume: 100,
});
const mockSystem: System_AudioFiles = {
  sounds: [
    crateAudio("cursor"),
    crateAudio("ok"),
    crateAudio("cancel"),
    crateAudio("buzzer"),
    crateAudio("equip"),
    crateAudio("save"),
    crateAudio("load"),
    crateAudio("battleStart"),
    crateAudio("escape"),
    crateAudio("enemyAttack"),
    crateAudio("enemyDamage"),
    crateAudio("enemyCollapse"),
    crateAudio("bossCollapes1"),
    crateAudio("bossCollapes2"),
    crateAudio("actorDamage"),
    crateAudio("actorCollapse"),
    crateAudio("playRecovery"),
    crateAudio("playMiss"),
    crateAudio("playEvasion"),
    crateAudio("playMagicEvasion"),
    crateAudio("playReflection"),
    crateAudio("shop"),
    crateAudio("useItem"),
    crateAudio("useSkill"),
  ] as System_SoundsArray,
  battleBgm: { name: "battle", pan: 50, pitch: 100, volume: 100 },
  titleBgm: { name: "title", pan: 50, pitch: 100, volume: 100 },
  defeatMe: { name: "defeat", pan: 50, pitch: 100, volume: 100 },
  gameoverMe: { name: "gameover", pan: 50, pitch: 100, volume: 100 },
  victoryMe: { name: "victory", pan: 50, pitch: 100, volume: 100 },
};

describe("systemAudioFiles", () => {
  const { sounds, bgm, me } = systemAudioFiles(mockSystem);
  test("bgm", () => {
    expect(bgm).toEqual([
      { index: 0, path: "battle" },
      { index: 1, path: "title" },
    ]);
  });
  test("me", () => {
    expect(me).toEqual([
      { index: 0, path: "defeat" },
      { index: 1, path: "gameover" },
      { index: 2, path: "victory" },
    ]);
  });
  test("sounds", () => {
    const expected: SystemSoundPath[] = mockSystem.sounds.map(
      (sound, index) => ({
        path: sound.name,
        index,
      })
    );
    expect(sounds).toEqual(expected);
  });
});
