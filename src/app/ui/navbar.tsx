'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

const routes = [
	{
		name: 'Buses',
		path: 'busses',
	},
	{
		name: 'Rutas',
		path: 'roads',
	},
	{
		name: 'Conductores',
		path: 'drivers',
	},
];

const moveSquare = (
	currentTarget: HTMLAnchorElement,
	square: HTMLDivElement,
) => {
	const target = currentTarget;
	const box = target.getBoundingClientRect();
	console.log(target.offsetLeft);

	square.style.width = `${box.width + 40}px`;
	square.style.transform = `translateX(${target.offsetLeft - 20}px)`;
	square.style.opacity = '1';
};

export default function Navbar() {
	const pathname = usePathname().split('/')[1];
	const square = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!square.current) return;

		const currentLink = document.querySelector(
			'nav a.active',
		) as HTMLAnchorElement;

		moveSquare(currentLink, square.current);

		const handleResize = () => {
			moveSquare(currentLink, square.current!);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [pathname]);

	return (
		<nav className='w-full h-10 flex justify-center px-4'>
			<ul className='relative flex h-full items-center bg-slate-300 rounded gap-3 w-full'>
				<div
					ref={square}
					className={`opacity-0 origin-center transition-transform duration-300 z-0 absolute rounded bg-white h-8 w-10`}
				/>
				{routes.map(route => {
					return (
						<li
							className='flex-1 text-center text-xs md:text-base z-10'
							key={route.path}
						>
							<Link
								href={`/${route.path}`}
								className={`${
									pathname === route.path ? 'active text-base md:text-xl' : ''
								}`}
							>
								{route.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
