import {
  PLAY_BGM,
  type EventCommand,
  type Map_Audios,
  type MapEventContainer,
} from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { extractAudioFromMap } from "./correctCommands";
import type { AudioCommandInfo } from "./eventCommand";
import { mockCommonEvent } from "./eventCommand/mockCommands";
import { createAudioCommand } from "@sigureya/rpg-data-tools";

const mockMap: Map_Audios &
  MapEventContainer<EventCommand, { id: number; name: string }> = {
  bgm: { name: "bgm", volume: 100, pitch: 100, pan: 50 },
  bgs: { name: "bgs", volume: 100, pitch: 100, pan: 50 },
  autoplayBgm: false,
  autoplayBgs: false,
  events: [
    {
      id: 1,
      name: "event1",
      pages: [
        {
          list: [createAudioCommand(PLAY_BGM, "playBGM"), mockCommonEvent],
        },
      ],
    },
  ],
};

describe("extractAudioFromMap", () => {
  test("bgmとbgsを取得する", () => {
    const result = extractAudioFromMap(mockMap);
    const expected: AudioCommandInfo[] = [
      {
        code: PLAY_BGM,
        eventId: 1,
        pageIndex: 0,
        path: {
          folder: "bgm",
          fileName: "playBGM",
        },
      },
    ];

    expect(result).toEqual({
      bgm: mockMap.bgm,
      bgs: mockMap.bgs,
      commands: expected,
    });
  });
});
