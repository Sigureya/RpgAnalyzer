import type { Command_ControlVariables } from "@sigureya/rpgtypes";

export const controlVariable = (command: Command_ControlVariables) => {
  if (command.parameters[2] === 0) {
    return;
  }
};
