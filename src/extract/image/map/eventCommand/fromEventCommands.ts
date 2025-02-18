import type { MappingObject2 } from "@sigureya/rpg-data-tools";
import {
  flatMappingCommandList,
  isImageCommand,
  mappingCommandList,
  pickCommandParamString,
} from "@sigureya/rpg-data-tools";
import type { ImageCommand } from "./types";
import type {
  EventCommand,
  ImageFolders,
  IndexOfCommandParameter,
} from "@sigureya/rpgtypes";

/**
 * @deprecated
 */
export const extractImagesFromCommandListOld = (
  commands: ReadonlyArray<EventCommand>
): ImageCommand[][] => {
  return mappingCommandList(commands, mappingTable);
};

export const extractImagesFromCommandList = (
  commands: ReadonlyArray<EventCommand>
): ImageCommand[] => {
  return flatMappingCommandList(commands.filter(isImageCommand), mappingTable);
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
  MappingObject2<ImageCommand[]>,
  | "changeActorImages"
  //  | "setMovementRoute"
  | "showPicture"
  | "changeBattleBackground"
  | "changeParallax"
  | "changeVehicleImage"
  | "showMessage"
  | "other"
> = {
  showMessage: (command) => {
    return [imageCommand(command.header, 0, "faces")];
  },
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
