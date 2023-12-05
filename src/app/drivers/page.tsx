"use client";

import { useRouter } from "next/navigation";
import { getDrivers } from "../../lib/fetch";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const drivers = getDrivers();

  return (
    <>
      <h3>Lista de Conductores</h3>
      <ul className="grid grid-cols-3 md:grid-cols-5 bg-slate-100 rounded-lg p-2">
        {drivers.map((driver) => (
          <li
            key={driver.id}
            className="flex flex-wrap flex-col content-center justify-center rounded-xl p-1 hover:bg-slate-200"
          >
            <Image
              src={`/images/generic_driver.png`}
              alt={"Generic Driver Photo"}
              width={50}
              height={50}
            />
            <span className="text-center">{driver.name}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => router.push("/drivers/create")}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        + Agregar
      </button>
    </>
  );
}
