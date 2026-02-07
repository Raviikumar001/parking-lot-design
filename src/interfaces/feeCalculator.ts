import { ParkingSession } from "../dtos/session.dto";

export interface IFeeCalculator {
  calculate(session: ParkingSession): number;
}