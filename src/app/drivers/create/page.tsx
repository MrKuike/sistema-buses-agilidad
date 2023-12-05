"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const formatRun = (run: string) => {
  const cleanedRun = run.replace(/[^0-9kK]/g, "");
  const formattedRun =
    cleanedRun.length >= 7
      ? cleanedRun.slice(0, -1).replace(/(\d)(?=(\d{3})+$)/g, "$1.") +
        "-" +
        cleanedRun.slice(-1).toUpperCase()
      : cleanedRun.toUpperCase();

  return formattedRun;
};

export default function Page() {
  const router = useRouter();
  const [formattedRun, setFormattedRun] = useState("");

  const handleRunChange = (event: React.ChangeEvent) => {
    const inputRun = (event.target as HTMLInputElement).value;
    const formattedInputRun = formatRun(inputRun);
    setFormattedRun(formattedInputRun);
  };

  return (
    <form action="" className="flex flex-col gap-5">
      <fieldset className="flex flex-col">
        <label htmlFor="run">RUN del conductor</label>
        <input
          type="text"
          placeholder="Ej: 12.345.678-9"
          id="run"
          value={formattedRun}
          onChange={handleRunChange}
          className="border-2 border-slate-200 rounded px-1 py-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="name">Nombre del conductor</label>
        <input
          type="text"
          id="name"
          className="border-2 border-slate-200 rounded px-1 py-2"
        />
      </fieldset>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
