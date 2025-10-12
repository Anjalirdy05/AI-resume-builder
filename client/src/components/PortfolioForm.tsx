import React from "react";
import type { Portfolio } from "../App";

type Props = {
  value: Portfolio;
  onChange: (value: Portfolio) => void;
};

export default function PortfolioForm({ value, onChange }: Props) {
  // Handle updates for any field
  const handleChange = (field: keyof Portfolio, newValue: any) => {
    onChange({ ...value, [field]: newValue });
  };

  // Add new Education entry
  const addEducation = () => {
    handleChange("education", [
      ...(value.education || []),
      { schoolOrCollege: "", degree: "", year: "" },
    ]);
  };

  // Add new Project entry
  const addProject = () => {
    handleChange("projects", [
      ...(value.projects || []),
      { title: "", description: "", link: "" },
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Portfolio Editor
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={value.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Role/Title"
          value={value.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={value.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={value.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="LinkedIn"
          value={value.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Website (optional)"
          value={value.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      {/* Photo Upload */}
      <div className="mt-4">
        <label className="font-semibold text-sm text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => handleChange("photo", reader.result);
              reader.readAsDataURL(file);
            }
          }}
          className="mt-1 block"
        />
      </div>

      {/* Intro + Bio in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          className="border p-2 rounded"
          placeholder="Intro"
          value={value.intro}
          onChange={(e) => handleChange("intro", e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Bio (3-4 lines recommended)"
          rows={4}
          value={value.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
      </div>

      {/* Skills */}
      <div className="mt-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Skills (comma separated)"
          value={(value.skills || []).join(", ")}
          onChange={(e) =>
            handleChange(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
        />
      </div>

      {/* Achievements */}
      <div className="mt-4">
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Achievements (one per line)"
          value={(value.achievements || []).join("\n")}
          onChange={(e) =>
            handleChange(
              "achievements",
              e.target.value.split("\n").map((a) => a.trim())
            )
          }
        />
      </div>

      {/* Education Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Education</h3>
        {(value.education || []).map((edu, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 mb-2">
            <input
              className="border p-2 rounded"
              placeholder="School/College"
              value={edu.schoolOrCollege}
              onChange={(e) => {
                const updated = [...value.education];
                updated[i].schoolOrCollege = e.target.value;
                handleChange("education", updated);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const updated = [...value.education];
                updated[i].degree = e.target.value;
                handleChange("education", updated);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const updated = [...value.education];
                updated[i].year = e.target.value;
                handleChange("education", updated);
              }}
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="mt-2 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
        >
          + Add Education
        </button>
      </div>

      {/* Projects Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Projects</h3>
        {(value.projects || []).map((proj, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 mb-2">
            <input
              className="border p-2 rounded"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updated = [...(value.projects || [])];
                updated[i].title = e.target.value;
                handleChange("projects", updated);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="Description"
              value={proj.description}
              onChange={(e) => {
                const updated = [...(value.projects || [])];
                updated[i].description = e.target.value;
                handleChange("projects", updated);
              }}
            />
            <input
              className="border p-2 rounded"
              placeholder="Link (optional)"
              value={proj.link || ""}
              onChange={(e) => {
                const updated = [...(value.projects || [])];
                updated[i].link = e.target.value;
                handleChange("projects", updated);
              }}
            />
          </div>
        ))}
        <button
          onClick={addProject}
          className="mt-2 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
        >
          + Add Project
        </button>
      </div>

      {/* ✅ Certificates Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Certificates</h3>
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Enter your certificates (one per line)"
          value={(value.certificates || []).join("\n")}
          onChange={(e) =>
            handleChange(
              "certificates",
              e.target.value.split("\n").map((c) => c.trim())
            )
          }
        />
      </div>
    </div>
  );
}
