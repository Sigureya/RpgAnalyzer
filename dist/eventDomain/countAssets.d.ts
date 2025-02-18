import { ImageCommand, AudioCommandInfo, VariableRead, CommonEventCallCount, VariableWrite } from './extract';
export declare const countMatchesImage: (list: ReadonlyArray<ImageCommand>, set: ReadonlySet<string>) => number;
export declare const countMatchesAudio: (list: ReadonlyArray<AudioCommandInfo>, set: ReadonlySet<string>) => number;
export declare const countMatchesVariable: (list: ReadonlyArray<VariableRead>, set: ReadonlySet<number>) => number;
export declare const countMatchesVariableWrite: (list: ReadonlyArray<VariableWrite>, set: ReadonlySet<number>) => number;
/**
 * @description Counts the total number of times specific common events have been called.
 *
 * @param eventCallCount A record mapping common event IDs to their respective call counts.
 * @param targetEventIds A unique list of common event IDs to monitor.
 *                       Duplicate entries are not allowed and should be filtered beforehand.
 *                       Although the function will still work with duplicates, it may lead to double counting.
 * @returns The total number of times the specified common events have been called.
 */
export declare const countCommonEventCall: (eventCallCount: CommonEventCallCount, targetEventIds: number[]) => number;
