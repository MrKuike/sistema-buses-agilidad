import { getBus } from '@/lib/fetch';

interface BusPageProps {
  params: {
    id: string;
  };
}
export default async function BusPage({ params }: BusPageProps) {
  const { id } = params;
  const bus = await getBus(id);
  return <div>Pagina para bus con ID {JSON.stringify(bus)}</div>;
}
