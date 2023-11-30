export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Busses {
  id: UUID;
  name: string;
  color: string;
  image: string;
}