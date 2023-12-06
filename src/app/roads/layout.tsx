export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className='p-4 flex-1 flex flex-col'>
				<h2>Panel de Rutas</h2>
				{children}
			</main>
		</>
	);
}
