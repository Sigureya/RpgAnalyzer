import type { MappingObject } from "@sigureya/rpg-data-tools";

const x: Pick<
  MappingObject<void>,
  | "changeActorImages"
  | "setMovementRoute"
  | "showPicture"
  | "changeBattleBackground"
  | "changeParallax"
  | "changeVehicleImage"
> = {
  changeActorImages: () => {},
  setMovementRoute: () => {},
  showPicture: () => {},
  changeBattleBackground: () => {},
  changeParallax: () => {},
  changeVehicleImage: () => {},
};
