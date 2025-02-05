import {
  mappingCommandList,
  pickCommandParamString,
  type MappingObject,
} from "@sigureya/rpg-data-tools";
import type { ImageCommand } from "./types";
import type {
  EventCommand,
  ImageFolders,
  IndexOfCommandParameter,
} from "@sigureya/rpgtypes";

export const extractImagesFromCommands = (
  commands: ReadonlyArray<EventCommand>
): ImageCommand[][] => {
  return mappingCommandList(commands, mappingTable);
};

const imageCommand = <
  Params extends unknown[],
  Index extends IndexOfCommandParameter<
    {
      code: number;
      parameters: Params;
    },
    string
  >
>(
  command: {
    code: number;
    parameters: Params;
  },
  index: Index,
  folderName: ImageFolders
) => {
  return {
    folderName,
    command: pickCommandParamString(command, index),
  };
};
const mappingTable: Pick<
  MappingObject<ImageCommand[]>,
  | "changeActorImages"
  //  | "setMovementRoute"
  | "showPicture"
  | "changeBattleBackground"
  | "changeParallax"
  | "changeVehicleImage"
  | "other"
> = {
  changeActorImages: (command) => {
    return [
      imageCommand(command, 1, "characters"),
      imageCommand(command, 3, "faces"),
      imageCommand(command, 5, "sv_actors"),
    ];
  },
  showPicture: (command): [ImageCommand] => {
    return [imageCommand(command, 1, "pictures")];
  },
  changeBattleBackground: (command) => {
    return [
      imageCommand(command, 0, "battlebacks1"),
      imageCommand(command, 1, "battlebacks2"),
    ];
  },
  changeParallax: (command): [ImageCommand] => {
    return [imageCommand(command, 0, "parallaxes")];
  },
  changeVehicleImage: (command): [ImageCommand] => {
    return [imageCommand(command, 1, "characters")];
  },
  other: () => [],
};
