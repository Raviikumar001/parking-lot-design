import { IParkingSpotAllocator, ParkingSpot, VehicleDto } from "../interfaces/allocator";
import { InMemorySpotRepo, InMemorySessionRepo } from "../infra/inMemoryRepos";
import { v4 as uuid } from 'uuid';

export class SimpleAllocator implements IParkingSpotAllocator {
  constructor(private spotRepo: InMemorySpotRepo, private sessionRepo: InMemorySessionRepo) {}

  async allocate(vehicle: VehicleDto): Promise<ParkingSpot> {
    // naive: pick first available spot for vehicle type
    const candidates = await this.spotRepo.listAvailableBySize(vehicle.type);
    if (candidates.length === 0) throw new Error('NoSpace');
    candidates.sort((a,b) => a.distanceRank - b.distanceRank);
    const chosen = candidates[0];
    chosen.status = 'OCCUPIED';
    await this.spotRepo.update(chosen);

    const session = {
      id: uuid(),
      vehicle,
      spotId: chosen.id,
      entryTime: new Date()
    };
    await this.sessionRepo.create(session as any);
    return chosen;
  }

  async release(spotId: string): Promise<void> {
    const spot = await this.spotRepo.findById(spotId);
    if (!spot) return;
    spot.status = 'AVAILABLE';
    await this.spotRepo.update(spot);
  }
}