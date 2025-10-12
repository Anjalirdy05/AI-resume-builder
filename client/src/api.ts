// src/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export type Resume = {
  name: string;
  title: string;
  location?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  summary?: string;

  education?: {
    school: string;
    degree: string;
    year: string;
  }[];

  experience?: {
    role: string;
    company: string;
    period: string;
    highlights?: string[];
  }[];

  projects?: {
    name: string;
    description?: string;
    link?: string;
  }[];

  skills?: string[];
  achievements?: string[];
  certifications?: string[];
  photoDataUrl?: string;
  customSections?: { title: string; content: string }[];

  // Fields used by AIToolbox to merge results
  keywords?: string[]; // AI suggested keywords
  bullets?: string[];  // AI suggested bullets/achievements
};
export type TailorRequest = {
  resume: Resume;
  jobDescription: string;
};


// Shape returned from your AI tailoring endpoint (adjust if your server returns different props)
export type TailorResponse = {
  // longer profile/profile summary
  profileSummary?: string; // compact resume top section
  summary?: string;        // alternate name for professional summary
  // short bullets / achievement lines
  bullets?: string[];
  // keywords (skills)
  keywords?: string[];
  // more explicit arrays
  skills?: string[];
  achievements?: string[];
  // suggested project names or objects
  projects?: Array<string | { title?: string; description?: string }>;
  // optional raw text if your API returns free text
  raw?: string;
};
