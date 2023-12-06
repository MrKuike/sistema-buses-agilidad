'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { Icon, LatLng, LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline } from 'react-leaflet';
import { decodePolyline } from '@/lib/functions';
import { DirectionsResponseJSON } from 'openrouteservice/dist/directions';

export type Marker = {
	geocode: LatLng;
	popUp: string;
};

const customIcon = new Icon({
	iconUrl: '/marker-icon.png',
	iconSize: [25, 28],
});

function GetCoordinates({
	currentCoordinates,
	setCurrentCoordinates,
}: {
	currentCoordinates: LatLng | undefined;
	setCurrentCoordinates: React.Dispatch<
		React.SetStateAction<LatLng | undefined>
	>;
}) {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		map.on('click', e => {
			setCurrentCoordinates(e.latlng);
		});
	}, [map, setCurrentCoordinates]);

	return null;
}

interface CreateMapProps {
	ORSResponse: DirectionsResponseJSON | undefined;
	setORSResponse: React.Dispatch<
		React.SetStateAction<DirectionsResponseJSON | undefined>
	>;
}

export default function CreateMap({
	ORSResponse,
	setORSResponse,
}: CreateMapProps) {
	const [isMounted, setIsMounted] = useState(false);
	const [markers, setMarkers] = useState<Marker[]>([]);
	const [currentCoordinates, setCurrentCoordinates] = useState<
		LatLng | undefined
	>(undefined);

	useEffect(() => {
		if (currentCoordinates) {
			const currentMarker: Marker = {
				geocode: currentCoordinates,
				popUp: 'Punto',
			};

			setMarkers(oldMarkers => [...oldMarkers, currentMarker]);
		}
	}, [currentCoordinates]);

	useEffect(() => {
		if (markers.length > 1) {
			const coords: number[][] = [];
			markers.forEach(marker => {
				coords.push([marker.geocode.lng, marker.geocode.lat]);
			});

			console.log(JSON.stringify({ coords }));

			fetch('/api/coords/directions', {
				method: 'POST',
				body: JSON.stringify({ coords }),
			})
				.then(res => res.json())
				.then(data => {
					setORSResponse(data);
				});
		} else {
			setORSResponse(undefined);
		}
	}, [markers]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const deleteMarker = (e: L.LeafletMouseEvent) => {
		const { lat, lng } = e.latlng;
		const newMarkers = markers.filter(
			marker => marker.geocode.lat !== lat && marker.geocode.lng !== lng,
		);
		setMarkers(newMarkers);
	};

	return (
		isMounted && (
			<MapContainer
				center={[-18.458625, -70.294681]}
				zoom={13}
				className='w-full h-full'
			>
				<TileLayer
					attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={marker.geocode}
						icon={customIcon}
						eventHandlers={{
							click: deleteMarker,
						}}
					>
						<Popup>{marker.popUp}</Popup>
					</Marker>
				))}
				<GetCoordinates
					currentCoordinates={currentCoordinates}
					setCurrentCoordinates={setCurrentCoordinates}
				/>
				{ORSResponse && (
					<Polyline
						positions={decodePolyline(
							ORSResponse.routes[0].geometry ?? '',
							false,
						)}
					/>
				)}
			</MapContainer>
		)
	);
}
