import { ParkingSpot } from "../interfaces/allocator";
import { ParkingSession } from "../dtos/session.dto";

export class InMemorySpotRepo {
  private spots: ParkingSpot[] = [];

  constructor(initial: ParkingSpot[] = []) { this.spots = initial.slice(); }

  async listAvailableBySize(size: string): Promise<ParkingSpot[]> {
    return this.spots.filter(s => s.status === 'AVAILABLE' && (s.size === size));
  }

  async findById(id: string): Promise<ParkingSpot | undefined> {
    return this.spots.find(s => s.id === id);
  }

  async update(spot: ParkingSpot): Promise<void> {
    const idx = this.spots.findIndex(s => s.id === spot.id);
    if (idx >= 0) this.spots[idx] = spot;
  }

  async add(spot: ParkingSpot) {
    this.spots.push(spot);
  }
}

export class InMemorySessionRepo {
  private sessions: ParkingSession[] = [];

  async create(s: ParkingSession) { this.sessions.push(s); }
  async findActiveByPlate(plate: string) { return this.sessions.find(x => x.vehicle.plate === plate && !x.exitTime); }
  async close(id: string, exitTime: Date, amount: number) {
    const s = this.sessions.find(x => x.id === id);
    if (s) { s.exitTime = exitTime; s.amount = amount; }
  }
}