import React from "react";
import type { Portfolio } from "../../App";

export default function PortfolioTemplate2({ value }: { value: Portfolio }) {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="text-center py-8">
        <img
          src={value.photo || "https://via.placeholder.com/160"}
          alt="profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold">{value.name || "Your Name"}</h1>
        <p className="text-gray-600">{value.role || "Your Role"}</p>
      </header>

      {/* Intro + Bio */}
      <section className="px-8 py-6">
        <h3 className="text-xl font-semibold">Intro</h3>
        <p>{value.intro || "Write a short intro here..."}</p>

        <h3 className="text-xl font-semibold mt-4">Bio</h3>
        <p>{value.bio || "Write your detailed bio here..."}</p>
      </section>

      {/* Education */}
      <section className="px-8 py-6">
        <h3 className="text-xl font-semibold">Education</h3>
        {value.education && value.education.length > 0 ? (
          <ul className="list-disc pl-5">
            {value.education.map((ed, idx) => (
              <li key={idx}>
                {ed.schoolOrCollege} – {ed.degree} ({ed.year})
              </li>
            ))}
          </ul>
        ) : (
          <p>No education added.</p>
        )}
      </section>

      {/* Projects */}
      <section className="px-8 py-6">
        <h3 className="text-xl font-semibold">Projects</h3>
        {value.projects && value.projects.length > 0 ? (
          value.projects.map((p, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="font-bold">{p.title}</h4>
              <p>{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No projects added.</p>
        )}
      </section>

      {/* Skills */}
      <section className="px-8 py-6 bg-gray-100">
        <h3 className="text-xl font-semibold">Skills</h3>
        {value.skills && value.skills.length > 0 ? (
          <ul className="flex flex-wrap gap-2 mt-2">
            {value.skills.map((s, idx) => (
              <li key={idx} className="px-3 py-1 bg-gray-200 rounded">
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills added.</p>
        )}
      </section>

      {/* Achievements */}
      <section className="px-8 py-6">
        <h3 className="text-xl font-semibold">Achievements</h3>
        {value.achievements && value.achievements.length > 0 ? (
          <ul className="list-disc pl-5">
            {value.achievements.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements added.</p>
        )}
      </section>
      {/* Certificates Section */}
      {value.certificates && value.certificates.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-black"> Certificates</h2>
          <ul className="list-disc list-inside text-black -100">
            {value.certificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}


      {/* ✅ Custom Sections */}
      {value?.customSections && value.customSections.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-purple-700 border-b pb-1">
            Custom Sections
          </h3>

          <div className="mt-3 space-y-4">
            {value.customSections.map((sec, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-900">{sec.title}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* Contact */}
      <footer className="px-8 py-6 text-center bg-gray-200">
        <h3 className="text-lg font-bold">Contact</h3>
        <p>{value.phone || "Phone not provided"}</p>
        <p>{value.email || "Email not provided"}</p>
        <p>{value.linkedin || "LinkedIn not provided"}</p>
        <p>{value.website || "Website not provided"}</p>
      </footer>
    </div>
  );
}
