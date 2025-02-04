import type {
  EventCommand,
  Map_Audios,
  MapEventContainer,
} from "@sigureya/rpgtypes";
import { describe, expect, test } from "vitest";
import { extractAudioFromMap } from "./extract";
import { mockCommonEvent, mockPlayBGM } from "./resourcePath/mockCommands";
import type { AudioCommandInfo } from "./resourcePath";

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
          list: [mockPlayBGM, mockCommonEvent],
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
        code: mockPlayBGM.code,
        eventId: 1,
        pageIndex: 0,
        path: {
          folder: "bgm",
          fileName: mockPlayBGM.parameters[0].name,
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
