"use client";

import { useState } from "react";
import Calculator from "./Calculator";
import PagareCalculator from "./PagareCalculator";

type Tab = "echeq" | "pagare";

export default function CalculatorTabs() {
  const [tab, setTab] = useState<Tab>("echeq");

  return (
    <div>
      <div className="mb-6 inline-flex rounded-xl bg-slate-200/70 p-1">
        {[
          { label: "eCheq", value: "echeq" as const },
          { label: "Pagaré", value: "pagare" as const },
        ].map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={[
              "rounded-lg px-6 py-2 text-sm font-semibold transition",
              tab === t.value
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-600 hover:text-slate-800",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "echeq" ? <Calculator /> : <PagareCalculator />}
    </div>
  );
}
