"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface Technology {
  id: string;
  name: string;
  category: string;
  color: string;
  order: number;
}

const CATEGORY_META: Record<string, { icon: string; color: string; dotColor: string }> = {
  backend:  { icon: "server",   color: "from-blue-500 to-blue-600",   dotColor: "bg-blue-500" },
  frontend: { icon: "monitor",  color: "from-cyan-500 to-blue-500",   dotColor: "bg-cyan-500" },
  mobile:   { icon: "mobile",   color: "from-sky-400 to-blue-500",    dotColor: "bg-sky-500" },
  database: { icon: "database", color: "from-yellow-400 to-yellow-500", dotColor: "bg-yellow-500" },
  tools:    { icon: "settings", color: "from-green-400 to-green-500", dotColor: "bg-green-500" },
};

const renderIcon = (type: string) => {
  if (type === "server") return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
  if (type === "monitor") return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
  if (type === "mobile") return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  if (type === "database") return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/cms/technologies")
      .then((r) => r.json())
      .then((data: Technology[]) => setTechnologies(data))
      .catch(() => {});
  }, []);

  const getCategoryTitle = (key: string) => {
    return t.skills.categories[key as keyof typeof t.skills.categories] || key;
  };

  const categories = Object.keys(CATEGORY_META);
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = technologies.filter((t) => t.category === cat);
    return acc;
  }, {} as Record<string, Technology[]>);

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 lg:py-32 px-4 bg-linear-to-b from-white to-blue-50/50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-50 text-sm text-cyan-600 mb-4 font-medium">{t.skills.title}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{t.skills.heading} <span className="gradient-text">{t.skills.headingHighlight}</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-16 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
          {technologies.map((tech) => (
            <span key={tech.id} className={`px-4 py-2 rounded-full border text-sm font-medium tech-badge cursor-pointer ${tech.color}`}>{tech.name}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((catKey, catIndex) => {
            const meta = CATEGORY_META[catKey];
            const skills = grouped[catKey] || [];
            return (
              <div key={catKey} className={`glass-card rounded-3xl p-6 lg:p-8 group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: isVisible ? `${(catIndex + 2) * 0.1}s` : "0s" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${meta.color} flex items-center justify-center text-white`}>{renderIcon(meta.icon)}</div>
                  <h3 className="text-xl font-semibold text-slate-800">{getCategoryTitle(catKey)}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, skillIndex) => (
                    <div
                      key={skill.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                      style={{ animationDelay: isVisible ? `${skillIndex * 0.05 + 0.3}s` : "0s" }}
                    >
                      <span>{skill.name}</span>
                      <span className={`w-2 h-2 rounded-full ${meta.dotColor}`}></span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
