export default function Layout({children}: {children: React.ReactNode}) {
    return (
    <>
    <main className="p-4">
        <h2>Panel de Rutas</h2>
        {children}
    </main>
    </>)
}