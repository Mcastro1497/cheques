"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { startOfDay } from "@/lib/fechas";

interface FechasCtx {
  /** Hoy a medianoche, o null hasta hidratar en el cliente. */
  hoy: Date | null;
  /** Feriados cargados manualmente, en ISO "YYYY-MM-DD". */
  feriados: string[];
  feriadosSet: Set<string>;
  addFeriado: (iso: string) => void;
  removeFeriado: (iso: string) => void;
}

const Context = createContext<FechasCtx | null>(null);

const STORAGE_KEY = "cheques:feriados";

export function FechasProvider({ children }: { children: React.ReactNode }) {
  const [feriados, setFeriados] = useState<string[]>([]);
  const [hoy, setHoy] = useState<Date | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHoy(startOfDay(new Date()));
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFeriados(JSON.parse(raw));
    } catch {
      // ignorar storage no disponible / json inválido
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feriados));
    } catch {
      // ignorar
    }
  }, [feriados, hydrated]);

  const feriadosSet = useMemo(() => new Set(feriados), [feriados]);

  const value: FechasCtx = {
    hoy,
    feriados,
    feriadosSet,
    addFeriado: (iso) =>
      setFeriados((prev) =>
        prev.includes(iso) ? prev : [...prev, iso].sort(),
      ),
    removeFeriado: (iso) =>
      setFeriados((prev) => prev.filter((f) => f !== iso)),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFechas(): FechasCtx {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useFechas debe usarse dentro de <FechasProvider>");
  return ctx;
}
