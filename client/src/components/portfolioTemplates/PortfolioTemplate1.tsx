import React from "react";
import type { Portfolio } from "../../App";

export default function PortfolioTemplate1({ value }: { value: Portfolio }) {
  return (
    <div className="min-h-screen bg-blue-700 text-white font-sans">
      {/* Top bar */}
      <header className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold">{value.name || "Your Name"}</h1>
        <nav className="flex gap-6 text-sm">
          <a href="#about" className="opacity-90 hover:opacity-100">
            Intro
          </a>
          <a href="#projects" className="opacity-90 hover:opacity-100">
            Projects
          </a>
          <a href="#skills" className="opacity-90 hover:opacity-100">
            Skills
          </a>
          <a href="#achievements" className="opacity-90 hover:opacity-100">
            Achievements
          </a>
          <a href="#contact" className="opacity-90 hover:opacity-100">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-12 px-6">
        <img
          src={value.photo || "https://via.placeholder.com/160"}
          alt="profile"
          className="w-40 h-40 rounded-full border-4 border-white mb-6 object-cover"
        />
        <h2 className="text-3xl font-extrabold">{value.role || "Your Role"}</h2>

        {/* ✅ Intro */}
        <p className="mt-2 max-w-2xl text-lg opacity-95">
          {value.intro || "Your intro goes here..."}
        </p>
      </section>

      {/* About (Bio) */}
      <section id="about" className="bg-white text-slate-900 px-12 py-10">
        <h3 className="text-xl font-bold mb-3">About Me</h3>
        <p className="leading-relaxed">
          {value.bio || "Write your detailed bio here..."}
        </p>
      </section>

      {/* Education */}
      <section id="education" className="px-12 py-10 bg-white text-slate-900">
        <h3 className="text-xl font-bold mb-4">Education</h3>
        {value.education && value.education.length > 0 ? (
          <ul className="space-y-3">
            {value.education.map((ed, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="font-semibold">{ed.schoolOrCollege}</p>
                <p className="text-sm">
                  {ed.degree} ({ed.year})
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="opacity-80">Add your education details.</p>
        )}
      </section>

      {/* Projects */}
      <section id="projects" className="px-12 py-10">
        <h3 className="text-xl font-bold mb-4">Projects</h3>
        {value.projects && value.projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {value.projects.map((p, idx) => (
              <article
                key={idx}
                className="bg-white text-slate-900 p-5 rounded shadow"
              >
                <h4 className="font-semibold text-lg">{p.title}</h4>
                <p className="mt-1 text-sm">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-700 underline"
                  >
                    View Project
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="opacity-90">Add some projects to showcase your work.</p>
        )}
      </section>

      {/* Skills */}
      <section id="skills" className="bg-blue-800/30 px-12 py-10">
        <h3 className="text-xl font-bold mb-4">Skills</h3>
        {value.skills && value.skills.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {value.skills.map((s, idx) => (
              <li
                key={idx}
                className="px-3 py-1 bg-white/15 rounded border border-white/20"
              >
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="opacity-90">List your core skills here.</p>
        )}
      </section>

      {/* Achievements */}
      <section id="achievements" className="px-12 py-10">
        <h3 className="text-xl font-bold mb-4">Achievements</h3>
        {value.achievements && value.achievements.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {value.achievements.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        ) : (
          <p className="opacity-90">
            Highlight awards, recognitions, and milestones.
          </p>
        )}
      </section>
      {/* Certificates Section */}
      {value.certificates && value.certificates.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-white">Certificates</h2>
          <ul className="list-disc list-inside text-gray-100">
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
                <p className="font-semibold text-white -900">{sec.title}</p>
                <p className="text-sm text-white -700 whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Contact */}
      <footer id="contact" className="bg-blue-900 px-12 py-8 text-center">
        <h3 className="text-lg font-bold mb-2">Contact</h3>
        <p>Email: {value.email || "you@example.com"}</p>
        <p>LinkedIn: {value.linkedin || "linkedin.com/in/yourname"}</p>
      </footer>
    </div>
  );
}
