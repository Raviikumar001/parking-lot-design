export type VehicleType = 'MOTORCYCLE' | 'CAR' | 'BUS';

export interface VehicleDto {
  plate: string;
  type: VehicleType;
}

export interface ParkingSpot {
  id: string;
  size: VehicleType;
  code: string;
  status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED';
  distanceRank: number;
}

export interface IParkingSpotAllocator {
  allocate(vehicle: VehicleDto): Promise<ParkingSpot>;
  release(spotId: string): Promise<void>;
}