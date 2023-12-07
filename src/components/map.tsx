'use client';

import { decodePolyline } from '@/lib/functions';
import { MapContainer } from 'react-leaflet/MapContainer';
import { Polyline } from 'react-leaflet/Polyline';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet/Marker';

export const customIcon = new Icon({
	iconUrl: '/marker-icon.png',
	iconSize: [25, 28],
});

interface MapComponentProps {
	geometry: string;
	markerCoords: [number, number][];
}

export default function MapComponent({
	geometry,
	markerCoords,
}: MapComponentProps) {
	return (
		<MapContainer
			center={[-18.458625, -70.294681]}
			zoom={13}
			className='w-full h-full'
		>
			<TileLayer
				attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{markerCoords.map((marker, index) => (
				<Marker
					key={index}
					position={marker}
					icon={customIcon}
				></Marker>
			))}
			<Polyline positions={decodePolyline(geometry, false)} />
		</MapContainer>
	);
}
