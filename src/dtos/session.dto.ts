import { VehicleDto } from "./vehicle.dto";

export interface ParkingSession {
  id: string;
  vehicle: VehicleDto;
  spotId: string;
  entryTime: Date;
  exitTime?: Date | null;
  amount?: number | null;
}
