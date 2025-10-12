import React, { useState } from "react";
import type { AxiosError } from "axios";
import { api, Resume, TailorResponse } from "../api";

type Props = {
  resume: Resume;
  onApply: (updates: Partial<Resume>) => void;
};

// Domains we support
const DOMAINS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "Data Engineer",
  "Data Scientist",
  "Data Analyst",
  "Cloud Engineer",
];

export default function AIToolbox({ resume, onApply }: Props) {
  const [domain, setDomain] = useState<string>("Frontend Developer");
  const [loading, setLoading] = useState(false);

  // Fake AI suggestions (replace with real API later)
  const generateContent = async () => {
    setLoading(true);

    // Simulate delay
    await new Promise((res) => setTimeout(res, 1000));

    let updates: Partial<Resume> = {};

    switch (domain) {
      case "Frontend Developer":
        updates = {
          summary:
            "I am a frontend developer with a strong eye for design and usability. Over the past few years, I have developed projects that combine aesthetics with performance. Passionate frontend developer specializing in building responsive, user-friendly web interfaces. Skilled in React, Tailwind CSS, and modern UI libraries. My expertise lies in translating design wireframes into functional, high-performance web apps while ensuring accessibility and responsiveness across devices.",
          skills: ["React", "JavaScript", "CSS3", "HTML5", "Tailwind CSS"],
          achievements: [
            "Built a responsive e-commerce website with 10k+ monthly visitors",
            "Optimized UI performance, improving load time by 40%",
          ],
          projects: [
            {
              name: "Portfolio Website",
              description:
                "A sleek personal portfolio with animations and responsive design.",
              link: "#",
            },
            {
              name: "E-commerce Storefront",
              description:
                "Developed a scalable storefront using React + Redux with integrated payment gateway.",
              link: "#",
            },
          ],
        };
        break;

      case "Backend Developer":
        updates = {
          summary:
            "Backend developer with expertise in scalable APIs and secure server-side architectures. Experienced in Node.js and database optimization. As a backend engineer, I focus on building reliable and efficient server-side applications. I work with REST/GraphQL APIs, relational and NoSQL databases, and ensure high availability and performance of backend systems. I also enjoy optimizing queries and designing secure authentication systems.",
          skills: ["Node.js", "Express", "MongoDB", "SQL", "API Design"],
          achievements: [
            "Implemented authentication systems used by 5k+ active users",
            "Optimized database queries reducing latency by 60%",
          ],
          projects: [
            {
              name: "API Service Layer",
              description:
                "Developed a RESTful API service for a SaaS product with JWT-based authentication.",
              link: "#",
            },
          ],
        };
        break;

      case "Full Stack Developer":
        updates = {
          summary:
            "Full-stack developer with expertise in both frontend and backend technologies. Passionate about end-to-end web solutions. I am skilled in developing complete applications from scratch, handling both client and server-side logic. I enjoy solving complex technical challenges, integrating APIs, and designing systems that are scalable and maintainable. My toolkit includes React, Node.js, and cloud deployments.",
          skills: ["React", "Node.js", "MongoDB", "GraphQL", "Docker"],
          achievements: [
            "Built and deployed full-stack apps on AWS",
            "Integrated CI/CD pipelines reducing deployment time by 70%",
          ],
          projects: [
            {
              name: "Task Management App",
              description:
                "End-to-end full-stack app with user auth, CRUD features, and real-time updates.",
              link: "#",
            },
          ],
        };
        break;

      case "Web Developer":
        updates = {
          summary:
            "Web developer with a strong focus on building modern, responsive, and accessible websites. Over the years, I have built websites ranging from simple landing pages to dynamic CMS-driven platforms. I pay special attention to clean code, SEO optimization, and performance to ensure better user experience.",
          skills: ["HTML", "CSS", "JavaScript", "WordPress", "SEO"],
          achievements: [
            "Delivered 20+ client websites with SEO optimization",
            "Reduced bounce rate by 30% for client businesses",
          ],
          projects: [
            {
              name: "Corporate Website",
              description:
                "A responsive website for a consulting firm with SEO best practices.",
              link: "#",
            },
          ],
        };
        break;

      case "Data Engineer":
        updates = {
          summary:
            "Data engineer with expertise in building scalable pipelines and managing large-scale data workflows. I specialize in designing and implementing ETL pipelines, data warehousing, and ensuring data reliability. Skilled at working with distributed systems and cloud-based data tools to support analytics and machine learning pipelines.",
          skills: ["Python", "SQL", "Apache Spark", "AWS Glue", "Airflow"],
          achievements: [
            "Built automated ETL pipelines handling 1TB+ of daily data",
            "Migrated data warehouse to AWS Redshift, cutting costs by 25%",
          ],
          projects: [
            {
              name: "Data Pipeline",
              description:
                "Automated data ingestion pipeline using Airflow and Spark for real-time analytics.",
              link: "#",
            },
          ],
        };
        break;

      case "Data Scientist":
        updates = {
          summary:
            "Data scientist skilled in machine learning, predictive modeling, and turning data into actionable insights. I apply statistical methods and machine learning to extract valuable insights from structured and unstructured data. Experienced in building recommendation systems, classification models, and visualization dashboards.",
          skills: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Tableau"],
          achievements: [
            "Developed ML models with 90%+ accuracy in production",
            "Built recommendation engine that increased engagement by 35%",
          ],
          projects: [
            {
              name: "Movie Recommendation System",
              description:
                "Developed a collaborative filtering recommendation engine using Python.",
              link: "#",
            },
          ],
        };
        break;

      case "Data Analyst":
        updates = {
          summary:
            "Data analyst experienced in extracting insights and supporting business decisions with data-driven reports. I excel at data cleaning, visualization, and reporting. Using SQL, Excel, and BI tools, I help organizations monitor KPIs and make informed strategic decisions. My focus is on clear storytelling through data visualization.",
          skills: ["SQL", "Excel", "Power BI", "Tableau", "Python"],
          achievements: [
            "Created dashboards used by 200+ employees",
            "Automated reports saving 10 hours of manual work weekly",
          ],
          projects: [
            {
              name: "Sales Dashboard",
              description:
                "Developed an interactive Power BI dashboard to track sales performance.",
              link: "#",
            },
          ],
        };
        break;

      case "Cloud Engineer":
        updates = {
          summary:
            "Cloud engineer specializing in cloud infrastructure, deployment automation, and cost optimization. Experienced in deploying and maintaining cloud infrastructure across AWS, Azure, and GCP. Focused on designing scalable, cost-efficient architectures, implementing CI/CD, and ensuring system reliability.",
          skills: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
          achievements: [
            "Deployed multi-cloud architecture serving 50k+ users",
            "Reduced cloud costs by 20% using monitoring and automation",
          ],
          projects: [
            {
              name: "CI/CD Pipeline on AWS",
              description:
                "Automated deployment pipeline with Terraform and GitHub Actions on AWS.",
              link: "#",
            },
          ],
        };
        break;

      default:
        break;
    }

    onApply(updates);
    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <h2 className="font-semibold text-lg">AI Portfolio Toolbox</h2>

      {/* Domain Selector */}
      <label className="text-sm font-medium">Choose Domain:</label>
      <select
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full border rounded p-2"
      >
        {DOMAINS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <button
        onClick={generateContent}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Suggestions"}
      </button>
    </div>
  );
}
