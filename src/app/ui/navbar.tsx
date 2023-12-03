'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'

const routes = [
    {
        name: 'Buses',
        path: 'busses'
    },
    {
        name: 'Rutas',
        path: 'roads'
    },
    {
        name: 'Conductores',
        path: 'drivers'
    }
];

export default function Navbar() {
    const pathname  = usePathname().split('/')[1];    

    return (
        <nav className="w-screen h-10 flex justify-center px-4">
        <ul className="flex h-full items-center bg-slate-300 rounded-full gap-3 w-full px-2">
            {
                routes.map((route, index) => (
                    <li className="flex-1 text-center text-xs md:text-base" key={route.path}>
                        <Link href={`/${route.path}`} className={`${pathname === route.path ? 'rounded-full bg-white px-5 py-1 text-base md:text-xl' : ''}`}>
                            {route.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
        </nav>
    );
    }