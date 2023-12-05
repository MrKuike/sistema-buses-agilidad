'use client';
import { MapComponent } from '@/components/map';
import { useState } from 'react';

interface RoadSelectorProps {
  setSelection: React.Dispatch<
    React.SetStateAction<{
      busPlate?: string | undefined;
      routeId?: string | undefined;
    }>
  >;
  selected: {
    busPlate?: string | undefined;
    routeId?: string | undefined;
  };
}

export default function RoadSelector({setSelection, selected}: RoadSelectorProps) {
  const [selectedRoad, setSelectedRoad] = useState(selected.routeId ?? '');
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoad(event.target.value);
    setSelection((prev) => ({ ...prev, routeId: event.target.value }));
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-xl font-bold my-4 pl-2">Seleccione una ruta</h1>
        <div className='flex gap-4 p-2'>
          <label className='whitespace-nowrap text-lg' htmlFor="roadSelector">Ruta elegida:</label>
          <select value={selectedRoad} className="flex-1 text-lg border border-black rounded text-center" id="roadSelector" onChange={handleSelect}>
            <option value="">Sin ruta elegida</option>
            <option value="1">Ruta 1</option>
          </select>
        </div>
      </div>
      <div className="flex-[4]">
        <MapComponent id={selectedRoad} />
      </div>
    </div>
  );
}
