import { InMemorySpotRepo, InMemorySessionRepo } from "../infra/inMemoryRepos";
import { SimpleAllocator } from "./simpleAllocator";
import { FeeCalculatorFactory } from "./feeCalculatorFactory";
import { VehicleDto } from "../dtos/vehicle.dto";

export class ParkingService {
  private allocator: SimpleAllocator;
  constructor(private spotRepo: InMemorySpotRepo, private sessionRepo: InMemorySessionRepo) {
    this.allocator = new SimpleAllocator(spotRepo, sessionRepo);
  }

  async checkIn(vehicle: VehicleDto) {
    const spot = await this.allocator.allocate(vehicle);
    return { spotId: spot.id, code: spot.code };
  }

  async checkOut(sessionId: string) {
    const session = (await (this.sessionRepo as any).sessions).find((s: any) => s.id === sessionId);
    if (!session) throw new Error('NotFound');
    session.exitTime = new Date();
    const calculator = FeeCalculatorFactory.for(session.vehicle.type);
    const amount = calculator.calculate(session);
    await this.sessionRepo.close(sessionId, session.exitTime, amount);
    await this.allocator.release(session.spotId);
    return { amount };
  }
}