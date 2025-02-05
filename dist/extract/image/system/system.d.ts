import { Data_System, Data_Vehicle } from '@sigureya/rpgtypes';
import { ExtractedSystemImage } from './types';
type Vehicle = Pick<Data_Vehicle, "characterName">;
interface SystemVehicles {
    boat: Vehicle;
    ship: Vehicle;
    airship: Vehicle;
}
export declare const extractImageFromSystem: (system: Pick<Data_System, "title1Name" | "title2Name"> & SystemVehicles) => ExtractedSystemImage[];
export {};
