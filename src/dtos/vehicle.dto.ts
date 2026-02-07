export type VehicleType = 'MOTORCYCLE' | 'CAR' | 'BUS';

export interface VehicleDto {
  plate: string;
  type: VehicleType;
}