import React from "react";
import type { Portfolio } from "../App";

// ✅ Corrected paths (inside portfolioTemplates folder)
import PortfolioTemplate1 from "./portfolioTemplates/PortfolioTemplate1";
import PortfolioTemplate2 from "./portfolioTemplates/PortfolioTemplate2";
import PortfolioTemplate3 from "./portfolioTemplates/PortfolioTemplate3";

type Props = {
  value: Portfolio;
  template: "modern" | "minimal" | "dark";
};

// Normalize incoming data
function normalize(v: Portfolio): Portfolio {
  const skills = Array.isArray(v.skills)
    ? v.skills
    : String(v.skills ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const achievements = Array.isArray(v.achievements)
    ? v.achievements
    : String(v.achievements ?? "")
        .split(/\r?\n/)
        .map((a) => a.trim())
        .filter(Boolean);

  const projects = Array.isArray(v.projects) ? v.projects : [];

  return { ...v, skills, achievements, projects };
}

export default function PortfolioPreview({ value, template }: Props) {
  const data = normalize(value);

  switch (template) {
    case "minimal":
      return <PortfolioTemplate2 value={data} />;
    case "dark":
      return <PortfolioTemplate3 value={data} />;
    case "modern":
    default:
      return <PortfolioTemplate1 value={data} />;
  }
}
