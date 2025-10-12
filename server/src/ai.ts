import type { TailorRequest, TailorResponse } from "../api";

// ✅ Mock AI generator
export function mockAI(input: TailorRequest): TailorResponse {
  const jd = (input.jobDescription || "").toLowerCase();

  // ✅ Domain logic
  if (jd.includes("frontend")) return domainResponses["frontend developer"];
  if (jd.includes("backend")) return domainResponses["backend developer"];
  if (jd.includes("data engineer")) return domainResponses["data engineer"];
  if (jd.includes("data scientist")) return domainResponses["data scientist"];
  if (jd.includes("data analyst")) return domainResponses["data analyst"];
  if (jd.includes("ai") || jd.includes("ml")) return domainResponses["ai/ml engineer"];
  if (jd.includes("cloud")) return domainResponses["cloud engineer"];
  if (jd.includes("web")) return domainResponses["web developer"];
  if (jd.includes("full stack")) return domainResponses["full stack developer"];

  // ✅ Default
  return domainResponses["generic"];
}

// ✅ Domain-specific responses
const domainResponses: Record<string, TailorResponse> = {
  "data analyst": {
    summary: "Data Analyst skilled in data cleaning, visualization, and insight generation using tools like Excel, Power BI, and Python. Adept at transforming complex datasets into actionable business intelligence to support decision-making.",
    projects: [
      "Sales Analysis Dashboard — Automated sales trend insights with Power BI.",
      "Customer Churn Prediction — Built logistic regression model using Python.",
      "Marketing Campaign Analytics — Improved ROI tracking with data visualization."
    ],
    skills: [
      "Excel", "Power BI", "Python", "SQL", "Data Visualization", "Statistical Analysis", "Pandas", "ETL"
    ],
    achievements: [
      "Increased reporting efficiency by 30% with automation.",
      "Built dashboards used by 5+ departments for KPI tracking.",
      "Improved data accuracy by 20% through advanced cleaning pipelines."
    ],
    profileSummary: "Analytical and detail-oriented Data Analyst with hands-on experience in Python, SQL, and visualization tools. Passionate about data-driven insights and continuous process improvement.",
  },

  "generic": {
    summary: "Versatile professional with expertise across multiple domains. Skilled in modern tools and frameworks for building scalable, high-performance solutions.",
    projects: ["General Project — Placeholder until domain defined."],
    skills: ["Problem Solving", "Teamwork", "Adaptability"],
    achievements: ["Completed projects across varied domains."],
    profileSummary: "Motivated professional ready to adapt and deliver impactful results in any technical role.",
  },

  // (keep your existing other roles here)
};
