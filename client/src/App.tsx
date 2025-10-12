import React, { useState, useRef } from "react";
import type { Resume, TailorResponse } from "./api";
import ResumeForm from "./components/ResumeForm";
import TemplatePicker, { TemplateKey } from "./components/TemplatePicker";
import AIToolbox from "./components/AIToolbox";
import Preview from "./components/Preview";
import PortfolioForm from "./components/PortfolioForm";
import AIPortfolioToolbox from "./components/AIPortfolioToolbox";
import CustomBuilder from "./components/CustomBuilder";
import { useReactToPrint } from "react-to-print";
import PortfolioPreview from "./components/PortfolioPreview";

export type Portfolio = {
  name: string;
  role: string;
  intro: string;
  bio: string;
  photo: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  education: { schoolOrCollege: string; degree: string; year: string }[];
  projects?: { title: string; description?: string; link?: string }[];
  skills: string[];
  achievements: string[];
  certificates?: string[];
  customSections?: { title: string; content: string; applyTo?: string }[];
};

export default function App() {
  const [page, setPage] = useState<
    "home" | "resume" | "templates" | "portfolio" | "custom" | "preview"
  >("home");

  const [searchTerm, setSearchTerm] = useState("");

  const [resume, setResume] = useState<Resume>({
    name: "",
    title: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    certifications: [],
    customSections: [],
  });

  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "",
    role: "",
    intro: "",
    bio: "",
    photo: "",
    phone: "",
    email: "",
    linkedin: "",
    website: "",
    education: [],
    projects: [],
    skills: [],
    achievements: [],
    certificates: [],
    customSections: [],
  });

  const [template, setTemplate] = useState<TemplateKey>("neo");

  // ✅ Added missing state and refs for Portfolio
  const [portfolioTemplate, setPortfolioTemplate] = useState("modern");
  const printRef = useRef<HTMLDivElement>(null);
  const portfolioPrintRef = useRef<HTMLDivElement>(null);

  // Removed unused handlePrint

  const handlePortfolioPrint = useReactToPrint({
    content: () => portfolioPrintRef.current,
    documentTitle: `${portfolio.name || "portfolio"}`,
  });

  // ---------------- SIDEBAR ----------------
  const Sidebar = () => (
    <div className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col space-y-4">
      {[
        { id: "home", label: "🏠 Home" },
        { id: "resume", label: "📄 Resume Builder" },
        { id: "templates", label: "🎨 Templates" },
        { id: "portfolio", label: "💼 Portfolio" },
        { id: "custom", label: "⚙️ Custom" },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setPage(item.id as any)}
          className={`text-left px-3 py-2 rounded-lg font-medium transition ${
            page === item.id
              ? "bg-purple-100 text-purple-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  // ---------------- SEARCH HANDLER ----------------
  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term.includes("resume")) setPage("resume");
    else if (term.includes("template")) setPage("templates");
    else if (term.includes("portfolio")) setPage("portfolio");
    else if (term.includes("custom")) setPage("custom");
    else
      alert(
        "⚠️ No matching section found. Try typing 'resume', 'portfolio', 'template', or 'custom'."
      );
  };

  // ---------------- HOME PAGE ----------------
  if (page === "home") {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white text-center px-4">
      {/* 🔹 Top Title */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6 drop-shadow-sm">
        AI Resume & Portfolio Builder
      </h1>

      {/* 🔹 Subtitle */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        What will you build today?
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        Create resumes, explore templates, and design portfolios with ease.
      </p>

      {/* 🔹 Search Bar */}
      <div className="relative mb-8 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search templates or resumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border-2 border-purple-600 focus:ring-2 focus:ring-purple-400 rounded-full px-6 py-3 w-full text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
        >
          Search
        </button>
      </div>

      {/* 🔹 Navigation Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Resume", id: "resume", emoji: "📄" },
          { label: "Templates", id: "templates", emoji: "🎨" },
          { label: "Portfolio", id: "portfolio", emoji: "💼" },
          { label: "Custom", id: "custom", emoji: "⚙️" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as any)}
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-8 text-lg font-medium text-gray-700 hover:text-purple-700"
          >
            <span className="text-4xl mb-3">{item.emoji}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}


  // ---------------- RESUME BUILDER ----------------
  if (page === "resume") {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto relative">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Resume Builder
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TemplatePicker value={template} onChange={setTemplate} />

              <AIToolbox
                resume={resume}
                onApply={(r: TailorResponse) =>
                  setResume((prev: Resume) => ({
                    ...prev,
                    summary: r.profileSummary ?? r.summary ?? prev.summary,
                    skills: r.skills?.length ? r.skills : prev.skills,
                    achievements: r.achievements?.length
                      ? r.achievements
                      : prev.achievements,
                    projects: r.projects?.length
                      ? r.projects.map((p) =>
                          typeof p === "string"
                            ? { name: p, description: "" }
                            : {
                                name: p.title || "",
                                description: p.description || "",
                              }
                        )
                      : prev.projects,
                  }))
                }
              />

              <ResumeForm value={resume} onChange={setResume} />
            </div>
          </div>

          <button
            onClick={() => setPage("preview")}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white text-lg shadow-2xl transition-all duration-300 transform bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:scale-105"
          >
            <span className="text-2xl">✨</span>
            Generate Resume
          </button>
        </div>
      </div>
    );
  }

  // ---------------- RESUME PREVIEW ----------------
  if (page === "preview") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-8">
        <button
          onClick={() => setPage("resume")}
          className="text-purple-600 font-semibold hover:underline mb-6"
        >
          ← Back to Resume Builder
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Resume Preview</h2>
        </div>

        <div ref={printRef}>
          <Preview value={resume} template={template} printRef={printRef} />
        </div>
      </div>
    );
  }

  // ---------------- OTHER PAGES ----------------
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        {page === "templates" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Templates</h2>
            <TemplatePicker value={template} onChange={setTemplate} />
          </>
        )}

      {page === "portfolio" && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="space-y-6">
      {/* Template Switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => setPortfolioTemplate("modern")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Modern
        </button>
        <button
          onClick={() => setPortfolioTemplate("minimal")}
          className="px-3 py-1 bg-gray-600 text-white rounded"
        >
          Minimal
        </button>
        <button
          onClick={() => setPortfolioTemplate("dark")}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Dark
        </button>
      </div>

      {/* ✅ AI Toolbox for Portfolio */}
      <AIPortfolioToolbox
        onApply={(updates) => {
          setPortfolio((prev) => ({
            ...prev,
            ...updates,
            // merge without duplicates
            skills: Array.from(
              new Set([...(prev.skills || []), ...((updates.skills as string[]) || [])])
            ),
            achievements: Array.from(
              new Set([...(prev.achievements || []), ...((updates.achievements as string[]) || [])])
            ),
            projects: updates.projects
              ? [...(prev.projects || []), ...updates.projects]
              : prev.projects,
          }));
        }}
      />

      {/* Form to edit portfolio manually */}
      <PortfolioForm value={portfolio} onChange={setPortfolio} />

      {/* Print button */}
      <button
        onClick={handlePortfolioPrint}
        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Print Portfolio
      </button>
    </div>

    {/* Preview area */}
    <div ref={portfolioPrintRef}>
      <PortfolioPreview value={portfolio} template={portfolioTemplate as "modern" | "minimal" | "dark"} />
    </div>
  </div>
)}


        {page === "custom" && (
          <div className="flex flex-col items-center justify-center text-center">
            <CustomBuilder />
          </div>
        )}
      </div>
    </div>
  );
}
