"use client";

import { useMemo, useState } from "react";
import { calcular } from "@/lib/calc";
import { formatARS, formatMilesInput, parseMilesInput } from "@/lib/format";
import { Field, PercentInput, ResultRow, Toggle, inputCls } from "./ui";

export default function Calculator() {
  const [plazo, setPlazo] = useState("90");
  const [montoStr, setMontoStr] = useState("10.000.000");
  const [tasa, setTasa] = useState("22");
  const [comision, setComision] = useState("4");
  const [exento, setExento] = useState(true);

  const plazoNum = Math.floor(Number(plazo));
  const montoNum = parseMilesInput(montoStr);
  const tasaNum = Number(tasa);
  const comisionNum = Number(comision);

  // Validación: todos los números deben ser positivos (plazo y monto > 0).
  const errors = {
    plazo: plazo !== "" && (!Number.isFinite(plazoNum) || plazoNum <= 0),
    monto: montoStr !== "" && montoNum <= 0,
    tasa: tasa !== "" && (!Number.isFinite(tasaNum) || tasaNum < 0),
    comision:
      comision !== "" && (!Number.isFinite(comisionNum) || comisionNum < 0),
  };

  const inputsValidos =
    plazoNum > 0 &&
    montoNum > 0 &&
    Number.isFinite(tasaNum) &&
    tasaNum >= 0 &&
    Number.isFinite(comisionNum) &&
    comisionNum >= 0;

  const result = useMemo(() => {
    if (!inputsValidos) return null;
    return calcular({
      plazoDias: plazoNum,
      monto: montoNum,
      tasaTNA: tasaNum,
      comisionTNA: comisionNum,
      exento,
    });
  }, [inputsValidos, plazoNum, montoNum, tasaNum, comisionNum, exento]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      {/* Formulario */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Datos del eCheq
        </h2>

        <div className="space-y-5">
          <Field
            label="Monto del eCheq"
            error={errors.monto ? "El monto debe ser mayor a 0." : undefined}
          >
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                $
              </span>
              <input
                inputMode="numeric"
                value={montoStr}
                onChange={(e) => setMontoStr(formatMilesInput(e.target.value))}
                className={inputCls(errors.monto) + " pl-7"}
                placeholder="10.000.000"
              />
            </div>
          </Field>

          <Field
            label="Plazo (días)"
            error={errors.plazo ? "Ingresá un plazo mayor a 0." : undefined}
          >
            <input
              inputMode="numeric"
              value={plazo}
              onChange={(e) => setPlazo(e.target.value.replace(/\D/g, ""))}
              className={inputCls(errors.plazo)}
              placeholder="90"
            />
          </Field>

          <Field
            label="Tasa descontada (TNA)"
            error={errors.tasa ? "Inválida." : undefined}
          >
            <PercentInput
              value={tasa}
              onChange={setTasa}
              error={errors.tasa}
              placeholder="22"
            />
          </Field>

          <Field
            label="Comisión (TNA)"
            error={errors.comision ? "Inválida." : undefined}
          >
            <PercentInput
              value={comision}
              onChange={setComision}
              error={errors.comision}
              placeholder="4"
            />
          </Field>

          <Field label="Comprador exento de IVA">
            <Toggle value={exento} onChange={setExento} />
          </Field>
        </div>
      </section>

      {/* Resultados */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Resultado
        </h2>

        {result ? (
          <div className="space-y-3">
            <ResultRow
              label="Monto descontado"
              value={formatARS(result.montoDescontado)}
            />
            <ResultRow label="Interés" value={formatARS(result.interes)} />
            <ResultRow
              label="Comisión cobrada"
              value={formatARS(result.comisionCobrada)}
            />
            <ResultRow
              label="IVA (21% s/ comisión)"
              value={formatARS(result.ivaComision)}
            />
            {!exento && (
              <ResultRow
                label="IVA (21% s/ interés)"
                value={formatARS(result.iva)}
              />
            )}
            <ResultRow label="Retención IIBB" value={formatARS(result.iibb)} />
            <ResultRow
              label="Derechos de mercado"
              value={formatARS(result.ddmm)}
            />
            <ResultRow
              label="IVA (21% s/ derechos)"
              value={formatARS(result.ivaDdmm)}
            />

            <div className="mt-5 rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Monto neto que recibe el cliente
              </p>
              <p className="mt-1 whitespace-nowrap text-2xl font-bold tabular-nums text-emerald-700 sm:text-3xl">
                {formatARS(result.clienteRecibe)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            Completá los datos para ver el cálculo.
          </p>
        )}
      </section>
    </div>
  );
}
