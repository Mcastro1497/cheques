"use client";

export function inputCls(error?: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-right text-base tabular-nums outline-none transition",
    "focus:ring-2",
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-200",
  ].join(" ");
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function NumberInput({
  value,
  onChange,
  error,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      inputMode="decimal"
      value={value}
      onChange={(e) =>
        onChange(e.target.value.replace(/[^\d.,]/g, "").replace(",", "."))
      }
      className={inputCls(error)}
      placeholder={placeholder}
    />
  );
}

export function PercentInput({
  value,
  onChange,
  error,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/[^\d.,]/g, "").replace(",", "."))
        }
        className={inputCls(error) + " pr-7"}
        placeholder={placeholder}
      />
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
        %
      </span>
    </div>
  );
}

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1">
      {[
        { label: "Sí", v: true },
        { label: "No", v: false },
      ].map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => onChange(opt.v)}
          className={[
            "rounded-md px-5 py-1.5 text-sm font-medium transition",
            value === opt.v
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            "flex-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition",
            value === opt.value
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="whitespace-nowrap text-base font-semibold tabular-nums text-slate-900">
        {value}
      </span>
    </div>
  );
}
