export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools & Platforms";

export interface SkillGroup {
  category: SkillCategory;
  skills: string[];
}

export interface EducationEntry {
  institution: string;
  location: string;
  level: "school" | "undergraduate";
  status: "completed" | "current";
  /** Exam/result line, e.g. GCE A/L results or current CGPA. */
  detail?: string;
}

export interface ProjectSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  dateRange: string;
  summary: string;
  fullDescription?: string;
  sections?: ProjectSection[];
  techStack: string[];
  teamOrSolo: string;
  highlights?: string[];
  imageUrl?: string;
  images?: string[];
  /** Screenshot orientation for the detail slideshow and card thumbnail. Defaults to landscape. */
  imageAspect?: "landscape" | "portrait";
  liveUrl?: string;
  repoUrl?: string;
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  phone?: string;
  location?: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  aboutBio: string;
  avatarUrl: string;
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: Project[];
  social: SocialLinks;
  resumeUrl: string;
}

export const profile: Profile = {
  name: "Bimsara Sanduneth",
  avatarUrl: "/profile.png",
  tagline:
    "Undergraduate IT student at University of Moratuwa, Faculty of Information Technology",
  bio: "A full-stack focused IT undergraduate who enjoys building end-to-end projects — from web apps to hardware-integrated systems — and learning modern frameworks through hands-on team projects.",
  aboutBio:
    "Third-year Information Technology undergraduate at the University of Moratuwa with a strong interest in software engineering and full-stack development. Hands-on experience with Java, Spring Boot, React, Next.js, PHP, PostgreSQL, and Git through academic and team-based projects. Experienced in building practical applications, developing backend systems, designing responsive interfaces, and integrating software with cloud and embedded technologies. Passionate about solving real-world problems and continuously exploring new technologies.",
  education: [
    {
      institution: "Mahanama Central College",
      location: "Monaragala",
      level: "school",
      status: "completed",
      detail:
        "GCE A/L 2022 (2023) — Physical Science stream, ABB (A in Chemistry)",
    },
    {
      institution: "University of Moratuwa, Faculty of Information Technology",
      location: "Moratuwa, Sri Lanka",
      level: "undergraduate",
      detail: "CGPA: 3.76",
      status: "current",
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Java 21", "PHP", "C", "C#"],
    },
    {
      category: "Frontend",
      skills: [
        "HTML5",
        "CSS",
        "Tailwind CSS",
        "React.js",
        "Next.js",
        "React Native",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Spring Boot", "PDO", "JWT auth", ".NET"],
    },
    {
      category: "Database",
      skills: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & Platforms",
      skills: [
        "GitHub",
        "VS Code",
        "Postman",
        "Figma",
        "IoT",
        "Docker",
        "Expo",
      ],
    },
  ],
  projects: [
    {
      slug: "quickfixhub-mobile",
      title: "QuickFixHub — Cross-Platform Service Marketplace",
      dateRange: "2026",
      imageAspect: "portrait",
      imageUrl: "/projects/quickfixhub-mobile/qfh-1.jpg",
      images: [
        "/projects/quickfixhub-mobile/qfh-1.jpg",
        "/projects/quickfixhub-mobile/qfh-2.jpg",
        "/projects/quickfixhub-mobile/qfh-3.jpg",
        "/projects/quickfixhub-mobile/qfh-4.jpg",
        "/projects/quickfixhub-mobile/qfh-5.jpg",
        "/projects/quickfixhub-mobile/qfh-6.jpg",
        "/projects/quickfixhub-mobile/qfh-7.jpg",
        "/projects/quickfixhub-mobile/qfh-8.jpg",
        "/projects/quickfixhub-mobile/qfh-9.jpg",
        "/projects/quickfixhub-mobile/qfh-10.jpg",
        "/projects/quickfixhub-mobile/qfh-11.jpg",
        "/projects/quickfixhub-mobile/qfh-12.jpg",
        "/projects/quickfixhub-mobile/qfh-13.jpg",
        "/projects/quickfixhub-mobile/qfh-14.jpg",
        "/projects/quickfixhub-mobile/qfh-15.jpg",
        "/projects/quickfixhub-mobile/qfh-16.jpg",
        "/projects/quickfixhub-mobile/qfh-17.jpg",
        "/projects/quickfixhub-mobile/qfh-18.jpg",
        "/projects/quickfixhub-mobile/qfh-19.jpg",
        "/projects/quickfixhub-mobile/qfh-20.jpg",
        "/projects/quickfixhub-mobile/qfh-21.jpg",
        "/projects/quickfixhub-mobile/qfh-22.jpg",
        "/projects/quickfixhub-mobile/qfh-23.jpg",
        "/projects/quickfixhub-mobile/qfh-24.jpg",
        "/projects/quickfixhub-mobile/qfh-25.jpg",
        "/projects/quickfixhub-mobile/qfh-26.jpg",
        "/projects/quickfixhub-mobile/qfh-27.jpg",
        "/projects/quickfixhub-mobile/qfh-28.jpg",
        "/projects/quickfixhub-mobile/qfh-29.jpg",
        "/projects/quickfixhub-mobile/qfh-30.jpg",
        "/projects/quickfixhub-mobile/qfh-31.jpg",
      ],
      summary:
        "Full-stack, cross-platform service marketplace (React Native + Spring Boot) with customer, provider, and admin apps — booking, chat, verification, and payments.",
      fullDescription:
        "A cross-platform marketplace that connects customers with verified local service providers — plumbing, electrical, cleaning, repairs — for on-demand home jobs. Designed and built solo, end-to-end: a React Native (Expo) app and a Spring Boot API serving three distinct product surfaces — customer, provider, and admin.",
      sections: [
        {
          heading: "What it does",
          paragraphs: [
            "Customers discover providers by category, name or city, or a map radius search (device location plus Haversine distance), view profiles with ratings and pricing, request a booking, track it through a live status timeline, chat with the provider, and leave a tagged review.",
            "Providers onboard a business profile, set service pricing and weekly availability, upload verification documents, and work incoming jobs from a dashboard (accept → en route → in progress → complete).",
            "Admins review submitted documents in a verification queue (approve, reject, or request more), watch live platform stats, and issue refunds.",
          ],
        },
        {
          heading: "Architecture & engineering",
          bullets: [
            "Stateless auth — short-lived JWT access tokens with rotating, DB-hashed opaque refresh tokens that can be revoked; Redis-backed login rate limiting; timing-attack-safe login to close an email-enumeration side channel; email-based password reset with single-use, attempt-capped codes.",
            "Guarded booking state machine — every transition is an ownership-scoped endpoint with per-transition timestamps, a 30-minute accept window with automatic expiry, and cancellation rules; the app renders a history timeline with no separate audit table.",
            "Transactional email over SMTP — welcome, password-reset, and security-alert mail sent asynchronously and best-effort, so a failed send never breaks the request that triggered it; a Mailpit container captures it all in local development.",
            "Schema discipline — 23 sequential Flyway migrations with Hibernate in validate mode, so entities and schema can never silently drift.",
            "Pragmatic search — Spring Data Specifications compose optional filters; radius search does an in-memory Haversine pass, the right trade-off at this scale and swappable later.",
            "Typed API client with automatic token refresh and single-flight retry on 401s.",
            "Dockerised local stack (PostgreSQL, Redis, Mailpit); OpenAPI/Swagger docs.",
          ],
        },
        {
          heading: "Notable constraints I designed around",
          bullets: [
            "Staying on Expo Go (no custom dev client) meant no native map module and no OS push — I render maps through the Google Maps JavaScript API in a WebView and built an in-app, polled notification centre whose data model is already push-ready.",
            "Running Spring with open-in-view disabled surfaced lazy-loading and Hibernate flush-ordering pitfalls in DTO mapping and replace-all writes, which I fixed with explicit fetching and transaction boundaries.",
          ],
        },
        {
          heading: "Scope notes",
          paragraphs: [
            "Payments are a mocked ledger — a Payment row is created when a booking completes, which is enough for real receipts and admin refunds, and the schema was built to drop a real gateway in behind it. Chat and notifications poll rather than stream.",
          ],
        },
      ],
      techStack: [
        "React Native",
        "Expo Router",
        "TypeScript",
        "TanStack Query",
        "Spring Boot 4",
        "Java 21",
        "Spring Security",
        "Spring Data JPA",
        "PostgreSQL 16",
        "Redis 7",
        "Flyway",
        "JWT",
        "Docker",
        "Swagger / OpenAPI",
      ],
      teamOrSolo: "Solo — designed and built end-to-end",
      liveUrl: "",
      repoUrl: "https://github.com/Bimsara-Sanduneth/quickfixhub-mobile",
    },
    {
      slug: "todo-web-application",
      title: "ToDo Web Application",
      dateRange: "Mar 2026",
      imageUrl: "/todo-web-application.png",
      images: [
        "/projects/todo-web-application/todo-1.png",
        "/projects/todo-web-application/todo-2.png",
        "/projects/todo-web-application/todo-3.png",
        "/projects/todo-web-application/todo-4.png",
        "/projects/todo-web-application/todo-5.png",
        "/projects/todo-web-application/todo-6.png",
        "/projects/todo-web-application/todo-7.png",
        "/projects/todo-web-application/todo-8.png",
      ],
      summary:
        "Full-stack task management app with a Next.js/React frontend and a Spring Boot REST API backend secured with JWT authentication.",
      techStack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Zustand",
        "React Hook Form",
        "Zod",
        "Spring Boot 3.2",
        "Java 21",
        "Spring Security",
        "Spring Data JPA",
        "Hibernate",
        "PostgreSQL",
        "JWT (JJWT)",
        "Maven",
        "Git/GitHub",
      ],
      teamOrSolo:
        "Team — CyberX (Bimsara Sanduneth, Janith Bhashitha, Shashini Bhagya, Yasiru Ruwantha, Naduni Senadeera)",
      highlights: [
        "Zustand for client state, React Hook Form + Zod for form validation, and Axios with JWT attached per-request",
        "Spring Boot REST API secured with Spring Security, a custom JWT filter, and BCrypt password hashing",
        "PostgreSQL persistence via Spring Data JPA",
        "Secure register/login with JWT access + refresh token rotation",
        "Full task CRUD with an in-progress/completed toggle",
        'Due dates with a dedicated "Today" view and a reminders page',
        "Responsive Tailwind UI",
      ],
      liveUrl: "",
      repoUrl: "https://github.com/Bimsara-Sanduneth/ToDo-Web-Application.git",
    },
    {
      slug: "quickfix-hub",
      title: "QuickFix Hub — Home Services Booking Platform",
      dateRange: "Mar 2025 – Jun 2025",
      imageUrl: "/quickfix-hub.png",
      images: [
        "/projects/quickfix-hub/quickfix-1.png",
        "/projects/quickfix-hub/quickfix-2.png",
        "/projects/quickfix-hub/quickfix-3.png",
        "/projects/quickfix-hub/quickfix-4.png",
        "/projects/quickfix-hub/quickfix-5.png",
        "/projects/quickfix-hub/quickfix-6.png",
        "/projects/quickfix-hub/quickfix-7.png",
        "/projects/quickfix-hub/quickfix-8.png",
        "/projects/quickfix-hub/quickfix-9.png",
        "/projects/quickfix-hub/quickfix-10.png",
        "/projects/quickfix-hub/quickfix-11.png",
        "/projects/quickfix-hub/quickfix-12.png",
        "/projects/quickfix-hub/quickfix-13.png",
        "/projects/quickfix-hub/quickfix-14.png",
        "/projects/quickfix-hub/quickfix-15.png",
        "/projects/quickfix-hub/quickfix-16.png",
        "/projects/quickfix-hub/quickfix-17.png",
        "/projects/quickfix-hub/quickfix-18.png",
      ],
      summary:
        "Full-stack home services booking platform built as a group project for the Web Technologies module, connecting customers with service providers across categories like electrical, plumbing, carpentry, HVAC, and cleaning.",
      techStack: [
        "PHP",
        "PDO",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript",
        "Apache",
        "XAMPP",
      ],
      teamOrSolo: "Team (Web Technologies module group project)",
      highlights: [
        "Customers can browse services, book appointments, and manage bookings from a dashboard",
        "Admin back-office for managing services, bookings, users, reviews, and contact messages, plus site settings",
        "CSV/Excel export for reporting",
        "Session-based authentication with separate customer and admin roles",
      ],
      liveUrl: "",
      repoUrl: "https://github.com/Bimsara-Sanduneth/quickfix-hub.git",
    },
    {
      slug: "chesswiz",
      title: "ChessWiz — Automated Chessboard System",
      dateRange: "",
      imageUrl: "/chesswiz.jpg",
      images: [
        "/projects/chesswiz/chesswiz-1.jpg",
        "/projects/chesswiz/chesswiz-2.jpg",
        "/projects/chesswiz/chesswiz-3.jpg",
        "/projects/chesswiz/chesswiz-4.jpg",
        "/projects/chesswiz/chesswiz-5.jpg",
        "/projects/chesswiz/chesswiz-6.jpg",
        "/projects/chesswiz/chesswiz-7.jpg",
        "/projects/chesswiz/chesswiz-8.jpg",
        "/projects/chesswiz/chesswiz-9.jpg",
        "/projects/chesswiz/chesswiz-10.jpg",
        "/projects/chesswiz/chesswiz-11.jpg",
        "/projects/chesswiz/chesswiz-12.jpg",
        "/projects/chesswiz/chesswiz-13.jpg",
        "/projects/chesswiz/chesswiz-14.jpg",
        "/projects/chesswiz/chesswiz-15.jpg",
        "/projects/chesswiz/chesswiz-16.jpg",
        "/projects/chesswiz/chesswiz-17.jpg",
        "/projects/chesswiz/chesswiz-18.jpg",
        "/projects/chesswiz/chesswiz-19.jpg",
      ],
      summary:
        "An intelligent automated chess system that connects physical chess gameplay to a digital platform in real time via embedded hardware and web technology.",
      techStack: [
        "Arduino Uno",
        "ESP32",
        "Stepper Motors",
        "DRV8825 Drivers",
        "Hall Effect Sensors",
        "React.js",
        "Node.js",
        "Stockfish Chess Engine",
      ],
      teamOrSolo: "Team (hardware & motion-control contributor)",
      highlights: [
        "Designed the CoreXY stepper motor mechanism for automated piece movement",
        "Arduino-based motor control with DRV8825 drivers, including microstepping and movement calibration",
        "Built a linear-rail and electromagnet movement system",
        "ESP32 serial communication for hardware coordination",
        "Implemented homing and automated movement sequences",
        "Demonstrated skills: embedded systems, automation & motion control, real-time communication, full-stack development, and hardware-software integration",
      ],
      liveUrl: "",
      repoUrl:
        "https://github.com/Bimsara-Sanduneth/ChessWiz-Automated-Chessboard.git",
    },
    {
      slug: "universal-dms-erp-integration",
      title: "Universal DMS for ERP Integration",
      dateRange: "Level 2, 2026",
      imageUrl: "/images/projects/universal-dms.png",
      images: [
        "/projects/universal-dms-erp-integration/dms-1.png",
        "/projects/universal-dms-erp-integration/dms-2.png",
        "/projects/universal-dms-erp-integration/dms-3.png",
        "/projects/universal-dms-erp-integration/dms-4.png",
        "/projects/universal-dms-erp-integration/dms-5.png",
        "/projects/universal-dms-erp-integration/dms-6.png",
        "/projects/universal-dms-erp-integration/dms-7.png",
        "/projects/universal-dms-erp-integration/dms-8.png",
        "/projects/universal-dms-erp-integration/dms-9.png",
        "/projects/universal-dms-erp-integration/dms-10.png",
        "/projects/universal-dms-erp-integration/dms-11.png",
        "/projects/universal-dms-erp-integration/dms-12.png",
        "/projects/universal-dms-erp-integration/dms-13.png",
        "/projects/universal-dms-erp-integration/dms-14.png",
      ],
      summary:
        "A centralized Document Management System integrated with ERP platforms — automating document workflows, approvals, and enterprise transaction linking with role-based security.",
      fullDescription:
        "Many organizations manage large volumes of documents — invoices, contracts, purchase orders, compliance records — through storage systems that operate separately from their core ERP platforms. That disconnect leads to inefficient retrieval, manual processing, data duplication, and limited traceability. This project designs and implements a Universal Document Management System (DMS) that integrates directly with ERP environments, giving organizations a centralized, secure, and scalable way to manage enterprise documents. The system supports metadata-driven organization, advanced search, and automated approval workflows, while API-based integration keeps documents synchronized with related ERP transactions in real time. Built on a multi-tier, cloud-native architecture, the system separates frontend, backend, database, and integration layers for maintainability and scale.",
      techStack: [
        "Java 21",
        "Spring Boot",
        "REST API",
        "JWT",
        "Next.js",
        "Zustand",
        "Tailwind CSS",
        "shadcn/ui",
        "React Hook Form",
        "PostgreSQL",
      ],
      teamOrSolo:
        "Team — CyberX (B.M.J. Bhashitha, K.H.Y.R. Premarathna, W.S.B. Wijayamuni, K.V.N.M. Senadheera)",
      highlights: [
        "Centralized document repository with metadata-driven classification and retrieval",
        "Workflow engine for approvals with Draft/Pending/Approved lifecycle states and full version history",
        "ERP integration layer linking documents to purchase orders, invoices, and contracts via APIs",
        "Role-based access control with JWT authentication",
        "Controlled document sharing via expiring, revocable links",
        "Audit logging and event-driven notifications",
        "Advanced search with saved searches and alerts",
      ],
      liveUrl: "",
      repoUrl: "",
    },
  ],
  social: {
    email: "bimsarasanduneth@gmail.com",
    github: "https://github.com/Bimsara-Sanduneth",
    linkedin: "https://linkedin.com/in/bimsara-sanduneth-7a4366347",
    phone: "+94 74 221 7295",
    location: "Moratuwa, Sri Lanka",
  },
  resumeUrl: "",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return profile.projects.find((project) => project.slug === slug);
}
