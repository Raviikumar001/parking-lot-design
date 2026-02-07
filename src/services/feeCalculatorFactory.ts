import { IFeeCalculator } from "../interfaces/feeCalculator";
import { FlatPerHourCalculator } from "./flatFeeCalculator";
import { VehicleType } from "../interfaces/allocator";

export class FeeCalculatorFactory {
  static for(type: VehicleType): IFeeCalculator {
    // in real case, read from DB config
    switch (type) {
      case 'MOTORCYCLE': return new FlatPerHourCalculator(0.5, 1.0, 15);
      case 'CAR': return new FlatPerHourCalculator(1.0, 2.0, 10);
      case 'BUS': return new FlatPerHourCalculator(2.0, 5.0, 0);
      default: return new FlatPerHourCalculator();
    }
  }
}