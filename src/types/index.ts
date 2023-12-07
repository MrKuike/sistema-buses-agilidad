import { MapPointsCoord, Roads } from "@prisma/client";
import { LatLng } from "leaflet";

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
  name: string;
  mapGeometry: string;
  time: Date;
}

export interface InterestsPoints {
  street: string;
  order: number;
}

export type MarkerType = {
	geocode: LatLng;
	popUp: string;
};

export type RoadsResponse = Roads & { InterestsPoints: InterestsPoints[]} & { MapPointsCoord: MapPointsCoord[]};