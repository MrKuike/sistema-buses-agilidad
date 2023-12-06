import Openrouteservice from 'openrouteservice';
import { Profile } from 'openrouteservice/dist/common.js';
import { DirectionsFormat, DirectionsResponseJSON } from 'openrouteservice/dist/directions.js';

type Req = {
    coords: [number, number][];
};

export async function POST(req: Request) {   
    const {coords}: Req = await req.json();
    if (!coords) return new Response('Missing information', { status: 400 }); 
    if (coords.length < 2) return new Response('Not enough coordinates', { status: 400 });   
    const ors = new Openrouteservice(process.env.ORS_API_KEY);
    const directions = await ors.getDirections(
    Profile.DRIVING_CAR,
    DirectionsFormat.JSON,
    
    {
        coordinates : coords,
        language: 'es'
    }
);
    return new Response(JSON.stringify(directions), { status: 200 });
}