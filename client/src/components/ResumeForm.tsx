import React from "react";
import type { Resume } from "../api";
import {
  User,
  Upload,
  BookOpen,
  Briefcase,
  FileText,
  Award,
  Layers,
} from "lucide-react";

export default function ResumeForm({
  value,
  onChange,
}: {
  value: Resume;
  onChange: (r: Resume) => void;
}) {
  // ---------------- Helper ----------------
  const updateArray = (
    field: keyof Resume,
    index: number,
    key: string,
    newValue: string | string[]
  ) => {
    const arr = [...(((value as any)[field] as any[]) || [])];
    arr[index] = { ...(arr[index] || {}), [key]: newValue };
    onChange({ ...(value as any), [field]: arr } as Resume);
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should not exceed 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...value, photoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // Generate button state
  const [loading, setLoading] = React.useState(false);

  const handleGenerateResume = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Replace this with your real generation logic (API call, preview render, etc.)
      await new Promise((res) => setTimeout(res, 1300));
      // Example: after generation, you might navigate to preview or trigger a download
      alert("✨ Resume generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* main content - extra bottom padding so floating button doesn't overlap */}
      <div className="space-y-8 pb-40">
        {/* ---------------- Profile & Personal Info ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
            <User className="w-5 h-5 mr-2 text-purple-600" /> Personal Information
          </h3>

          <div className="flex items-center gap-6 mb-4">
            {value.photoDataUrl ? (
              <img
                src={value.photoDataUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-600"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-3xl">
                <User size={28} />
              </div>
            )}

            <label className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2">
              <Upload size={16} /> Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500">
              Add a professional photo. Max size: 2MB
            </span>
          </div>

          {/* Personal Information Inputs */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />

            {/* Role / Job Title beside name */}
            <input
              type="text"
              placeholder="Role / Job Title"
              value={value.title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />

            <input
              type="email"
              placeholder="Email"
              value={value.email}
              onChange={(e) => onChange({ ...value, email: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />

            <input
              type="text"
              placeholder="Phone"
              value={value.phone}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />

            <input
              type="text"
              placeholder="Location"
              value={value.location}
              onChange={(e) => onChange({ ...value, location: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />

            <input
              type="text"
              placeholder="LinkedIn URL"
              value={value.linkedin}
              onChange={(e) => onChange({ ...value, linkedin: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* ---------------- Professional Summary ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800">
            <FileText className="w-5 h-5 mr-2 text-purple-600" /> Professional
            Summary
          </h3>
          <textarea
            placeholder="Write a short summary..."
            value={value.summary}
            onChange={(e) => onChange({ ...value, summary: e.target.value })}
            className="w-full border p-3 rounded h-24"
          />
        </div>

        {/* ---------------- Education ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
            <BookOpen className="w-5 h-5 mr-2 text-purple-600" /> Education
          </h3>

          {value.education?.map((ed, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 gap-3 mb-2 border p-3 rounded relative"
            >
              <button
                type="button"
                onClick={() => {
                  const updated = (value.education || []).filter((_, i) => i !== idx);
                  onChange({ ...value, education: updated });
                }}
                className="absolute top-2 right-2 text-red-600 text-xs font-semibold hover:text-red-800"
                aria-label={`Remove education ${idx + 1}`}
              >
                ✕ Remove
              </button>

              <input
                type="text"
                placeholder="School"
                value={ed.school}
                onChange={(e) => updateArray("education", idx, "school", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) => updateArray("education", idx, "degree", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Year"
                value={ed.year}
                onChange={(e) => updateArray("education", idx, "year", e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                education: [...(value.education || []), { school: "", degree: "", year: "" }],
              })
            }
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            + Add Education
          </button>
        </div>

        {/* ---------------- Experience ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
            <Briefcase className="w-5 h-5 mr-2 text-purple-600" /> Experience
          </h3>

          {value.experience?.map((ex, idx) => (
            <div key={idx} className="space-y-2 mb-3 border p-3 rounded relative">
              <button
                type="button"
                onClick={() => {
                  const updated = (value.experience || []).filter((_, i) => i !== idx);
                  onChange({ ...value, experience: updated });
                }}
                className="absolute top-2 right-2 text-red-600 text-xs font-semibold hover:text-red-800"
                aria-label={`Remove experience ${idx + 1}`}
              >
                ✕ Remove
              </button>

              <input
                type="text"
                placeholder="Role"
                value={ex.role}
                onChange={(e) => updateArray("experience", idx, "role", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Company"
                value={ex.company}
                onChange={(e) => updateArray("experience", idx, "company", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Period"
                value={ex.period}
                onChange={(e) => updateArray("experience", idx, "period", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Highlights (comma separated)"
                value={(ex.highlights || []).join(", ")}
                onChange={(e) => {
                  const items = e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  updateArray("experience", idx, "highlights", items);
                }}
                className="border p-2 rounded w-full h-20"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                experience: [...(value.experience || []), { role: "", company: "", period: "", highlights: [] }],
              })
            }
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            + Add Experience
          </button>
        </div>

        {/* ---------------- Projects ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
            <Layers className="w-5 h-5 mr-2 text-purple-600" /> Projects
          </h3>

          {value.projects?.map((p, idx) => (
            <div key={idx} className="space-y-2 mb-3 border p-3 rounded relative">
              <button
                type="button"
                onClick={() => {
                  const updated = (value.projects || []).filter((_, i) => i !== idx);
                  onChange({ ...value, projects: updated });
                }}
                className="absolute top-2 right-2 text-red-600 text-xs font-semibold hover:text-red-800"
                aria-label={`Remove project ${idx + 1}`}
              >
                ✕ Remove
              </button>

              <input
                type="text"
                placeholder="Project Title"
                value={p.name}
                onChange={(e) => updateArray("projects", idx, "name", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Project Description"
                value={p.description}
                onChange={(e) => updateArray("projects", idx, "description", e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Project Link (optional)"
                value={p.link || ""}
                onChange={(e) => updateArray("projects", idx, "link", e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                projects: [...(value.projects || []), { name: "", description: "", link: "" }],
              })
            }
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            + Add Project
          </button>
        </div>

        {/* ---------------- Skills ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800">
            🛠 Skills
          </h3>
          <textarea
            placeholder="Enter skills (comma separated)"
            value={value.skills?.join(", ") || ""}
            onChange={(e) =>
              onChange({
                ...value,
                skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            className="w-full border p-3 rounded"
          />
        </div>

        {/* ---------------- Certifications ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800">
            <Award className="w-5 h-5 mr-2 text-purple-600" /> Certifications
          </h3>
          <textarea
            placeholder="Enter certifications (comma separated)"
            value={value.certifications?.join(", ") || ""}
            onChange={(e) =>
              onChange({
                ...value,
                certifications: e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
              })
            }
            className="w-full border p-3 rounded"
          />
        </div>

        {/* ---------------- Achievements ---------------- */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800">
            🌟 Achievements
          </h3>
          <textarea
            placeholder="Enter achievements (comma separated)"
            value={value.achievements?.join(", ") || ""}
            onChange={(e) =>
              onChange({
                ...value,
                achievements: e.target.value.split(",").map((a) => a.trim()).filter(Boolean),
              })
            }
            className="w-full border p-3 rounded"
          />
        </div>
      </div>

      {/* ---------------- Floating Generate Resume Button (bottom-right) ---------------- */}
      <button
        type="button"
        onClick={handleGenerateResume}
        disabled={loading}
        aria-busy={loading}
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white text-lg shadow-2xl transition-all duration-300 transform ${
          loading
            ? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-wait opacity-95 scale-100"
            : "bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:scale-105"
        }`}
      >
        {/* sparkle (not star) */}
        {!loading ? (
          <span className="text-2xl animate-[spin_4s_linear_infinite]">✨</span>
        ) : (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}

        <span>{loading ? "Generating…" : "Generate Resume"}</span>
      </button>
    </>
  );
}
