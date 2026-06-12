"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { startOfDay } from "@/lib/fechas";

type Estado = "cargando" | "compartido" | "local";

interface FechasCtx {
  /** Hoy a medianoche, o null hasta hidratar en el cliente. */
  hoy: Date | null;
  /** Feriados cargados, en ISO "YYYY-MM-DD". */
  feriados: string[];
  feriadosSet: Set<string>;
  addFeriado: (iso: string) => void;
  removeFeriado: (iso: string) => void;
  /** "compartido": persisten en Vercel KV. "local": KV sin configurar. */
  estado: Estado;
}

const Context = createContext<FechasCtx | null>(null);

function ordenar(arr: string[]): string[] {
  return Array.from(new Set(arr)).sort();
}

export function FechasProvider({ children }: { children: React.ReactNode }) {
  const [feriados, setFeriados] = useState<string[]>([]);
  const [hoy, setHoy] = useState<Date | null>(null);
  const [estado, setEstado] = useState<Estado>("cargando");

  useEffect(() => {
    setHoy(startOfDay(new Date()));
    let activo = true;
    fetch("/api/feriados")
      .then((r) => r.json())
      .then((data) => {
        if (!activo) return;
        setFeriados(ordenar(data.feriados ?? []));
        setEstado(data.configurado ? "compartido" : "local");
      })
      .catch(() => {
        if (activo) setEstado("local");
      });
    return () => {
      activo = false;
    };
  }, []);

  const addFeriado = (iso: string) => {
    setFeriados((prev) => ordenar([...prev, iso]));
    fetch("/api/feriados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: iso }),
    }).catch(() => {});
  };

  const removeFeriado = (iso: string) => {
    setFeriados((prev) => prev.filter((f) => f !== iso));
    fetch("/api/feriados", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: iso }),
    }).catch(() => {});
  };

  const feriadosSet = useMemo(() => new Set(feriados), [feriados]);

  const value: FechasCtx = {
    hoy,
    feriados,
    feriadosSet,
    addFeriado,
    removeFeriado,
    estado,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFechas(): FechasCtx {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useFechas debe usarse dentro de <FechasProvider>");
  return ctx;
}
