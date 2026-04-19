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
  return { title: `${recept.naam} — Oma's Recepten` };
}

export default async function ReceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recept = recepten.find((r) => r.id === id);
  if (!recept) notFound();

  const paragraphs = recept.instructies.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: "#FDF6EC" }}>
      <header style={{ borderBottom: "1px solid #E8D5B8", padding: "1.25rem 1.5rem" }}>
        <Link href="/recepten" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 600, color: "#2C1208", textDecoration: "none" }}>
          Oma&apos;s Recepten
        </Link>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <Link
          href="/recepten"
          style={{ fontSize: "0.85rem", color: "#A08060", textDecoration: "none", display: "inline-block", marginBottom: "2.5rem" }}
        >
          ← Terug naar overzicht
        </Link>

        <span style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "#C8561A",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          {recept.keuken}
        </span>

        <h1 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#2C1208",
          lineHeight: 1.2,
          marginBottom: "3rem",
        }}>
          {recept.naam}
        </h1>

        {/* Decorative divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2.5rem", opacity: 0.5 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "#D4B896" }} />
          <svg viewBox="0 0 20 20" style={{ width: 14, height: 14, fill: "#C8561A" }}>
            <path d="M10 1 L11.5 7.5 L18 7 L13 11.5 L15 18 L10 14.5 L5 18 L7 11.5 L2 7 L8.5 7.5 Z" />
          </svg>
          <div style={{ flex: 1, height: 1, backgroundColor: "#D4B896" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ lineHeight: 1.8, color: "#4A2C18", fontSize: "0.97rem" }}>
              {p}
            </p>
          ))}
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #E8D5B8" }}>
          <a
            href={recept.bron}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.82rem", color: "#A08060", textDecoration: "underline" }}
          >
            Origineel recept bekijken →
          </a>
        </div>
      </div>
    </div>
  );
}