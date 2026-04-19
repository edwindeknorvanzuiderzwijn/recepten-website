"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Grandma() {
  return (
    <svg viewBox="0 0 220 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Hair bun top */}
      <ellipse cx="110" cy="52" rx="32" ry="26" fill="#C4B5A5" />
      <ellipse cx="110" cy="44" rx="20" ry="16" fill="#D4C6B6" />
      <circle cx="110" cy="34" r="10" fill="#C4B5A5" />
      {/* Side hair */}
      <ellipse cx="66" cy="100" rx="20" ry="42" fill="#C4B5A5" />
      <ellipse cx="154" cy="100" rx="20" ry="42" fill="#C4B5A5" />
      {/* Neck */}
      <rect x="96" y="158" width="28" height="22" rx="8" fill="#F2C49A" />
      {/* Face */}
      <ellipse cx="110" cy="115" rx="56" ry="64" fill="#F2C49A" />
      {/* Forehead wrinkle */}
      <path d="M 90 82 Q 110 79 130 82" fill="none" stroke="#E0A87A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Cheeks */}
      <ellipse cx="76" cy="126" rx="16" ry="11" fill="#E89070" opacity="0.3" />
      <ellipse cx="144" cy="126" rx="16" ry="11" fill="#E89070" opacity="0.3" />
      {/* Eyes */}
      <ellipse cx="88" cy="108" rx="7" ry="6" fill="white" />
      <ellipse cx="132" cy="108" rx="7" ry="6" fill="white" />
      <ellipse cx="88" cy="109" rx="4" ry="4" fill="#5C3D1E" />
      <ellipse cx="132" cy="109" rx="4" ry="4" fill="#5C3D1E" />
      <circle cx="89.5" cy="107.5" r="1.5" fill="white" opacity="0.8" />
      <circle cx="133.5" cy="107.5" r="1.5" fill="white" opacity="0.8" />
      {/* Eye wrinkles */}
      <path d="M 76 108 Q 80 105 84 108" fill="none" stroke="#D4956A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M 136 108 Q 140 105 144 108" fill="none" stroke="#D4956A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Glasses */}
      <rect x="74" y="101" width="26" height="16" rx="8" fill="none" stroke="#8B6040" strokeWidth="2.2" />
      <rect x="120" y="101" width="26" height="16" rx="8" fill="none" stroke="#8B6040" strokeWidth="2.2" />
      <line x1="100" y1="109" x2="120" y2="109" stroke="#8B6040" strokeWidth="2" />
      <line x1="50" y1="107" x2="74" y2="108" stroke="#8B6040" strokeWidth="2" />
      <line x1="146" y1="108" x2="170" y2="107" stroke="#8B6040" strokeWidth="2" />
      {/* Nose */}
      <ellipse cx="110" cy="124" rx="6" ry="5" fill="#E0A07A" opacity="0.7" />
      <path d="M 104 124 Q 110 130 116 124" fill="none" stroke="#D08060" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Smile lines */}
      <path d="M 76 136 Q 78 148 88 152" fill="none" stroke="#D4956A" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M 144 136 Q 142 148 132 152" fill="none" stroke="#D4956A" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Smile */}
      <path d="M 88 144 Q 110 162 132 144" fill="none" stroke="#B86050" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body / apron */}
      <ellipse cx="110" cy="228" rx="68" ry="36" fill="#E8D5B0" />
      <rect x="72" y="178" width="76" height="56" rx="10" fill="#F0E2C0" />
      {/* Apron bib */}
      <rect x="88" y="178" width="44" height="44" rx="6" fill="white" opacity="0.6" />
      {/* Collar */}
      <path d="M 90 178 Q 110 192 130 178" fill="#E8D0A8" />
    </svg>
  );
}

function MandalaOverlay({ active }: { active: boolean }) {
  return (
    <div className={`mandala-overlay${active ? " active" : ""}`}>
      <svg viewBox="0 0 400 400" style={{ width: "min(700px, 100vw)", height: "min(700px, 100vw)" }} xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring - lotus petals */}
        <g className="mandala-ring-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="80" rx="10" ry="42"
              fill="none" stroke="#E8A534" strokeWidth="1"
              opacity="0.35"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="175" fill="none" stroke="#E8A534" strokeWidth="0.5" opacity="0.3" />
        </g>
        {/* Middle ring */}
        <g className="mandala-ring-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="110" rx="14" ry="60"
              fill="#C8561A" opacity="0.18"
              transform={`rotate(${i * 45} 200 200)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="110" rx="14" ry="60"
              fill="none" stroke="#E8A534" strokeWidth="1.2"
              opacity="0.55"
              transform={`rotate(${i * 45} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="120" fill="none" stroke="#E8A534" strokeWidth="0.8" opacity="0.4" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#C8561A" strokeWidth="0.5" opacity="0.4" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 200 + Math.sin(angle) * 120;
            const y = 200 - Math.cos(angle) * 120;
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#E8A534" opacity="0.8" />;
          })}
        </g>
        {/* Inner ring */}
        <g className="mandala-ring-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="152" rx="10" ry="40"
              fill="#E8A534" opacity="0.22"
              transform={`rotate(${i * 45 + 22.5} 200 200)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200" cy="152" rx="10" ry="40"
              fill="none" stroke="#E8A534" strokeWidth="1"
              opacity="0.6"
              transform={`rotate(${i * 45 + 22.5} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="55" fill="none" stroke="#E8A534" strokeWidth="1" opacity="0.5" />
          <circle cx="200" cy="200" r="35" fill="none" stroke="#C8561A" strokeWidth="1.5" opacity="0.6" />
          <circle cx="200" cy="200" r="16" fill="#E8A534" opacity="0.5" />
          <circle cx="200" cy="200" r="8" fill="#FDF6EC" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

export default function LandingPage() {
  const [animating, setAnimating] = useState(false);
  const router = useRouter();

  function handleEnter() {
    setAnimating(true);
    setTimeout(() => router.push("/recepten"), 1100);
  }

  return (
    <>
      <MandalaOverlay active={animating} />

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: "#FDF6EC" }}>

        {/* Top decorative line */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <div style={{ width: 60, height: 1, backgroundColor: "#C8561A" }} />
          <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "#C8561A" }}>
            <path d="M12 2 L13.5 9 L20 8 L14.5 13 L17 20 L12 16 L7 20 L9.5 13 L4 8 L10.5 9 Z" />
          </svg>
          <div style={{ width: 60, height: 1, backgroundColor: "#C8561A" }} />
        </div>

        {/* Grandma portrait */}
        <div className="grandma-float relative mb-10" style={{ width: 200, height: 240 }}>
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(circle, #F5E6D0 60%, #FDF6EC 100%)",
            transform: "scale(1.15)",
            zIndex: 0,
          }} />
          <div className="relative z-10">
            <Grandma />
          </div>
        </div>

        {/* Text */}
        <h1 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          color: "#2C1208",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: "0.75rem",
        }}>
          Oma&apos;s Recepten
        </h1>

        <p style={{
          color: "#8B5A3A",
          fontSize: "1.1rem",
          textAlign: "center",
          maxWidth: 320,
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          Zin om vandaag iets lekkers te koken?
        </p>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          disabled={animating}
          style={{
            backgroundColor: "#C8561A",
            color: "#FDF6EC",
            border: "none",
            borderRadius: "100px",
            padding: "0.85rem 2.5rem",
            fontSize: "0.95rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.15s",
            fontFamily: "var(--font-dm-sans)",
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.backgroundColor = "#A84415"; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.backgroundColor = "#C8561A"; }}
        >
          Ja, laten we koken
        </button>

        {/* Bottom decorative */}
        <div className="flex items-center gap-4 mt-12 opacity-40">
          <div style={{ width: 40, height: 1, backgroundColor: "#C8561A" }} />
          <svg viewBox="0 0 20 20" style={{ width: 12, height: 12, fill: "#C8561A" }}>
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="3" r="1.5" />
            <circle cx="10" cy="17" r="1.5" />
            <circle cx="3" cy="10" r="1.5" />
            <circle cx="17" cy="10" r="1.5" />
          </svg>
          <div style={{ width: 40, height: 1, backgroundColor: "#C8561A" }} />
        </div>

      </div>
    </>
  );
}