interface MapComponentProps {
  id?: string;
}

export function MapComponent({ id }: MapComponentProps) {
  const map_id = id;
  if (!map_id) {
    return <div className="w-full h-full bg-gray-300"></div>;
  }
  const lat = -18.487681;
  const lng = -70.294797;
  const zoom = 17;
  return (
    <iframe
      className="w-full h-full"
      src={`https://app.cartes.io/maps/${map_id}/embed?type=map&lat=${lat}&lng=${lng}&zoom=${zoom}`}
    ></iframe>
  );
}
