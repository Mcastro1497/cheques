import Image from "next/image";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-8 flex items-center gap-4">
        <Image
          src="/mascota.jpeg"
          alt="Mascota"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
          priority
        />
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Descuento de eCheq
        </h1>
      </header>

      <Calculator />
    </main>
  );
}
