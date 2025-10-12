import React from "react";

/* 
  ✅ Tailwind safelist for dynamic template colors:
  bg-blue-700 bg-green-500 bg-purple-500 bg-red-500 bg-gray-700 bg-indigo-500
  bg-teal-500 bg-orange-500 bg-cyan-600 bg-yellow-600 bg-pink-600 bg-violet-600 bg-blue-300
*/

export type TemplateKey =
  | "neo"
  | "classic"
  | "minimal"
  | "professional"
  | "elegant"
  | "creative"
  | "minimalist"
  | "corporate"
  | "modern"
  | "boldheader"
  | "twotone"
  | "portfolio"
  | "blueMinimalist";

type Props = {
  value: TemplateKey;
  onChange: (id: TemplateKey) => void; // ✅ fixed
};

// ✅ Template list
export const TEMPLATES: { id: TemplateKey; label: string; color: string }[] = [
  { id: "neo", label: "Neo", color: "bg-blue-700" },
  { id: "classic", label: "Classic", color: "bg-green-500" },
  { id: "minimal", label: "Minimal", color: "bg-purple-500" },
  { id: "professional", label: "Professional", color: "bg-red-500" },
  { id: "elegant", label: "Elegant", color: "bg-gray-700" },
  { id: "creative", label: "Creative", color: "bg-indigo-500" },
  { id: "minimalist", label: "Minimalist", color: "bg-teal-500" },
  { id: "corporate", label: "Corporate", color: "bg-orange-500" },
  { id: "modern", label: "Modern", color: "bg-cyan-600" },
  { id: "boldheader", label: "Bold Header", color: "bg-yellow-600" },
  { id: "twotone", label: "Two Tone", color: "bg-pink-600" },
  { id: "portfolio", label: "Portfolio", color: "bg-violet-600" },
  { id: "blueMinimalist", label: "Blue Minimalist", color: "bg-blue-300" },
];

export default function TemplatePicker({ value, onChange }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-2">Customize Style</h3>
      <p className="text-sm text-slate-500 mb-4">All Themes</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => {
          const selected = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)} // ✅ simplified, safe
              className={`w-full h-16 rounded-lg shadow hover:opacity-95 transition 
                flex items-center justify-center text-white font-semibold 
                ${t.color} ${selected ? "ring-4 ring-purple-300 scale-105" : ""}`}
              title={t.label}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Selected:{" "}
        <span className="font-semibold text-purple-600">{value}</span>
      </div>
    </div>
  );
}
