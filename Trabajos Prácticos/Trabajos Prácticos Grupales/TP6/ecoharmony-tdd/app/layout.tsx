import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "EcoHarmony Park — Inscripción",
  description: "Inscripción a actividades — EcoHarmony Park",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans antialiased text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
