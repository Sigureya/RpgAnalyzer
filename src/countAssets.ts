import { countMatches } from "./countMatches";
import type { ImageCommand, AudioCommandInfo } from "./extract";

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

// export const countMatchesVariable = (
//   list: ReadonlyArray<VariableRead>,
//   set: ReadonlySet<number>
// ): number => countMatches(list, set, (item) => item.variableId);

// export const countMatchesVariableWrite = (
//   list: ReadonlyArray<VariableWrite>,
//   set: ReadonlySet<number>
// ): number => countMatches(list, set, (item) => item.variableId);
