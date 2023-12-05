export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Busses {
  brand: string;
  color: string;
  model: string;
  plate: string;
  seats: number;
  driverID: string | null;
  roadID: string | null;
}

export interface Driver {
  id: UUID;
  name: string;
}

export interface Road {
  id: UUID;
  name: string;
  time: string;
  interestPoints: {
    name: string;
    street: string;
    order: number;
  }[];
}
