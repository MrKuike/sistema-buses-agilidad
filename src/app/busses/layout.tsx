export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className='flex flex-1 flex-col p-4'>
				<h2>Panel de Buses</h2>
				{children}
			</main>
		</>
	);
}
