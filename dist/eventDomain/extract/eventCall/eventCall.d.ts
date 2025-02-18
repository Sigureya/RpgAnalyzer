import { EventCommand } from '@sigureya/rpgtypes';
export type CommonEventCallCount = Record<number, number>;
export declare const extractCommonEventCalls: (list: ReadonlyArray<EventCommand>) => CommonEventCallCount;
