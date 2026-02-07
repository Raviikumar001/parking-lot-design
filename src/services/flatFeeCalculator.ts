import { IFeeCalculator } from "../interfaces/feeCalculator";
import { ParkingSession } from "../dtos/session.dto";

export class FlatPerHourCalculator implements IFeeCalculator {
  constructor(private base = 1.0, private perHour = 2.0, private graceMinutes = 10) {}

  calculate(session: ParkingSession): number {
    const entry = session.entryTime.getTime();
    const exit = (session.exitTime || new Date()).getTime();
    const minutes = Math.max(0, Math.ceil((exit - entry) / (60_000)) - this.graceMinutes);
    const hours = Math.max(0, Math.ceil(minutes / 60));
    return this.base + (hours * this.perHour);
  }
}