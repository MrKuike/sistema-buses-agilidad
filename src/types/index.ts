export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Busses {
  id: UUID;
  name: string;
  color: string;
  image: string;
}

export interface Driver {
  id: UUID;
  name: string;
}

export interface Road {
  id: UUID;
  name: string;
  interestPoints: {
    name: string;
    street: string;
    order: number;
  }[];
}
