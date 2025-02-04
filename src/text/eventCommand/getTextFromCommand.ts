import type {
  CommandParameter,
  EventCommandGroup_Script,
  TextCommandMapper,
} from "@sigureya/rpg-data-tools";
import {
  mappingCommandList,
  normalizedCommands,
  pickCommandParamString,
  processEventPages,
} from "@sigureya/rpg-data-tools";
import type { EventCommand } from "@sigureya/rpgtypes";
import { type Command_ShowChoices } from "@sigureya/rpgtypes";

type CommandParam = CommandParameter<string>;
export const extractTextFromEventCommands = (
  list: ReadonlyArray<EventCommand>
): CommandParam[][] => {
  // メッセージの表示など結合し、1つのコマンドにまとめる
  const normalized = normalizedCommands(list).flat();
  return mappingCommandList(normalized, extractTextMapper);
};
export const extractTextFromEventPages = (event: {
  pages: { list: EventCommand[] }[];
}): CommandParam[][][] => {
  return processEventPages(event, (page) =>
    extractTextFromEventCommands(page.list)
  );
};

export const extractTextMapper: TextCommandMapper<CommandParam[]> = {
  changeName: (command) => [pickCommandParamString(command, 1)],
  changeNickname: (command) => [pickCommandParamString(command, 1)],
  changeProfile: (command) => [pickCommandParamString(command, 1)],
  showChoices: (command) => commandChoice(command),
  showScrollingText: (groop) => {
    return [pickCommandParamString(groop.mergedBody(), 0)];
  },
  showMessage: (data) => {
    const command = data.normalizedCommands();
    const head = pickCommandParamString(command[0], 4);
    const bodyCommand = command[1];
    if (bodyCommand) {
      return [head, pickCommandParamString(bodyCommand, 0)];
    }
    return [head];
  },
  choiceWhen() {
    return [];
  },
  comment(groop) {
    const command = groop.mergedBody();
    return [pickCommandParamString(command, 0)];
  },
  script: (groop) => readScript(groop),

  other: () => [],
  commentBody: () => [],
};

export const readScript = (
  script: EventCommandGroup_Script
): CommandParam[] => {
  return [];
};

export const commandChoice = (command: Command_ShowChoices): CommandParam[] => {
  return command.parameters[0].map<CommandParam>((msg, index) => ({
    code: command.code,
    paramIndex: index,
    value: msg,
  }));
};
