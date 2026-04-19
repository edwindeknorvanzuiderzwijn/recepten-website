import receptenData from "@/public/recepten.json";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Recept {
  id: string;
  naam: string;
  keuken: string;
  instructies: string;
  bron: string;
}

const recepten = receptenData as Recept[];

export async function generateStaticParams() {
  return recepten.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recept = recepten.find((r) => r.id === id);
  if (!recept) return {};
  return { title: `${recept.naam} — Recepten Archief` };
}

export default async function ReceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recept = recepten.find((r) => r.id === id);
  if (!recept) notFound();

  const paragraphs = recept.instructies.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block"
      >
        Back to overview
      </Link>

      <span className="inline-block text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">
        {recept.keuken}
      </span>
      <h1 className="text-3xl font-bold leading-tight mb-6">{recept.naam}</h1>

      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-stone-700">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-stone-200">
        <a
          href={recept.bron}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-400 hover:text-stone-600 underline transition-colors"
        >
          Origineel recept bekijken
        </a>
      </div>
    </div>
  );
}