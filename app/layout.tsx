import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recepten Archief",
  description: "Een groot receptenarchief gesorteerd op keuken.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <header className="bg-white border-b border-stone-200 px-6 py-4">
          <a href="/" className="text-xl font-bold tracking-tight hover:opacity-75 transition-opacity">
            Recepten Archief
          </a>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="text-center text-sm text-stone-400 py-6 border-t border-stone-200">
          Recepten van{" "}
          <a href="https://azieindewok.nl" className="underline hover:text-stone-600" target="_blank" rel="noopener noreferrer">
            Azië in de Wok
          </a>
        </footer>
      </body>
    </html>
  );
}
