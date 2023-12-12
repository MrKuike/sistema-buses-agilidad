import { create } from 'zustand';

type BusSelection = {
	busPlate: string | null;
	routeId: number | null;
  driverId: string | null;
};

type BusSelectionStore = {
	busPlate: string | null;
	routeId: number | null;
  driverId: string | null;
	setBusPlate: (busPlate: string) => void;
	setRouteId: (routeId: number) => void;
  setBusSelection: ({busPlate, routeId}: BusSelection) => void;
	reset: () => void;
};

const initialState: BusSelection = {
	busPlate: null,
	routeId: null,
  driverId: null,
};

export const useBusSelection = create<BusSelectionStore>(set => ({
	...initialState,
	setBusPlate: (busPlate: string) => set(state => ({ ...state, busPlate })),
	setRouteId: (routeId: number) => set(state => ({ ...state, routeId })),
  setBusSelection: (payload) => set(payload),
	reset: () => set(initialState),
}));
