import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Busses',
  description: 'Busses',
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
    <main className="h-3/4 p-4">
      <h2>Panel de Buses</h2>
      {children}
    </main>
    </>
  )
}