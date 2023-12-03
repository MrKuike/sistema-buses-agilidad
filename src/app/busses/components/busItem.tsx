import { Busses } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface BusItemProps {
  bus: Busses;
}
export default function BusItem({ bus }: BusItemProps) {
  const { id, name, image } = bus;

  return (
    <div
      className="flex flex-col items-center border hover:border-blue-500 rounded duration-100 p-2"
    >
      <picture className="flex-1 grid place-items-center">
        <Image
          className='h-full object-cover'
          src={`/images/${image}`}
          width={100}
          height={100}
          alt="busesito"
        />
      </picture>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    </div>
  );
}
