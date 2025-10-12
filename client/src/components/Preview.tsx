import React, { useEffect, useState } from "react";
import { Resume } from "../api";
import "../styles/preview.css";
import { Sparkles, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export default function Preview({
  value,
  template,
  printRef,
}: {
  value: Resume;
  template:
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
  printRef: React.RefObject<HTMLDivElement>;
}) {
  // ✅ Custom sections loaded from localStorage
  const [savedSections, setSavedSections] = useState<
    { title: string; content: string; applyTo: string }[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("customSections");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const resumeSections = parsed.filter(
          (s: any) => s.applyTo === "resume" || s.applyTo === "both"
        );
        setSavedSections(resumeSections);
      } catch (e) {
        console.error("Failed to load saved custom sections", e);
      }
    }
  }, []);

  // ✅ Demo data fallback
  const demoData: Resume = {
    name: "YOUR NAME",
    title: "Front-End Developer",
    email: "youremail@example.com",
    phone: "+91 9876543210",
    location: "Hyderabad, India",
    linkedin: "linkedin.com/in/yourprofile",
    summary:
      "Enthusiastic web developer skilled in React, TailwindCSS, and modern web technologies. Passionate about creating clean, user-friendly interfaces.",
    education: [
      {
        school: "ABC Institute of Technology",
        degree: "B.Tech in Computer Science",
        year: "2024",
      },
    ],
    experience: [
      {
        role: "Web Developer Intern",
        company: "XYZ Solutions",
        period: "Jan 2024 – May 2024",
        highlights: [
          "Built responsive React UIs",
          "Integrated REST APIs for dynamic data",
          "Improved app performance by 20%",
        ],
      },
    ],
    projects: [
      {
        name: "AI Resume Builder",
        description: "An AI-powered platform for creating professional resumes",
        link: "https://example.com",
      },
    ],
    skills: ["React", "Tailwind CSS", "JavaScript", "Node.js", "Git"],
    achievements: ["Completed AICTE Web Development Certification"],
    certifications: ["Frontend Developer – Edunet Foundation"],
    customSections: [
      { title: "Interests", content: "AI Tools, UI Design, Open Source" },
    ],
  };

  const resumeData =
    value && Object.keys(value).length > 0 ? value : demoData;

  // ✅ Merge local custom sections with resume's custom sections
  const allCustomSections = [
    ...(resumeData.customSections || []),
    ...savedSections,
  ];

  // ✅ Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: resumeData.name
      ? `${resumeData.name}_Resume`
      : "AI_Resume_Builder_Resume",
    pageStyle: `
      @page { size: A4; margin: 15mm; }
      body { background: white; -webkit-print-color-adjust: exact; }
    `,
  });

  return (
    <div className="relative bg-white rounded-xl shadow p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <span className="text-xs text-slate-500">
          Template: {template.toUpperCase()}
        </span>
      </div>

      {/* 🪄 Print Resume Button */}
      <button
        onClick={handlePrint}
        className="absolute top-3 right-3 flex items-center gap-2 px-5 py-2.5
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   text-white font-semibold rounded-full shadow-lg
                   hover:shadow-2xl hover:scale-105 transition-all duration-300
                   focus:outline-none focus:ring-4 focus:ring-purple-300
                   animate-glow z-50 print:hidden"
      >
        <Sparkles size={18} className="text-white" />
        <span>Print Resume</span>
      </button>

      {/* Resume Preview */}
      <div
        ref={printRef}
        className="print-area p-6 border rounded bg-white text-slate-900"
      >
        {template === "neo" && <Neo value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "classic" && <Classic value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "minimal" && <Minimal value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "professional" && <Professional value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "elegant" && <Elegant value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "creative" && <Creative value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "minimalist" && <Minimalist value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "corporate" && <Corporate value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "modern" && <Modern value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "boldheader" && <BoldHeader value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "twotone" && <TwoTone value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "portfolio" && <Portfolio value={{ ...resumeData, customSections: allCustomSections }} />}
        {template === "blueMinimalist" && <BlueMinimalist value={{ ...resumeData, customSections: allCustomSections }} />}
      </div>
    </div>
  );
}

/* ---------- Common Section ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <h3 className="uppercase font-semibold text-purple-700 border-b border-slate-300 pb-1">
        {title}
      </h3>
      <div className="mt-1 text-sm">{children}</div>
    </section>
  );
}

/* ---------- Contact Row ---------- */
function ContactRow({ value }: { value: Resume }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600 text-sm">
      {value.location && (
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {value.location}
        </span>
      )}
      {value.phone && (
        <span className="flex items-center gap-1">
          <Phone size={14} /> {value.phone}
        </span>
      )}
      {value.email && (
        <span className="flex items-center gap-1">
          <Mail size={14} /> {value.email}
        </span>
      )}
      {value.linkedin && (
        <span className="flex items-center gap-1">
          <Linkedin size={14} /> {value.linkedin}
        </span>
      )}
    </div>
  );
}

/* ---------- Ordered Content ---------- */
function OrderedContent({ value }: { value: Resume }) {
  return (
    <>
      {value.summary && <Section title="Summary">{value.summary}</Section>}

      {!!(value.education && value.education.length) && (
        <Section title="Education">
          <ul className="list-disc ml-6">
            {value.education.map((ed, i) => (
              <li key={i}>
                {ed.school} — {ed.degree} ({ed.year})
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!!(value.experience && value.experience.length) && (
        <Section title="Experience">
          {value.experience.map((e, i) => (
            <div key={i} className="mt-2">
              <p className="font-medium">
                {e.role} • {e.company} ({e.period})
              </p>
              <ul className="list-disc ml-6">
                {e.highlights?.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {!!(value.projects && value.projects.length) && (
        <Section title="Projects">
          <ul className="list-disc ml-6">
            {value.projects.map((p, i) => (
              <li key={i}>
                <span className="font-medium">{p.name}</span>: {p.description}{" "}
                {p.link && (
                  <a className="text-blue-600 underline" href={p.link}>
                    {p.link}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!!(value.skills && value.skills.length) && (
        <Section title="Skills">{value.skills.join(", ")}</Section>
      )}

      {!!(value.achievements && value.achievements.length) && (
        <Section title="Achievements">
          <ul className="list-disc ml-6">
            {value.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      {!!(value.certifications && value.certifications.length) && (
        <Section title="Certifications">
          <ul className="list-disc ml-6">
            {value.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ✅ Show Custom Sections (from localStorage + resumeData) */}
      {!!(value.customSections && value.customSections.length) && (
        <Section title="Custom Sections">
          <div className="space-y-3">
            {(value.customSections || []).map((c, i) => (
              <div key={i}>
                <p className="font-semibold">{c.title}</p>
                <p className="whitespace-pre-line">{c.content}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

/* ✅ Keep all template functions (Neo, Classic, Professional, etc.) exactly as in your original file */
/* ---------------- TEMPLATES ---------------- */

/* ---------- NEO (clean executive style) ---------- */
function Neo({ value }: { value: Resume }) {
  return (
    <div className="mx-auto max-w-[760px] text-[13px] leading-relaxed text-slate-800">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-wide text-purple-800 uppercase">
          {value.name || "YOUR NAME"}
        </h1>

        {/* Contact row */}
        <div className="mt-1 text-[12px] text-slate-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {value.location && <span>{value.location}</span>}
          {value.phone && <span>{value.phone}</span>}
          {value.email && <span>{value.email}</span>}
          {value.linkedin && <span>{value.linkedin}</span>}
        </div>

        <div className="mt-3 h-px bg-slate-300" />
      </header>

      {/* Summary */}
      {value.summary && (
        <NeoSection title="Summary">
          <p className="text-[13px]">{value.summary}</p>
        </NeoSection>
      )}

      {/* Experience */}
      {!!(value.experience && value.experience.length) && (
        <NeoSection title="Work Experience">
          <div className="space-y-4">
            {(value.experience || []).map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-[13.5px]">
                    {e.role}
                    {e.company ? (
                      <>
                        {", "}
                        <span className="font-normal text-slate-700">
                          {e.company}
                        </span>
                      </>
                    ) : null}
                  </p>
                  {e.period && (
                    <p className="text-[12px] text-slate-600 whitespace-nowrap">
                      {e.period}
                    </p>
                  )}
                </div>

                {!!(e.highlights && e.highlights.length) && (
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    {(e.highlights || []).map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </NeoSection>
      )}

      {/* Education */}
      {!!(value.education && value.education.length) && (
        <NeoSection title="Education">
          <div className="space-y-3">
            {(value.education || []).map((ed, i) => (
              <div
                key={i}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <p className="font-semibold text-[13.5px]">{ed.degree}</p>
                  <p className="text-[12.5px] text-slate-700">{ed.school}</p>
                </div>
                {ed.year && (
                  <p className="text-[12px] text-slate-600 whitespace-nowrap">
                    {ed.year}
                  </p>
                )}
              </div>
            ))}
          </div>
        </NeoSection>
      )}

      {/* Projects */}
      {value.projects && value.projects.length > 0 && (
        <NeoSection title="Projects">
          <ul className="list-disc ml-5 space-y-2">
            {(value.projects || []).map((p, i) => (
              <li key={i}>
                <span className="font-semibold">{p.name}</span>
                {p.description ? ` — ${p.description}` : ""}
                {p.link && (
                  <>
                    {" "}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {p.link}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </NeoSection>
      )}

      {/* Additional Information */}
      {((value.skills && value.skills.length) ||
        (value.certifications && value.certifications.length) ||
        (value.achievements && value.achievements.length)) && (
          <NeoSection title="Additional Information">
            <div className="space-y-2">
              {!!(value.skills && value.skills.length) && (
                <NeoKeyVal k="Technical Skills" v={(value.skills || []).join(", ")} />
              )}
              {!!(value.certifications && value.certifications.length) && (
                <NeoKeyVal
                  k="Certifications"
                  v={(value.certifications || []).join(", ")}
                />
              )}
              {!!(value.achievements && value.achievements.length) && (
                <NeoKeyVal
                  k="Achievements"
                  v={(value.achievements || []).join("; ")}
                />
              )}
            </div>
          </NeoSection>
        )}

      {/* Custom sections */}
      {!!(value.customSections && value.customSections.length) && (
        <NeoSection title="Additional Sections">
          <div className="space-y-3">
            {(value.customSections || []).map((c, i) => (
              <div key={i}>
                <p className="font-semibold">{c.title}</p>
                <p className="whitespace-pre-line">{c.content}</p>
              </div>
            ))}
          </div>
        </NeoSection>
      )}
    </div>
  );
}

function NeoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="uppercase text-[12px] font-extrabold tracking-wider text-purple-700">
          {title}
        </h3>
        <div className="h-px bg-slate-300 flex-1" />
      </div>
      <div>{children}</div>
    </section>
  );
}

function NeoKeyVal({ k, v }: { k: string; v: string }) {
  return (
    <p className="text-[13px]">
      <span className="font-semibold">{k}: </span>
      <span className="text-slate-700">{v}</span>
    </p>
  );
}

/* ---------- Classic ---------- */
function Classic({ value }: { value: Resume }) {
  return (
    <div className="template-classic">
      <div className="classic-header flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{value.name}</h1>
          <p>{value.title}</p>
          <ContactRow value={value} />
        </div>
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
      </div>
      <OrderedContent value={value} />
    </div>
  );
}

/* ---------- Minimal ---------- */
function Minimal({ value }: { value: Resume }) {
  return (
    <div className="template-minimal grid grid-cols-[200px,1fr] gap-6">
      <aside className="bg-gray-50 p-4 space-y-4">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        )}
        <ContactRow value={value} />
        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <ul className="list-disc ml-6">
              {(value.skills || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>
        )}
      </aside>
      <main>
        <h1 className="text-xl font-bold">{value.name}</h1>
        <p>{value.title}</p>
        <OrderedContent value={value} />
      </main>
    </div>
  );
}

/* ---------- Professional ---------- */
function Professional({ value }: { value: Resume }) {
  return (
    <div className="template-professional bg-white rounded-xl shadow overflow-hidden">
      {/* HEADER */}
      <div className="bg-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{value.name}</h1>
          {value.title && (
            <p className="text-lg font-medium text-gray-700">{value.title}</p>
          )}
        </div>

        <div className="text-sm text-gray-700 space-y-1 text-right">
          {value.location && (
            <p className="flex items-center justify-end gap-2">
              <MapPin size={14} className="text-gray-500" /> {value.location}
            </p>
          )}
          {value.phone && (
            <p className="flex items-center justify-end gap-2">
              <Phone size={14} className="text-gray-500" /> {value.phone}
            </p>
          )}
          {value.email && (
            <p className="flex items-center justify-end gap-2">
              <Mail size={14} className="text-gray-500" /> {value.email}
            </p>
          )}
          {value.linkedin && (
            <p className="flex items-center justify-end gap-2">
              <Linkedin size={14} className="text-gray-500" /> {value.linkedin}
            </p>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6">
        {value.summary && (
          <Section title="Summary">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(value.skills || []).map((s, i) => (
                <p key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>{" "}
                  {s}
                </p>
              ))}
            </div>
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Work Experience">
            {(value.experience || []).map((e, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold text-gray-800">
                  {e.role} — {e.company} ({e.period})
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            <div className="grid grid-cols-2 gap-4">
              {(value.education || []).map((ed, i) => (
                <div key={i}>
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-sm text-gray-600">
                    {ed.school} ({ed.year})
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-blue-600 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <Section title="Achievements">
            <ul className="list-disc ml-6">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <div className="grid grid-cols-2 gap-4">
              {(value.certifications || []).map((c, i) => (
                <div key={i} className="text-sm text-gray-700">
                  {c}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
} // ✅ Now properly closed before Elegant starts
/* ---------- Elegant ---------- */
function Elegant({ value }: { value: Resume }) {
  return (
    <div className="template-elegant">
      <div className="flex items-center gap-4 bg-blue-100 text-black p-4 rounded-t">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{value.name}</h1>
          <p>{value.title}</p>
          <ContactRow value={value} />
        </div>
      </div>
      <div className="p-6">
        <OrderedContent value={value} />
      </div>
    </div>
  );
}


/* ---------- Creative ---------- */
function Creative({ value }: { value: Resume }) {
  return (
    <div className="template-creative-clean bg-white rounded-xl shadow p-8">
      <div className="text-center border-b border-gray-300 pb-4 mb-6 relative">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full object-cover border"
          />
        )}

        <h1 className="text-3xl font-extrabold text-gray-900 uppercase">
          {value.name}
        </h1>
        {value.title && (
          <p className="text-lg font-medium text-gray-700">{value.title}</p>
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-2 text-sm text-gray-600">
          {value.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {value.location}
            </span>
          )}
          {value.phone && (
            <span className="flex items-center gap-1">
              <Phone size={14} /> {value.phone}
            </span>
          )}
          {value.email && (
            <span className="flex items-center gap-1">
              <Mail size={14} /> {value.email}
            </span>
          )}
          {value.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin size={14} /> {value.linkedin}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-800">
        {value.summary && (
          <Section title="Summary">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            {value.education.map((ed, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ed.degree}</p>
                <p className="text-sm text-gray-600">
                  {ed.school} ({ed.year})
                </p>
              </div>
            ))}
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Professional Experience">
            {value.experience.map((e, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold text-gray-900">
                  {e.role} — {e.company}
                </p>
                <p className="text-xs text-gray-600">{e.period}</p>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-blue-600 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(value.skills || []).map((s, i) => (
                <p key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>{" "}
                  {s}
                </p>
              ))}
            </div>
          </Section>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <Section title="Achievements">
            <ul className="list-disc ml-6">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <ul className="list-disc ml-6">
              {(value.certifications || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------- Minimalist ---------- */
function Minimalist({ value }: { value: Resume }) {
  return (
    <div className="template-minimalist">
      <div className="flex items-center gap-4 border-b pb-4 mb-4">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">{value.name}</h1>
          <p>{value.title}</p>
          <ContactRow value={value} />
        </div>
      </div>
      <OrderedContent value={value} />
    </div>
  );
}

/* ---------- Corporate ---------- */
function Corporate({ value }: { value: Resume }) {
  return (
    <div className="template-corporate relative bg-white rounded-xl shadow overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-3 bg-blue-900"></div>

      <div className="flex justify-between items-center border-b pb-4 mb-6 pl-6 pr-6 pt-6">
        <div className="flex items-center gap-4">
          {value.photoDataUrl && (
            <img
              src={value.photoDataUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-900"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{value.name}</h1>
            {value.title && (
              <p className="text-lg font-medium text-gray-700">{value.title}</p>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1 text-right">
          {value.location && (
            <p className="flex items-center justify-end gap-2">
              <MapPin size={14} className="text-blue-900" /> {value.location}
            </p>
          )}
          {value.phone && (
            <p className="flex items-center justify-end gap-2">
              <Phone size={14} className="text-blue-900" /> {value.phone}
            </p>
          )}
          {value.email && (
            <p className="flex items-center justify-end gap-2">
              <Mail size={14} className="text-blue-900" /> {value.email}
            </p>
          )}
          {value.linkedin && (
            <p className="flex items-center justify-end gap-2">
              <Linkedin size={14} className="text-blue-900" /> {value.linkedin}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {value.summary && (
          <Section title="About Me">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            <ul className="list-disc ml-6">
              {(value.education || []).map((ed, i) => (
                <li key={i}>
                  <strong>{ed.degree}</strong>, {ed.school} ({ed.year})
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Work Experience">
            {(value.experience || []).map((e, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium text-gray-800">
                  {e.role} — {e.company} ({e.period})
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-blue-600 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(value.skills || []).map((s, i) => (
                <span key={i} className="block">
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <Section title="Achievements">
            <ul className="list-disc ml-6">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <ul className="list-disc ml-6">
              {(value.certifications || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------- Modern ---------- */
function Modern({ value }: { value: Resume }) {
  return (
    <div className="border-l-4 border-blue-600 pl-4">
      <h1 className="text-xl font-bold">{value.name}</h1>
      <p>{value.title}</p>
      <ContactRow value={value} />
      <OrderedContent value={value} />
    </div>
  );
}

/* ---------- Bold Header ---------- */
function BoldHeader({ value }: { value: Resume }) {
  return (
    <div className="template-boldheader border rounded-xl shadow bg-white p-8">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-4">
          {value.photoDataUrl && (
            <img
              src={value.photoDataUrl}
              alt="Profile"
              className="w-20 h-20 rounded-md object-cover border"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{value.name}</h1>
            {value.title && (
              <p className="text-lg font-medium text-gray-700">{value.title}</p>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1 text-right">
          {value.location && (
            <p className="flex items-center justify-end gap-2">
              <MapPin size={14} /> {value.location}
            </p>
          )}
          {value.phone && (
            <p className="flex items-center justify-end gap-2">
              <Phone size={14} /> {value.phone}
            </p>
          )}
          {value.email && (
            <p className="flex items-center justify-end gap-2">
              <Mail size={14} /> {value.email}
            </p>
          )}
          {value.linkedin && (
            <p className="flex items-center justify-end gap-2">
              <Linkedin size={14} /> {value.linkedin}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {value.summary && (
          <Section title="Profile">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            <ul>
              {(value.education || []).map((ed, i) => (
                <li key={i}>
                  <strong>{ed.degree}</strong>, {ed.school} ({ed.year})
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Work Experience">
            {(value.experience || []).map((e, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium">
                  {e.role} — {e.company} ({e.period})
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-blue-600 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {(value.skills || []).map((s, i) => (
                <span key={i} className="block">
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <Section title="Achievements">
            <ul className="list-disc ml-6">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <ul className="list-disc ml-6">
              {(value.certifications || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------- TwoTone ---------- */
function TwoTone({ value }: { value: Resume }) {
  return (
    <div className="template-twotone border rounded-xl shadow bg-white p-8">
      <div className="flex items-center border-b pb-4 mb-6">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-24 h-24 rounded-md object-cover border"
          />
        )}
        <div className="flex-1 ml-6">
          <h1 className="text-3xl font-bold text-gray-900">{value.name}</h1>
          {value.title && (
            <p className="text-lg font-medium text-gray-700">{value.title}</p>
          )}
          <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-600">
            {value.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {value.location}
              </span>
            )}
            {value.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} /> {value.phone}
              </span>
            )}
            {value.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} /> {value.email}
              </span>
            )}
            {value.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin size={14} /> {value.linkedin}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          {value.summary && (
            <Section title="Profile">
              <p>{value.summary}</p>
            </Section>
          )}

          {!!(value.education && value.education.length) && (
            <Section title="Education">
              <ul className="space-y-2">
                {(value.education || []).map((ed, i) => (
                  <li key={i}>
                    <strong>{ed.school}</strong> — {ed.degree} ({ed.year})
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {!!(value.skills && value.skills.length) && (
            <Section title="Skills">
              <ul className="list-disc ml-6">
                {(value.skills || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          )}

          {value.projects &&
            value.projects.some(
              (p) =>
                (p.name && p.name.trim() !== "") ||
                (p.description && p.description.trim() !== "") ||
                (p.link && p.link.trim() !== "")
            ) && (
              <Section title="Projects">
                <ul className="list-disc ml-6">
                  {(value.projects || [])
                    .filter(
                      (p) =>
                        (p.name && p.name.trim() !== "") ||
                        (p.description && p.description.trim() !== "") ||
                        (p.link && p.link.trim() !== "")
                    )
                    .map((p, i) => (
                      <li key={i}>
                        {p.name && <span className="font-medium">{p.name}</span>}
                        {p.description && <>: {p.description}</>}
                        {p.link && (
                          <a
                            className="text-blue-600 underline ml-2"
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {p.link}
                          </a>
                        )}
                      </li>
                    ))}
                </ul>
              </Section>
            )}

          {!!(value.achievements && value.achievements.length) && (
            <Section title="Achievements">
              <ul className="list-disc ml-6">
                {(value.achievements || []).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Right */}
        <div>
          {!!(value.experience && value.experience.length) && (
            <Section title="Work Experience">
              {(value.experience || []).map((e, i) => (
                <div key={i} className="mb-3">
                  <p className="font-medium">
                    {e.role} · {e.company} ({e.period})
                  </p>
                  <ul className="list-disc ml-6 text-sm text-gray-600">
                    {(e.highlights || []).map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {!!(value.projects && value.projects.length) && (
            <Section title="Projects">
              <ul>
                {(value.projects || []).map((p, i) => (
                  <li key={i}>
                    <strong>{p.name}</strong>: {p.description}{" "}
                    {p.link && (
                      <a href={p.link} className="text-blue-600 underline">
                        {p.link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {!!(value.certifications && value.certifications.length) && (
            <Section title="Certifications">
              <ul>
                {(value.certifications || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Portfolio ---------- */
function Portfolio({ value }: { value: Resume }) {
  return (
    <div className="template-portfolio bg-white rounded-xl shadow p-8">
      <div className="text-center border-b border-gray-300 pb-4 mb-6">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="mx-auto mb-3 w-24 h-24 rounded-full object-cover border"
          />
        )}

        <h1 className="text-3xl font-bold text-yellow-800">{value.name}</h1>
        {value.title && (
          <p className="text-lg italic text-gray-600">{value.title}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-700">
          {value.location && (
            <span className="contact-pill">
              <MapPin size={14} className="inline mr-1" /> {value.location}
            </span>
          )}
          {value.phone && (
            <span className="contact-pill">
              <Phone size={14} className="inline mr-1" /> {value.phone}
            </span>
          )}
          {value.email && (
            <span className="contact-pill">
              <Mail size={14} className="inline mr-1" /> {value.email}
            </span>
          )}
          {value.linkedin && (
            <span className="contact-pill">
              <Linkedin size={14} className="inline mr-1" /> {value.linkedin}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-800">
        {value.summary && (
          <Section title="Summary">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Experience">
            {(value.experience || []).map((e, i) => (
              <div
                key={i}
                className="mb-4 border-l-2 border-yellow-700 pl-4 relative"
              >
                <span className="absolute -left-2 top-1 w-3 h-3 bg-yellow-100 rounded-full"></span>
                <p className="font-semibold text-gray-900">
                  {e.role} — {e.company}
                </p>
                <p className="text-xs italic text-gray-600">{e.period}</p>
                <ul className="list-disc ml-6 text-gray-700">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            {(value.education || []).map((ed, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ed.degree}</p>
                <p className="text-sm text-gray-600">
                  {ed.school} ({ed.year})
                </p>
              </div>
            ))}
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-yellow-100 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.skills && value.skills.length) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(value.skills || []).map((s, i) => (
                <p key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-800 rounded-full"></span>{" "}
                  {s}
                </p>
              ))}
            </div>
          </Section>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <Section title="Achievements">
            <ul className="list-disc ml-6">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <ul className="list-disc ml-6">
              {(value.certifications || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------- Blue Minimalist ---------- */
function BlueMinimalist({ value }: { value: Resume }) {
  return (
    <div className="template-blueMinimalist border rounded-xl overflow-hidden shadow bg-white grid grid-cols-[250px,1fr]">
      <aside className="bg-[#f5f0e6] p-6 flex flex-col items-center space-y-6">
        {value.photoDataUrl && (
          <img
            src={value.photoDataUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
          />
        )}

        <div className="w-full">
          <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-400 pb-1 mb-2">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {value.location && (
              <li className="flex items-center gap-2">
                <MapPin size={14} /> {value.location}
              </li>
            )}
            {value.phone && (
              <li className="flex items-center gap-2">
                <Phone size={14} /> {value.phone}
              </li>
            )}
            {value.email && (
              <li className="flex items-center gap-2">
                <Mail size={14} /> {value.email}
              </li>
            )}
            {value.linkedin && (
              <li className="flex items-center gap-2">
                <Linkedin size={14} /> {value.linkedin}
              </li>
            )}
          </ul>
        </div>

        {!!(value.skills && value.skills.length) && (
          <div className="w-full">
            <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-400 pb-1 mb-2">
              Skills
            </h3>
            <ul className="list-disc ml-4 text-sm text-gray-700">
              {(value.skills || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {!!(value.achievements && value.achievements.length) && (
          <div className="w-full">
            <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-400 pb-1 mb-2">
              Achievements
            </h3>
            <ul className="list-disc ml-4 text-sm text-gray-700">
              {(value.achievements || []).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="p-8 space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">{value.name}</h1>
          <p className="text-lg text-gray-700">{value.title}</p>
        </div>

        {value.summary && (
          <Section title="Summary">
            <p>{value.summary}</p>
          </Section>
        )}

        {!!(value.education && value.education.length) && (
          <Section title="Education">
            <ul className="space-y-2">
              {(value.education || []).map((ed, i) => (
                <li key={i}>
                  <strong>{ed.school}</strong> — {ed.degree} ({ed.year})
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.experience && value.experience.length) && (
          <Section title="Experience">
            {(value.experience || []).map((e, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium">
                  {e.role} · {e.company} ({e.period})
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {(e.highlights || []).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {!!(value.projects && value.projects.length) && (
          <Section title="Projects">
            <ul>
              {(value.projects || []).map((p, i) => (
                <li key={i}>
                  <strong>{p.name}</strong>: {p.description}{" "}
                  {p.link && (
                    <a href={p.link} className="text-blue-600 underline">
                      {p.link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {!!(value.certifications && value.certifications.length) && (
          <Section title="Certifications">
            <ul className="list-disc ml-6">
              {(value.certifications || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
        )}
      </main>
    </div>
  );
}
