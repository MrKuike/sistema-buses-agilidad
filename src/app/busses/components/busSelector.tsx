import { getBusses } from '@/lib/fetch';
import BusItem from './busItem';

export default function BusSelector() {
  const busses = getBusses();

  return (
    <div className="border">
      <h1 className="text-xl font-bold my-4 pl-2">Autobuses disponibles</h1>
      <div className="grid grid-cols-2 gap-2 p-2">
        {busses.map((bus) => (
          <BusItem key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  );
}
