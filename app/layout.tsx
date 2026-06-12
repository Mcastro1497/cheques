import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LB Finanzas · Descuento de eCheq",
  description:
    "Calculadora de descuento de cheques electrónicos (eCheq) y pagarés. Discrimina interés, comisión, IVA, IIBB y derechos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-screen bg-papel font-sans text-tinta">
        {children}
      </body>
    </html>
  );
}
