import busses from '../busses.json';
interface GetProps {
  params: {
    id: string;
  };
}
export function GET(_req: Request, { params }: GetProps) {
  const { id } = params;
  const bus = busses.find((bus) => bus.id === id);
  if (bus) {
    return Response.json(bus);
  }
  return Response.json({ error: 'Bus not found' }, { status: 404 });
}
