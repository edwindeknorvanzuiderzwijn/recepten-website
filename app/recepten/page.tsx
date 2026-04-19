"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import receptenData from "@/public/recepten.json";

interface Recept {
  id: string;
  naam: string;
  keuken: string;
  instructies: string;
  bron: string;
}

const recepten = receptenData as Recept[];
const keukens = Array.from(new Set(recepten.map((r) => r.keuken))).sort();

const cuisineColors: Record<string, string> = {
  Thai: "#2D6A4F",
  Indiaas: "#C8561A",
  Chinees: "#8B1A1A",
  Japans: "#614B79",
  Indonesisch: "#7B4F1A",
  Vietnamees: "#1A6B4F",
  Turks: "#8B4513",
  Arabisch: "#C8960A",
  Koreaans: "#6B2D4F",
  Mexicaans: "#6B4F1A",
  Grieks: "#1A4F6B",
  Italiaans: "#6B1A2D",
};

export default function ReceptenPage() {
  const [activeCuisine, setActiveCuisine] = useState<string>("Alle");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return recepten.filter((r) => {
      const matchesCuisine = activeCuisine === "Alle" || r.keuken === activeCuisine;
      const matchesSearch =
        search.trim() === "" ||
        r.naam.toLowerCase().includes(search.toLowerCase()) ||
        r.instructies.toLowerCase().includes(search.toLowerCase());
      return matchesCuisine && matchesSearch;
    });
  }, [activeCuisine, search]);

  const tabs = ["Alle", ...keukens];

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: "#FDF6EC" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #E8D5B8", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 600, color: "#2C1208", textDecoration: "none" }}>
          Oma&apos;s Recepten
        </Link>
        <span style={{ fontSize: "0.8rem", color: "#A08060", letterSpacing: "0.06em" }}>
          {recepten.length} RECEPTEN
        </span>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Search */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="search"
            placeholder="Zoek een recept..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 400,
              border: "1.5px solid #D4B896",
              borderRadius: 100,
              padding: "0.7rem 1.25rem",
              fontSize: "0.9rem",
              backgroundColor: "transparent",
              color: "#2C1208",
              outline: "none",
              fontFamily: "var(--font-dm-sans)",
            }}
          />
        </div>

        {/* Cuisine tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
          {tabs.map((tab) => {
            const active = activeCuisine === tab;
            const color = tab === "Alle" ? "#C8561A" : (cuisineColors[tab] || "#C8561A");
            return (
              <button
                key={tab}
                onClick={() => setActiveCuisine(tab)}
                style={{
                  padding: "0.4rem 1.1rem",
                  borderRadius: 100,
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  border: `1.5px solid ${active ? color : "#D4B896"}`,
                  backgroundColor: active ? color : "transparent",
                  color: active ? "#FDF6EC" : "#8B6040",
                  transition: "all 0.15s",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ color: "#A08060", fontSize: "0.9rem" }}>Geen recepten gevonden.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((r) => {
              const color = cuisineColors[r.keuken] || "#C8561A";
              return (
                <Link
                  key={r.id}
                  href={`/recept/${r.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #E8D5B8",
                      borderRadius: 16,
                      padding: "1.5rem",
                      height: "100%",
                      transition: "box-shadow 0.2s, transform 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(44,18,8,0.10)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color,
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                    }}>
                      {r.keuken}
                    </span>
                    <h2 style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#2C1208",
                      lineHeight: 1.35,
                      marginBottom: "0.75rem",
                    }}>
                      {r.naam}
                    </h2>
                    <p style={{
                      fontSize: "0.83rem",
                      color: "#A08060",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {r.instructies}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <p style={{ marginTop: "3rem", fontSize: "0.8rem", color: "#C4A882" }}>
          {filtered.length} van {recepten.length} recepten
        </p>
      </div>
    </div>
  );
}