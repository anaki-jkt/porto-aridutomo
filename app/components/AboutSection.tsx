"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const stats = [
  { value: "5+", key: "experience" },
  { value: "10+", key: "projects" },
  { value: "5+", key: "techStack" },
  { value: "100%", key: "satisfaction" },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getStatLabel = (key: string) => {
    return t.about.stats[key as keyof typeof t.about.stats] || key;
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-20 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-sm text-blue-600 mb-4 font-medium">{t.about.title}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{t.about.heading} <span className="gradient-text">{t.about.headingHighlight}</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-2xl font-bold text-white">A</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">Ari Dwi Utomo</h3>
                    <p className="text-blue-600">{t.about.positionValue}</p>
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div><p className="text-sm text-slate-500">{t.about.dob}</p><p className="font-medium text-slate-800">{t.about.dobValue}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div><p className="text-sm text-slate-500">{t.about.location}</p><p className="font-medium text-slate-800">{t.about.locationValue}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div><p className="text-sm text-slate-500">{t.about.position}</p><p className="font-medium text-slate-800">{t.about.positionValue}</p></div>
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                <a href="#contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>{t.about.downloadResume}</span>
                </a>
              </div>
            </div>
          </div>

          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-800">{t.about.experienceTitle}</h3>
              <p className="text-slate-600 leading-relaxed">{t.about.desc1}</p>
              <p className="text-slate-600 leading-relaxed">{t.about.desc2}</p>
              <p className="text-slate-600 leading-relaxed">{t.about.desc3}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 text-center group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer">
                  <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500">{getStatLabel(stat.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
