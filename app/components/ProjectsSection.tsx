"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  id: string;
  title: string;
  descId: string;
  descEn: string;
  url: string;
  tags: string; // JSON string dari API
  type: string;
  color: string;
  featured: boolean;
  hasNote: boolean;
  order: number;
  published: boolean;
}

export default function ProjectsSection() {
  const { t, locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/cms/projects")
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => {});
  }, []);

  const filters = [
    { key: "all", label: t.projects.filters.all },
    { key: "featured", label: t.projects.filters.featured },
    { key: "web", label: t.projects.filters.web },
    { key: "mobile", label: t.projects.filters.mobile },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    if (filter === "web") return project.type.toLowerCase().includes("web") || project.type.toLowerCase().includes("website");
    if (filter === "mobile") return project.type.toLowerCase().includes("mobile");
    return true;
  });

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-50 text-sm text-yellow-600 mb-4 font-medium">{t.projects.title}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{t.projects.heading} <span className="gradient-text">{t.projects.headingHighlight}</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${filter === f.key ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50"}`}>{f.label}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`project-card glass-card rounded-3xl overflow-hidden group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: isVisible ? `${(index + 2) * 0.1}s` : "0s" }}>
              <div className={`h-40 bg-linear-to-br ${project.color} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium text-white">{project.type}</span>
                  {project.featured && <span className="ml-2 px-3 py-1 bg-yellow-400/30 backdrop-blur-sm rounded-full text-xs font-medium text-white">★ {t.projects.featured}</span>}
                </div>
                <div className="project-overlay absolute inset-0 bg-slate-900/60 opacity-0 flex items-center justify-center transition-opacity duration-300">
                  {project.url !== "#" ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-medium flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer">
                      <span>{t.projects.visit}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ) : <span className="px-6 py-3 rounded-xl bg-slate-500 text-white font-medium">{t.projects.private}</span>}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors text-slate-800">{project.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{locale === "id" ? project.descId : project.descEn}</p>
                {project.hasNote && <p className="text-amber-600 text-xs mb-4 italic">* {t.projects.projectNote}</p>}
                <div className="flex flex-wrap gap-2">
                  {(() => { try { const t = JSON.parse(project.tags || "[]"); return t.slice(0, 3).map((tag: string, i: number) => (<span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{tag}</span>)); } catch { return null; } })()}
                  {(() => { try { const t = JSON.parse(project.tags || "[]"); return t.length > 3 ? <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">+{t.length - 3}</span> : null; } catch { return null; } })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
