import { useState, useEffect, useRef } from "react";
import logoSrc from "./imports/logo.png";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "UX Approach" },
  { id: "ia", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "principles", label: "Principles" },
  { id: "outcome", label: "Outcome" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium tracking-widest uppercase border border-[#DEDEDB] text-[#6B6B67] rounded-sm">
      {children}
    </span>
  );
}

function SectionLabel({ number, label }: { number?: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {number && <span className="font-display text-xs font-700 tracking-widest text-[#1447E6]">{number}</span>}
      <span className="text-xs font-medium tracking-widest uppercase text-[#6B6B67]">{label}</span>
      <div className="flex-1 h-px bg-[#DEDEDB]" />
    </div>
  );
}

function PhaseCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="group border border-[#DEDEDB] bg-white p-6 rounded-[10px] hover:border-[#1447E6] transition-colors duration-200">
      <div className="text-xs font-display font-[700] text-[#1447E6] mb-3 tracking-widest">{num}</div>
      <h3 className="font-display font-[700] text-lg text-[#0D0D0B] mb-2">{title}</h3>
      <p className="text-sm text-[#6B6B67] leading-relaxed">{desc}</p>
    </div>
  );
}

function PrincipleRow({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-8 py-6 border-b border-[#DEDEDB] last:border-0">
      <div className="font-display font-[700] text-sm text-[#1447E6] w-8 flex-shrink-0 pt-0.5">{num}</div>
      <div>
        <h3 className="font-display font-[700] text-base text-[#0D0D0B] mb-1">{title}</h3>
        <p className="text-sm text-[#6B6B67] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FeatureSection({
  id,
  label,
  title,
  desc,
  items,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  desc: string;
  items?: string[];
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 py-14 border-b border-[#DEDEDB]">
      <div>
        <div className="text-xs font-medium tracking-widest uppercase text-[#6B6B67] mb-3">{label}</div>
        <h2 className="font-display font-[700] text-2xl text-[#0D0D0B] leading-tight">{title}</h2>
      </div>
      <div>
        <p className="text-[15px] text-[#3A3A37] leading-relaxed mb-6">{desc}</p>
        {items && (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#6B6B67]">
                <span className="w-1 h-1 rounded-full bg-[#1447E6] mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-[#DEDEDB]" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#" className="flex items-center">
            <img src={logoSrc} alt="Pixel logo" className="w-[46px] h-[57px] object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-xs tracking-wide transition-colors duration-150 ${
                  active === item.id
                    ? "text-[#1447E6] font-medium"
                    : "text-[#6B6B67] hover:text-[#0D0D0B]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-[#6B6B67] hover:text-[#0D0D0B]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#F7F7F5] border-t border-[#DEDEDB] px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#0D0D0B]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <Tag>Enterprise SaaS</Tag>
          <Tag>Low-Code Platform</Tag>
          <Tag>UI/UX Design</Tag>
        </div>
        <h1 className="font-display font-[900] text-5xl md:text-7xl text-[#0D0D0B] leading-[0.95] tracking-tight mb-8 max-w-4xl">
          LCAP —{" "}
          <span className="text-[#1447E6]">Low-Code</span>{" "}
          Application Platform
        </h1>
        <p className="text-lg text-[#6B6B67] max-w-2xl leading-relaxed mb-12">
          Designing a configurable platform to build, manage and automate enterprise applications without requiring extensive development effort.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#DEDEDB] pt-10">
          {[
            { label: "Role", value: "Lead UI/UX Designer" },
            { label: "Product Type", value: "Enterprise SaaS" },
            { label: "Platform", value: "Low-Code" },
            { label: "Focus Areas", value: "6 Core Modules" },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-xs text-[#6B6B67] tracking-widest uppercase mb-1">{m.label}</div>
              <div className="font-display font-[700] text-sm text-[#0D0D0B]">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FULL-BLEED DIVIDER */}
      <div className="w-full h-px bg-[#DEDEDB]" />

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6">

        {/* OVERVIEW */}
        <section id="overview" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="Project Overview" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl md:text-4xl text-[#0D0D0B] mb-6 leading-tight">
                One platform to create, structure, build, automate and analyse.
              </h2>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed mb-4">
                LCAP is a low-code application platform designed to help organisations create and manage business applications without requiring extensive development effort.
              </p>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed mb-4">
                The platform brings multiple capabilities into one environment&nbsp;&nbsp;from creating applications and defining data structures to building forms, generating reports, configuring workflows and setting up notifications.
              </p>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed">
                The interface demonstrates experiences such as application management, schema configuration, form creation, report creation, workflow configuration and notification setup.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-[#DEDEDB] p-6 rounded-[10px]">
                <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-3">The Design Goal</div>
                <p className="font-display font-[500] text-[15px] text-[#0D0D0B] leading-relaxed">
                  Create a scalable enterprise experience that allows users to configure business applications through a structured, visual interface rather than relying heavily on technical development.
                </p>
              </div>
              <div className="bg-[#1447E6] p-6 rounded-[10px]">
                <div className="text-xs tracking-widest uppercase text-white/60 mb-3">Focus Areas</div>
                <div className="flex flex-wrap gap-2">
                  {["Product Design", "UX Architecture", "Form Builder", "Report Builder", "Workflow Builder", "Data Management", "App Management"].map((f) => (
                    <span key={f} className="text-xs text-white border border-white/20 px-2.5 py-1 rounded-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section id="challenge" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="The Challenge" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl md:text-4xl text-[#0D0D0B] mb-6 leading-tight">
                Enterprise application builders can become complicated very quickly.
              </h2>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed mb-6">
                LCAP needed to bring these capabilities together while maintaining a clear mental model for users&nbsp;&nbsp;designing an experience where users could progressively configure an application without feeling overwhelmed by the number of available capabilities.
              </p>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed">
                The challenge was therefore to design an experience where complexity is exposed progressively, not all at once.
              </p>
            </div>
            <div>
              <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-5">Users may need to work with</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Applications", "Tables and fields", "Forms", "Reports",
                  "Relationships", "Workflows", "Roles", "Notifications",
                  "Permissions", "Records"
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-3 px-4 bg-white border border-[#DEDEDB] rounded-[5px] text-sm text-[#0D0D0B]"
                  >
                    <span className="font-display font-[700] text-[10px] text-[#1447E6] w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* UX APPROACH */}
        <section id="approach" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="The UX Approach" />
          <div className="mb-10">
            <h2 className="font-display font-[700] text-3xl md:text-4xl text-[#0D0D0B] mb-4 leading-tight max-w-2xl">
              Structured around the lifecycle of an application.
            </h2>
            <p className="text-[15px] text-[#6B6B67] max-w-xl">
              Six sequential phases that guide users from creation to analysis — each building on the last.
            </p>
          </div>

          {/* Phase flow indicator */}
          <div className="flex flex-wrap items-center gap-2 mb-10 py-4 px-5 bg-white border border-[#DEDEDB] rounded-[10px] overflow-x-auto">
            {["Create", "Structure", "Build", "Automate", "Communicate", "Analyse"].map((phase, i, arr) => (
              <div key={phase} className="flex items-center gap-2 flex-shrink-0">
                <span className="font-display font-[700] text-sm text-[#0D0D0B]">{phase}</span>
                {i < arr.length - 1 && (
                  <span className="text-[#1447E6] text-sm">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PhaseCard
              num="01"
              title="Create"
              desc="Users start by creating an application and defining its purpose&nbsp;&nbsp;with a name, alias and description."
            />
            <PhaseCard
              num="02"
              title="Structure"
              desc="Define the application's underlying data structure through tables, fields and relationships. Concepts include Record of approvals, Inspection data, Environment impact and Safety records."
            />
            <PhaseCard
              num="03"
              title="Build"
              desc="Once the data structure is established, users create forms and configure the fields required to capture information using the Form Builder."
            />
            <PhaseCard
              num="04"
              title="Automate"
              desc="Workflows allow teams to define steps, roles, preconditions, postconditions and outcomes&nbsp;&nbsp;automating business processes rather than treating every application as a collection of static forms."
            />
            <PhaseCard
              num="05"
              title="Communicate"
              desc="Notifications can be configured through channels such as SMS and email, with dynamic fields that can be inserted into messages using application data."
            />
            <PhaseCard
              num="06"
              title="Analyse"
              desc="The Report Builder allows users to construct reports using fields and configure grouping, filtering and sorting&nbsp;&nbsp;turning application data into structured business reports."
            />
          </div>
        </section>

        {/* INFORMATION ARCHITECTURE */}
        <section id="ia" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="Information Architecture" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl text-[#0D0D0B] mb-6 leading-tight">
                Navigation organised around the core building blocks.
              </h2>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed mb-8">
                Instead of presenting every configuration capability simultaneously, the navigation separates major tasks into dedicated areas. This creates a predictable relationship between the different stages of application configuration.
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                {[
                  { q: "What am I building?", a: "Application" },
                  { q: "What data does it use?", a: "Schema / Tables / Fields" },
                  { q: "How do users enter information?", a: "Forms" },
                  { q: "How is the information analysed?", a: "Reports" },
                  { q: "How does the process operate?", a: "Workflow" },
                  { q: "How are users notified?", a: "Notifications" },
                ].map((item) => (
                  <div key={item.q}>
                    <div className="text-xs text-[#6B6B67] mb-1">{item.q}</div>
                    <div className="font-display font-[700] text-sm text-[#0D0D0B]">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#DEDEDB] p-6 rounded-[10px]">
              <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-5">Primary Navigation</div>
              <div className="space-y-1">
                {[
                  { label: "Overview", active: false },
                  { label: "Applications", active: true },
                  { label: "Schema", active: false },
                  { label: "Forms", active: false },
                  { label: "Reports", active: false },
                  { label: "Dashboard", active: false },
                  { label: "Workflow", active: false },
                  { label: "Notification", active: false },
                  { label: "Settings", active: false },
                ].map((nav) => (
                  <div
                    key={nav.label}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors ${
                      nav.active
                        ? "bg-[#1447E6] text-white font-medium"
                        : "text-[#6B6B67] hover:bg-[#F7F7F5]"
                    }`}
                  >
                    <span className="text-xs opacity-60">→</span>
                    {nav.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features">
          <div className="py-10">
            <SectionLabel label="Feature Design" />
            <h2 className="font-display font-[700] text-3xl md:text-4xl text-[#0D0D0B] max-w-2xl leading-tight">
              Six builders. One consistent experience.
            </h2>
          </div>

          <FeatureSection
            label="Module 01"
            title="Application Management"
            desc="The application overview provides users with multiple ways to scan and manage applications. Applications can have statuses such as Published and Deployed, creating a familiar management pattern for enterprise users who need to work across multiple applications."
            items={["Grid View & List View", "Filtering and Sorting", "Search", "Application status (Published / Deployed)", "Updated date and Updated by"]}
          >
            <div className="mt-8 bg-white border border-[#DEDEDB] p-5 rounded-[10px]">
              <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-4">Application List — Example</div>
              <div className="space-y-2">
                {[
                  { name: "Safety Inspection App", status: "Deployed", updated: "24 Aug 2026", by: "J. Reyes" },
                  { name: "Environment Impact Tracker", status: "Published", updated: "20 Aug 2026", by: "M. Okonkwo" },
                  { name: "Construction Progress Log", status: "Published", updated: "18 Aug 2026", by: "S. Nakamura" },
                  { name: "Financial Data Portal", status: "Deployed", updated: "15 Aug 2026", by: "A. Patel" },
                ].map((app) => (
                  <div key={app.name} className="flex items-center justify-between py-3 border-b border-[#F0F0ED] last:border-0 gap-4">
                    <span className="text-sm font-medium text-[#0D0D0B] flex-1">{app.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-sm font-medium flex-shrink-0 ${
                      app.status === "Deployed"
                        ? "bg-[#E8F0FE] text-[#1447E6]"
                        : "bg-[#F0F0ED] text-[#6B6B67]"
                    }`}>{app.status}</span>
                    <span className="text-xs text-[#6B6B67] hidden sm:block flex-shrink-0">{app.updated}</span>
                    <span className="text-xs text-[#6B6B67] hidden md:block flex-shrink-0">{app.by}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatureSection>

          <FeatureSection
            label="Module 02"
            title="Schema & Data Management"
            desc="A core part of the platform is the ability to define how application data is structured. Users can navigate between Tables and Fields, providing a clear progression from high-level data structures to individual attributes."
            items={["Record of approvals", "Inspection data", "Environment impact", "Construction progress", "Financial data", "Safety records"]}
          >
            <div className="mt-8 p-5 bg-white border border-[#DEDEDB] rounded-[10px]">
              <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-4">Relationship Example</div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-[#F7F7F5] border border-[#DEDEDB] px-4 py-2.5 rounded-[5px] text-sm font-display font-[700] text-[#0D0D0B]">
                  Record of approvals
                </div>
                <span className="text-[#1447E6] font-display font-[700]">→</span>
                <div className="bg-[#1447E6] px-4 py-2.5 rounded-[5px] text-sm font-display font-[700] text-white">
                  Building codes
                </div>
              </div>
              <p className="text-xs text-[#6B6B67] mt-3">Users can define the relationship type and whether the relationship is mandatory.</p>
            </div>
          </FeatureSection>

          <FeatureSection
            label="Module 03"
            title="Form Builder"
            desc="The Form Builder is one of the most visual parts of the platform. Users can construct forms using configurable components rather than manually designing every field. Selecting a component exposes properties such as Table, Field, Label, Description, Row configuration and Default value."
          >
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { cat: "Content", items: ["Text", "Text Area"] },
                { cat: "Form", items: ["Email", "Location", "Phone", "Radio", "Checklist", "Checkbox", "Select"] },
                { cat: "Media", items: ["Image", "Video", "Upload"] },
              ].map((group) => (
                <div key={group.cat} className="bg-white border border-[#DEDEDB] p-4 rounded-[10px]">
                  <div className="text-xs tracking-widest uppercase text-[#1447E6] font-medium mb-3">{group.cat}</div>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-[#3A3A37] flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#DEDEDB] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FeatureSection>

          <FeatureSection
            label="Module 04"
            title="Report Builder"
            desc="The Report Builder transforms application data into configurable reports. Users can select available fields and place them into the report canvas. This creates a simple configuration model for users who need to customise how information is presented without writing queries or code."
          >
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white border border-[#DEDEDB] rounded-[10px]">
                <div className="text-xs text-[#6B6B67] w-24 flex-shrink-0">Configuration</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Grouping", "Filtering", "Sorting"].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="font-display font-[700] text-sm text-[#0D0D0B]">{s}</span>
                      {i < arr.length - 1 && <span className="text-[#1447E6] text-sm">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-[#F7F7F5] border border-[#DEDEDB] rounded-[10px]">
                <div className="text-xs text-[#6B6B67] mb-2">Example report — Compliance Audit Report</div>
                <div className="flex flex-wrap gap-2">
                  {["Record of approvals", "Inspection Data", "Environment Impact"].map((s) => (
                    <span key={s} className="text-xs border border-[#DEDEDB] bg-white px-2.5 py-1 text-[#3A3A37]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </FeatureSection>

          <FeatureSection
            label="Module 05"
            title="Workflow Builder"
            desc="The workflow experience is designed around a step-based process. Users can add additional steps and assign roles to individual stages. This approach helps transform complex business logic into a visual sequence."
          >
            <div className="mt-8 bg-white border border-[#DEDEDB] p-6 rounded-[10px]">
              <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-6">Workflow Example</div>
              <div className="flex flex-col gap-0">
                {[
                  { step: "Step 1", role: "Pre-condition", color: "bg-[#1447E6]" },
                  { step: "Step 2", role: "Assigned role", color: "bg-[#0D0D0B]" },
                  { step: "Step 3", role: "Post-condition", color: "bg-[#0D0D0B]" },
                  { step: "Outcome", role: "", color: "bg-[#1447E6]" },
                  { step: "Notification", role: "", color: "bg-[#0D0D0B]" },
                ].map((s, i, arr) => (
                  <div key={s.step} className="flex items-center gap-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${s.color}`}>
                        <span className="text-white text-[9px] font-display font-[700]">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-px h-8 bg-[#DEDEDB]" />}
                    </div>
                    <div className="ml-4">
                      <div className="font-display font-[700] text-sm text-[#0D0D0B]">{s.step}</div>
                      {s.role && <div className="text-xs text-[#6B6B67]">{s.role}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FeatureSection>

          <FeatureSection
            label="Module 06"
            title="Notification Builder"
            desc="The notification system supports multiple communication channels. Users can select an SMS gateway and construct messages using dynamic application data, or configure email with dynamic field placeholders that pull live data from the application."
          >
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DEDEDB] p-5 rounded-[10px]">
                <div className="text-xs tracking-widest uppercase text-[#1447E6] font-medium mb-3">SMS</div>
                <p className="text-sm text-[#6B6B67]">Select an SMS gateway and construct the message using dynamic application data.</p>
              </div>
              <div className="bg-white border border-[#DEDEDB] p-5">
                <div className="text-xs tracking-widest uppercase text-[#1447E6] font-medium mb-3">Email</div>
                <div className="space-y-2 mb-3">
                  {["Subject", "Message", "Object", "Field"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="text-xs text-[#6B6B67] w-16">{f}</span>
                      <div className="flex-1 h-7 bg-[#F7F7F5] border border-[#DEDEDB] rounded-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["{first_name}", "{company}", "{industry}"].map((p) => (
                    <span key={p} className="font-mono text-xs text-[#1447E6] bg-[#E8F0FE] px-2 py-0.5 rounded-sm">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </FeatureSection>
        </section>

        {/* DESIGN SYSTEM */}
        <section className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="Design System Thinking" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl text-[#0D0D0B] mb-6 leading-tight">
                Consistency is critical when a platform has multiple builders.
              </h2>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed">
                Because LCAP contains multiple builders and configuration-heavy interfaces, the experience relies on repeated patterns that scale as new components are introduced.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Navigation", desc: "Persistent navigation gives users access to the platform's primary modules." },
                { title: "Lists", desc: "Applications, forms, reports and records use repeatable list structures." },
                { title: "Builders", desc: "Form Builder and Report Builder follow a component/configuration model." },
                { title: "Progressive Config", desc: "Object → Component → Property → Configuration — a reusable pattern throughout." },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#DEDEDB] p-5 rounded-[10px]">
                  <div className="font-display font-[700] text-sm text-[#0D0D0B] mb-2">{item.title}</div>
                  <p className="text-xs text-[#6B6B67] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY UX PRINCIPLES */}
        <section id="principles" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="Key UX Principles" />
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl text-[#0D0D0B] leading-tight">
                Five principles that guided every design decision.
              </h2>
            </div>
            <div>
              <PrincipleRow
                num="01"
                title="Progressive Disclosure"
                desc="Expose complexity when users need it instead of presenting every configuration option at once."
              />
              <PrincipleRow
                num="02"
                title="Consistent Patterns"
                desc="Use the same interaction model across Forms, Reports, Tables and Workflows."
              />
              <PrincipleRow
                num="03"
                title="Clear Hierarchy"
                desc="Separate application-level decisions from field-level configuration."
              />
              <PrincipleRow
                num="04"
                title="Visual Configuration"
                desc="Use builders and structured controls wherever possible instead of requiring technical input."
              />
              <PrincipleRow
                num="05"
                title="Scalability"
                desc="Design patterns should work for both a small application and an organisation managing many applications."
              />
            </div>
          </div>
        </section>

        {/* DESIGN CONTRIBUTION */}
        <section className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="My Design Contribution" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl text-[#0D0D0B] mb-4 leading-tight">
                End-to-end ownership across the full platform.
              </h2>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed">
                As a UI/UX Designer, the work spanned information architecture, enterprise UX patterns, builder interfaces and scalable design systems.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Information architecture",
                "Enterprise UX architecture",
                "Application management experiences",
                "Form Builder UX",
                "Report Builder UX",
                "Workflow Builder UX",
                "Schema and data management",
                "Component-based interaction design",
                "Configuration patterns",
                "Responsive and scalable UI patterns",
                "Design consistency across complex workflows",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-[#3A3A37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1447E6] mt-1.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section id="outcome" className="py-16 border-b border-[#DEDEDB]">
          <SectionLabel label="Outcome" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
            <div>
              <h2 className="font-display font-[700] text-3xl md:text-4xl text-[#0D0D0B] mb-6 leading-tight">
                Multiple stages of application development in a single platform.
              </h2>
              <div className="flex items-center gap-2 flex-wrap mb-8 py-4 px-5 bg-white border border-[#DEDEDB] rounded-[10px]">
                {["Create", "Structure", "Build", "Automate", "Notify", "Analyse"].map((phase, i, arr) => (
                  <span key={phase} className="flex items-center gap-2">
                    <span className="font-display font-[700] text-sm text-[#0D0D0B]">{phase}</span>
                    {i < arr.length - 1 && <span className="text-[#1447E6]">→</span>}
                  </span>
                ))}
              </div>
              <p className="text-[15px] text-[#3A3A37] leading-relaxed">
                Instead of treating application development, data management, form creation, reporting and workflow automation as separate tools, LCAP connects them through a common configuration experience.
              </p>
            </div>
            <div className="bg-[#0D0D0B] p-8 rounded-[10px] flex flex-col justify-between">
              <div className="text-xs tracking-widest uppercase text-white/40 mb-6">What I Learned</div>
              <blockquote className="font-display font-[700] text-xl text-white leading-snug mb-6">
                "The more powerful a product becomes, the more important its information architecture becomes."
              </blockquote>
              <p className="text-sm text-white/60 leading-relaxed">
                The challenge isn't simply giving users more capabilities. It is helping them understand where each capability belongs, what it affects and what they should do next.
              </p>
            </div>
          </div>
        </section>

        {/* CASE STUDY SUMMARY */}
        <section className="py-16">
          <SectionLabel label="Case Study Summary" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Project", value: "LCAP", sub: "Low-Code Application Platform" },
              { label: "Designed for", value: "Enterprise", sub: "Application configuration" },
              { label: "Core UX", value: "6 Modules", sub: "App · Schema · Forms · Reports · Workflow · Notifications" },
              { label: "Design approach", value: "Structured", sub: "Modular · Scalable · Configuration-driven" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#DEDEDB] p-6 rounded-[10px]">
                <div className="text-xs tracking-widest uppercase text-[#6B6B67] mb-3">{item.label}</div>
                <div className="font-display font-[900] text-2xl text-[#0D0D0B] mb-2">{item.value}</div>
                <div className="text-xs text-[#6B6B67] leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 bg-[#1447E6] rounded-[10px]">
            <div className="text-xs tracking-widest uppercase text-white/60 mb-3">Key Takeaway</div>
            <p className="font-display font-[700] text-xl md:text-2xl text-white max-w-3xl leading-snug">
              Making complex enterprise configuration feel simple through clear information architecture and reusable interaction patterns.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#DEDEDB] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-[700] text-sm text-[#0D0D0B] mb-1">
              LCAP<span className="text-[#1447E6]">.</span> Case Study
            </div>
            <div className="text-xs text-[#6B6B67]">UI/UX Design · Enterprise SaaS · Low-Code Application Platform</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag>Product Design</Tag>
            <Tag>UX Architecture</Tag>
            <Tag>Design Systems</Tag>
          </div>
        </div>
      </footer>
    </div>
  );
}
