import Link from 'next/link';
import { getBusses } from '@/lib/fetch';

export default async function BussesPage() {
  const busses = await getBusses();
  return (
    <div>
      {busses.map((bus) => (
        <>
        <div key={bus.id}>{bus.name}</div>
        <Link href={`busses/${bus.id}`}>
          Ver detalles 
        </Link>
        </>
      ))}
    </div>
  );
}
