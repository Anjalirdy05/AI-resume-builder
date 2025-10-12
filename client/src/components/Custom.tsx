import React, { useState, useEffect } from "react";

interface CustomSection {
  title: string;
  content: string;
  applyTo: "resume" | "portfolio" | "both";
}

export default function CustomBuilderPage() {
  const [sections, setSections] = useState<CustomSection[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [applyTo, setApplyTo] = useState<"resume" | "portfolio" | "both">("both");

  // Load existing sections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customSections");
    if (saved) setSections(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever updated
  const saveSections = (updated: CustomSection[]) => {
    setSections(updated);
    localStorage.setItem("customSections", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return alert("Please fill out both fields!");
    const newSection = { title, content, applyTo };
    saveSections([...sections, newSection]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    saveSections(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          ⚙️ Custom Section Builder
        </h1>

        {/* Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Section Title (e.g., Awards, Hobbies)"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write section content here..."
            className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-purple-400"
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Apply To
            </label>
            <select
              value={applyTo}
              onChange={(e) => setApplyTo(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="both">Both (Resume & Portfolio)</option>
              <option value="resume">Resume Only</option>
              <option value="portfolio">Portfolio Only</option>
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform"
          >
            ➕ Add Custom Section
          </button>
        </div>

        {/* Saved sections */}
        <h2 className="text-xl font-semibold text-purple-700 mb-2 text-center">
          Saved Sections
        </h2>

        {sections.length === 0 ? (
          <p className="text-gray-500 text-center">No sections added yet.</p>
        ) : (
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <div key={i} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {sec.title}{" "}
                      <span className="text-xs text-gray-500">
                        ({sec.applyTo})
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {sec.content}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500 text-sm"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
