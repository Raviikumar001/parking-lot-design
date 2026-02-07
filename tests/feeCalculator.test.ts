import { FlatPerHourCalculator } from "../src/services/flatFeeCalculator";
import { ParkingSession } from "../src/dtos/session.dto";

test('calculates fee with grace period', () => {
  const calc = new FlatPerHourCalculator(1, 2, 10);
  const entry = new Date(Date.now() - (30 * 60_000)); // 30 minutes ago
  const session: ParkingSession = { id: 't1', vehicle: { plate: 'P', type: 'CAR' }, spotId: 's', entryTime: entry };
  const amount = calc.calculate(session as any);
  // 30 min - 10 grace -> 20 min => rounded up to 1 hour => base 1 + 1*2 = 3
  expect(amount).toBe(3);
});