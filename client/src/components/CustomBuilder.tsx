import React, { useState, useEffect } from "react";

type CustomSection = {
  title: string;
  content: string;
  applyTo: "resume" | "portfolio" | "both";
};

export default function CustomBuilderPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [applyTo, setApplyTo] = useState<"resume" | "portfolio" | "both">("both");
  const [sections, setSections] = useState<CustomSection[]>([]);

  // ✅ Load saved sections on mount
  useEffect(() => {
    const saved = localStorage.getItem("customSections");
    if (saved) {
      try {
        setSections(JSON.parse(saved));
      } catch {
        console.error("Error reading saved sections");
      }
    }
  }, []);

  // ✅ Save new section
  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("⚠️ Please fill in all fields before saving!");
      return;
    }

    const newSection: CustomSection = { title, content, applyTo };
    const updated = [...sections, newSection];
    setSections(updated);
    localStorage.setItem("customSections", JSON.stringify(updated));

    setTitle("");
    setContent("");
    setApplyTo("both");
    alert("✅ Custom section saved successfully!");
  };

  // 🗑️ Delete a section by index
  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this section?")) {
      const updated = sections.filter((_, i) => i !== index);
      setSections(updated);
      localStorage.setItem("customSections", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white py-10">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <span className="bg-purple-100 text-purple-600 p-2 rounded-full text-2xl">
            ⚙️
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Custom Builder</h1>
        <p className="text-gray-500 mt-1">
          Here you can design custom sections for your portfolio or resume.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-lg border border-gray-100">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Custom Section Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Custom Section Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1">
              Apply To
            </label>
            <select
              value={applyTo}
              onChange={(e) =>
                setApplyTo(e.target.value as "resume" | "portfolio" | "both")
              }
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
              <option value="resume">Resume Only 🧾</option>
              <option value="portfolio">Portfolio Only 💼</option>
              <option value="both">Both 🔄</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-all"
          >
            Save Section
          </button>
        </div>
      </div>

      {/* Saved Sections */}
      {sections.length > 0 && (
        <div className="mt-10 w-[90%] max-w-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Saved Custom Sections
          </h2>
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-md bg-gray-50 hover:shadow-sm transition relative"
              >
                {/* Delete Button (Top Right Corner) */}
                <button
                  onClick={() => handleDelete(i)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                  title="Delete Section"
                >
                  🗑️
                </button>

                <h3 className="font-semibold text-purple-700">{sec.title}</h3>
                <p className="text-gray-700 whitespace-pre-line mt-1">
                  {sec.content}
                </p>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Applies To:{" "}
                  <span className="capitalize text-gray-500">{sec.applyTo}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
