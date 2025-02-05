import type {
  Data_System,
  Data_Vehicle,
  ImageFolders,
  PickByType,
} from "@sigureya/rpgtypes";
import type { ExtractedSystemImage } from "./types";
type Vehicle = Pick<Data_Vehicle, "characterName">;
interface SystemVehicles {
  boat: Vehicle;
  ship: Vehicle;
  airship: Vehicle;
}
const vehicle = (
  system: SystemVehicles,
  key: keyof SystemVehicles
): ExtractedSystemImage => {
  return {
    folder: "characters",
    key,
    image: system[key].characterName,
  };
};
const systemImage = <Key extends keyof PickByType<Data_System, string>>(
  system: Pick<Data_System, Key>,
  key: keyof typeof system,
  folder: ImageFolders
): ExtractedSystemImage => {
  return {
    folder,
    key,
    image: system[key],
  };
};

export const extractImageFromSystem = (
  system: Pick<Data_System, "title1Name" | "title2Name"> & SystemVehicles
): ExtractedSystemImage[] => {
  return [
    systemImage(system, "title1Name", "titles1"),
    systemImage(system, "title2Name", "titles2"),
    vehicle(system, "boat"),
    vehicle(system, "ship"),
    vehicle(system, "airship"),
  ];
};
