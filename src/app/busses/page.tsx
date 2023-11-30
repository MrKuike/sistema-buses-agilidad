import { getBusses } from '@/lib/fetch';
import { BusItem } from './components/busItem';

export default async function BussesPage() {
  const busses = getBusses();
  return (
    <main className="grid grid-cols-2 gap-4 p-4">
      <section>
        <div className="border ">
          <h1 className="text-xl font-bold my-4 pl-2">Autobuses disponibles</h1>
          <div className="grid grid-cols-2 gap-2 p-2">
            {busses.map((bus) => (
             <BusItem key={bus.id} bus={bus} />
            ))}
          </div>
        </div>
      </section>
      <section className="border"></section>
    </main>
  );
}
