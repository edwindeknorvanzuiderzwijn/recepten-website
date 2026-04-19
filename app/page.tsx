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

export default function Home() {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Alle Recepten</h1>
        <p className="text-stone-500">{recepten.length} recepten uit 12 keukens</p>
      </div>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Zoek een recept..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-stone-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCuisine(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCuisine === tab
                ? "bg-stone-800 text-white"
                : "bg-white border border-stone-300 text-stone-600 hover:border-stone-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-400 text-sm">Geen recepten gevonden.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Link
              key={r.id}
              href={`/recept/${r.id}`}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:shadow-md hover:border-stone-300 transition-all group"
            >
              <span className="inline-block text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">
                {r.keuken}
              </span>
              <h2 className="font-semibold text-stone-800 group-hover:text-stone-950 leading-snug">
                {r.naam}
              </h2>
              <p className="mt-2 text-sm text-stone-500 line-clamp-3">{r.instructies}</p>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-stone-400">
        {filtered.length} van {recepten.length} recepten
      </p>
    </div>
  );
}
