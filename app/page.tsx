import Image from "next/image";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Descuento de eCheq
        </h1>
      </header>

      <Calculator />

      <div className="mt-12 flex justify-center">
        <Image
          src="/mascota.jpeg"
          alt="Mascota"
          width={240}
          height={240}
          className="h-60 w-60 rounded-2xl object-cover ring-1 ring-slate-200"
          priority
        />
      </div>
    </main>
  );
}
