"use client";

import { useState } from "react";
import { formatFecha, parseISO } from "@/lib/fechas";
import { useFechas } from "./FechasProvider";
import { inputCls } from "./ui";

export default function Feriados() {
  const { feriados, addFeriado, removeFeriado, estado } = useFechas();
  const [nuevo, setNuevo] = useState("");

  const agregar = () => {
    if (nuevo) {
      addFeriado(nuevo);
      setNuevo("");
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Feriados
      </h2>
      <p className="mb-3 text-sm text-slate-500">
        Cargá los feriados que querés excluir al contar los días hábiles del
        t+2 / t+1.
      </p>
      <p className="mb-5 text-xs font-medium">
        {estado === "cargando" && (
          <span className="text-slate-400">Cargando…</span>
        )}
        {estado === "compartido" && (
          <span className="text-emerald-600">
            ✓ Compartidos: los ve todo el que abra la app.
          </span>
        )}
        {estado === "local" && (
          <span className="text-amber-600">
            ⚠ KV sin configurar: por ahora solo en esta sesión.
          </span>
        )}
      </p>

      <div className="flex gap-2">
        <input
          type="date"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          className={inputCls(false) + " text-left"}
        />
        <button
          type="button"
          onClick={agregar}
          disabled={!nuevo}
          className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Agregar
        </button>
      </div>

      <div className="mt-6">
        {feriados.length === 0 ? (
          <p className="text-sm text-slate-400">No hay feriados cargados.</p>
        ) : (
          <ul className="space-y-2">
            {feriados.map((iso) => {
              const d = parseISO(iso);
              return (
                <li
                  key={iso}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                >
                  <span className="text-sm tabular-nums text-slate-700">
                    {d ? formatFecha(d) : iso}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFeriado(iso)}
                    className="text-sm font-medium text-slate-400 transition hover:text-red-500"
                    aria-label="Eliminar feriado"
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
