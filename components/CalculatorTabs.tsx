"use client";

import { useState } from "react";
import { FechasProvider } from "./FechasProvider";
import Calculator from "./Calculator";
import CarteraCalculator from "./CarteraCalculator";
import PagareCalculator from "./PagareCalculator";
import Feriados from "./Feriados";

type Modo = "dias" | "fecha" | "feriados";
type Inst = "echeq" | "cartera" | "pagare";

const MODOS: { label: string; value: Modo }[] = [
  { label: "Descuento por día", value: "dias" },
  { label: "Con fechas exactas", value: "fecha" },
  { label: "Feriados", value: "feriados" },
];

const INSTRUMENTOS: { label: string; value: Inst }[] = [
  { label: "eCheq", value: "echeq" },
  { label: "Cartera eCheq", value: "cartera" },
  { label: "Pagaré", value: "pagare" },
];

export default function CalculatorTabs() {
  const [modo, setModo] = useState<Modo>("dias");
  const [inst, setInst] = useState<Inst>("echeq");
  const calcMode = modo === "fecha" ? "fecha" : "dias";

  return (
    <FechasProvider>
      {/* Nivel 1: modo */}
      <div className="mb-4 inline-flex flex-wrap gap-1 rounded-xl bg-slate-200/70 p-1">
        {MODOS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setModo(t.value)}
            className={[
              "rounded-lg px-4 py-2 text-sm font-semibold transition",
              modo === t.value
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-800",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {modo === "feriados" ? (
        <Feriados />
      ) : (
        <>
          {/* Nivel 2: instrumento */}
          <div className="mb-6 inline-flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
            {INSTRUMENTOS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setInst(t.value)}
                className={[
                  "rounded-md px-4 py-1.5 text-sm font-medium transition",
                  inst === t.value
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>

          {inst === "echeq" && <Calculator mode={calcMode} />}
          {inst === "cartera" && <CarteraCalculator mode={calcMode} />}
          {inst === "pagare" && <PagareCalculator mode={calcMode} />}
        </>
      )}
    </FechasProvider>
  );
}
