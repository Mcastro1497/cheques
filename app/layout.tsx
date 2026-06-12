import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Descuento de eCheq",
  description:
    "Calculadora de descuento de cheques electrónicos (eCheq) en pesos. Discrimina interés, comisión e IVA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
