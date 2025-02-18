import { countMatches } from "./countMatches";
import type {
  ImageCommand,
  AudioCommandInfo,
  VariableRead,
  CommonEventCallCount,
  VariableWrite,
} from "./extract";

export const countMatchesImage = (
  list: ReadonlyArray<ImageCommand>,
  set: ReadonlySet<string>
): number =>
  countMatches(
    list,
    set,
    (item) => `${item.folderName}:${item.parameter.value}`
  );

export const countMatchesAudio = (
  list: ReadonlyArray<AudioCommandInfo>,
  set: ReadonlySet<string>
): number =>
  countMatches(
    list,
    set,
    (item) => `${item.path.folder}:${item.path.fileName}`
  );

export const countMatchesVariable = (
  list: ReadonlyArray<VariableRead>,
  set: ReadonlySet<number>
): number => countMatches(list, set, (item) => item.variableId);

export const countMatchesVariableWrite = (
  list: ReadonlyArray<VariableWrite>,
  set: ReadonlySet<number>
): number => countMatches(list, set, (item) => item.variableId);

/**
 * @description Counts the total number of times specific common events have been called.
 *
 * @param eventCallCount A record mapping common event IDs to their respective call counts.
 * @param targetEventIds A unique list of common event IDs to monitor.
 *                       Duplicate entries are not allowed and should be filtered beforehand.
 *                       Although the function will still work with duplicates, it may lead to double counting.
 * @returns The total number of times the specified common events have been called.
 */
export const countCommonEventCall = (
  eventCallCount: CommonEventCallCount,
  targetEventIds: number[]
) => targetEventIds.reduce((acc, id) => acc + eventCallCount[id], 0);
