import { TailorRequest, TailorResponse } from "./api";

// ✅ Mock AI generator — used when backend runs in mock mode
export function mockAI(input: TailorRequest): TailorResponse {
  const jd = (input.jobDescription || "").toLowerCase();

  // ✅ Domain detection logic (now includes Data Analyst too)
  if (jd.includes("frontend")) return domainResponses["frontend developer"];
  if (jd.includes("backend")) return domainResponses["backend developer"];
  if (jd.includes("data engineer")) return domainResponses["data engineer"];
  if (jd.includes("data scientist")) return domainResponses["data scientist"];
  if (jd.includes("data analyst")) return domainResponses["data analyst"];
  if (jd.includes("ai") || jd.includes("ml")) return domainResponses["ai/ml engineer"];
  if (jd.includes("cloud")) return domainResponses["cloud engineer"];
  if (jd.includes("web developer") || jd.includes("web development")) return domainResponses["web developer"];
  if (jd.includes("full stack")) return domainResponses["full stack developer"];

  // ✅ Default fallback
  return {
    summary:
      "Versatile technology professional with a proven ability to adapt across multiple domains. Skilled in applying modern tools and frameworks to solve problems, collaborate with teams, and deliver reliable solutions that create measurable business impact.",
    bullets: [
      "Delivered high-quality projects across diverse technical domains.",
      "Improved system performance and reliability with scalable designs.",
      "Collaborated effectively with cross-functional teams in agile environments.",
    ],
    keywords: ["Technology", "Problem-Solving", "Collaboration", "Scalability", "Innovation"],
  };
}

// ✅ Domain-wise mock responses
const domainResponses: Record<string, TailorResponse> = {
  "frontend developer": {
    summary:
      "Frontend Developer with strong expertise in React, TypeScript, and Tailwind CSS. Skilled at creating visually appealing, responsive, and accessible web applications. Adept at translating designs into seamless digital products with a focus on performance and user experience. Passionate about building interactive solutions that enhance customer engagement.",
    bullets: [
      "Developed reusable React components, reducing development time by 25%.",
      "Improved page performance with code-splitting and lazy loading.",
      "Integrated REST and GraphQL APIs to deliver real-time experiences.",
      "Led accessibility improvements achieving WCAG AA compliance.",
    ],
    keywords: ["React", "TypeScript", "Tailwind CSS", "UI/UX", "Accessibility", "Performance"],
  },

  "backend developer": {
    summary:
      "Backend Developer experienced in designing and scaling secure server-side applications. Skilled in Node.js, Express, and databases such as MongoDB and PostgreSQL. Adept at building APIs that handle large-scale traffic efficiently. Passionate about creating reliable, high-performing systems that power seamless user experiences.",
    bullets: [
      "Built secure REST/GraphQL APIs serving thousands of daily users.",
      "Optimized database queries, cutting response times by 30%.",
      "Implemented robust authentication and access control mechanisms.",
      "Deployed microservices in Docker and Kubernetes clusters.",
    ],
    keywords: ["Node.js", "Express", "GraphQL", "REST APIs", "Databases", "Kubernetes"],
  },

  "data scientist": {
    summary:
      "Data Scientist with expertise in predictive modeling, machine learning, and statistical analysis. Skilled in Python, SQL, and modern ML frameworks to solve business challenges. Adept at transforming raw data into actionable insights that drive decisions. Passionate about building intelligent systems that improve efficiency and outcomes.",
    bullets: [
      "Developed predictive models improving forecasting accuracy by 25%.",
      "Automated ETL pipelines processing millions of rows daily.",
      "Designed dashboards to communicate insights to stakeholders.",
      "Collaborated with product teams to integrate ML into workflows.",
    ],
    keywords: ["Python", "SQL", "Machine Learning", "Predictive Analytics", "ETL"],
  },

  // ✅ New domain: Data Analyst
  "data analyst": {
    summary:
      "Data Analyst skilled in extracting, cleaning, and visualizing data to drive informed decisions. Proficient in SQL, Excel, and BI tools like Power BI and Tableau. Adept at identifying patterns, presenting insights, and collaborating with stakeholders to optimize business outcomes. Passionate about using data to tell compelling stories and improve efficiency.",
    bullets: [
      "Created interactive Power BI dashboards visualizing KPIs and trends.",
      "Streamlined reporting workflows, reducing analysis time by 40%.",
      "Performed A/B testing and presented actionable insights to leadership.",
      "Utilized SQL queries to clean and prepare datasets for analytics.",
    ],
    keywords: ["Data Analysis", "Power BI", "Tableau", "SQL", "Excel", "Data Visualization"],
  },

  "ai/ml engineer": {
    summary:
      "AI/ML Engineer specializing in building and deploying intelligent solutions. Skilled in deep learning, natural language processing, and computer vision. Experienced in optimizing models for production-scale performance and reliability. Passionate about advancing AI applications to solve real-world problems across industries.",
    bullets: [
      "Trained NLP models for text classification with 92% accuracy.",
      "Built computer vision pipelines for defect detection with 95% precision.",
      "Optimized training workflows, reducing compute costs by 40%.",
      "Deployed ML models with CI/CD pipelines in production.",
    ],
    keywords: ["AI", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
  },

  "cloud engineer": {
    summary:
      "Cloud Engineer with strong expertise in AWS, Azure, and GCP platforms. Skilled at designing scalable and secure infrastructures, automating deployments, and managing CI/CD pipelines. Adept at ensuring system reliability and reducing costs with optimized architectures. Passionate about enabling digital transformation through cloud technologies.",
    bullets: [
      "Migrated legacy apps to AWS, reducing operational costs by 25%.",
      "Implemented CI/CD pipelines to automate deployments.",
      "Managed Kubernetes clusters ensuring 99.9% uptime.",
      "Deployed IaC using Terraform to scale infrastructure quickly.",
    ],
    keywords: ["AWS", "Azure", "GCP", "CI/CD", "Terraform", "Kubernetes"],
  },

  "full stack developer": {
    summary:
      "Full Stack Developer proficient in both frontend and backend technologies. Skilled in React, Node.js, and databases, delivering robust end-to-end solutions. Adept at managing scalable APIs, responsive UIs, and optimizing performance across the stack. Passionate about building versatile applications that provide seamless user experiences.",
    bullets: [
      "Built full-stack applications with React, Node.js, and MongoDB.",
      "Developed APIs and integrated them with dynamic web frontends.",
      "Implemented role-based authentication and secure session handling.",
      "Optimized backend performance with caching and query tuning.",
    ],
    keywords: ["Full Stack", "React", "Node.js", "MongoDB", "APIs", "Authentication"],
  },

  "web developer": {
    summary:
      "Web Developer with expertise in HTML, CSS, JavaScript, and responsive design. Skilled at creating clean, accessible, and SEO-friendly websites. Adept at working with frameworks like React and Vue to deliver dynamic user experiences. Passionate about crafting intuitive interfaces that improve usability and performance.",
    bullets: [
      "Developed responsive websites improving mobile usability by 35%.",
      "Implemented SEO best practices increasing organic traffic by 20%.",
      "Built single-page apps with React and Vue.js frameworks.",
      "Ensured cross-browser compatibility and WCAG compliance.",
    ],
    keywords: ["HTML5", "CSS3", "JavaScript", "React", "Vue", "SEO", "Accessibility"],
  },

  "data engineer": {
    summary:
      "Data Engineer experienced in building and managing large-scale data pipelines. Skilled with tools like Spark, Hadoop, and Kafka to process structured and unstructured data. Adept at designing ETL workflows and optimizing data storage solutions. Passionate about enabling organizations to leverage data efficiently and reliably.",
    bullets: [
      "Built ETL pipelines in Python and SQL to automate reporting.",
      "Implemented real-time data streaming with Kafka and Spark.",
      "Optimized storage for multi-terabyte datasets improving retrieval speed.",
      "Maintained data quality and integrity across distributed systems.",
    ],
    keywords: ["Data Engineering", "ETL", "Spark", "Hadoop", "Kafka", "Python", "SQL"],
  },
};
