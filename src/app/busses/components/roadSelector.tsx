'use client';
import { MapComponent } from '@/components/map';
import { useState } from 'react';

export default function RoadSelector() {
  const [selectedRoad, setSelectedRoad] = useState('');
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoad(event.target.value);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-xl font-bold my-4 pl-2">Seleccione una ruta</h1>
        <div className='flex gap-4 p-2'>
          <label className='whitespace-nowrap text-lg' htmlFor="roadSelector">Ruta elegida:</label>
          <select className="flex-1 text-lg border border-black rounded text-center" id="roadSelector" onChange={handleSelect}>
            <option value="">Sin ruta elegida</option>
            <option value="f369e4ca-99e1-4929-9ec4-8bc1b7bbdd3e">Ruta 1</option>
            <option value="048eebe4-8dac-46e2-a947-50b6b8062fec">Ruta 2</option>
            <option value="c58c575d-2cd5-4d65-9907-c97c6a2df028">Ruta 3</option>
          </select>
        </div>
      </div>
      <div className="flex-[4]">
        <MapComponent id={selectedRoad} />
      </div>
    </div>
  );
}
