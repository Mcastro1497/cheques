import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Descuento de eCheq
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Calculá cuánto recibe el cliente al descontar un cheque electrónico en
          pesos. Base 365 días.
        </p>
      </header>

      <Calculator />

      <footer className="mt-8 text-center text-xs text-slate-400">
        El IVA aplica sólo sobre el interés. Cálculo orientativo.
      </footer>
    </main>
  );
}
