"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const projects = [
  { title: "Unicorn Indorent", descId: "Platform pembelian tiket bus online dengan aplikasi web dan mobile. Dilengkapi dashboard untuk monitoring seluruh operasional dan transaksi.", descEn: "Online bus ticket booking platform with web and mobile applications. Equipped with a dashboard for monitoring all operations and transactions.", url: "http://unicorn.indorent.co.id/", tags: ["ASP.NET", "Mobile App", "Dashboard", "Ticketing"], type: "Web & Mobile App", color: "from-blue-500 to-blue-600", featured: true },
  { title: "Unicorn Crew", descId: "Aplikasi mobile Android untuk crew bus. Digunakan untuk monitoring perjalanan, melihat manifest penumpang, dan membuat trip report.", descEn: "Android mobile app for bus crew. Used for trip monitoring, viewing passenger manifest, and creating trip reports.", url: "#", tags: ["Flutter", "Android", "Trip Management"], type: "Mobile Application", color: "from-indigo-500 to-blue-500", featured: true },
  { title: "Unicorn Agent", descId: "Aplikasi untuk agent dalam melakukan pemesanan tiket bus secara online. Memudahkan agent mengelola booking dan transaksi pelanggan.", descEn: "Application for agents to book bus tickets online. Makes it easy for agents to manage bookings and customer transactions.", url: "#", tags: ["Flutter", "Android", "Booking"], type: "Mobile Application", color: "from-purple-500 to-indigo-500", featured: true },
  { title: "Indorent Website", descId: "Website korporat untuk PT CSM Corporatama (Indorent), perusahaan rental mobil terkemuka di Indonesia.", descEn: "Corporate website for PT CSM Corporatama (Indorent), a leading car rental company in Indonesia.", url: "https://www.indorent.co.id/", tags: ["Corporate", "Web Development", "SEO"], type: "Website", color: "from-cyan-500 to-blue-500", featured: true },
  { title: "Indopenske", descId: "Website korporat untuk Indo Penske Logistics, menampilkan solusi logistik dan supply chain mereka.", descEn: "Corporate website for Indo Penske Logistics, showcasing their logistics and supply chain solutions.", url: "https://indopenske.co.id/", tags: ["Corporate", "Logistics", "Web Development"], type: "Website", color: "from-green-500 to-emerald-500", featured: false },
  { title: "SIP Express", descId: "Platform pelacakan pengiriman barang. Customer dapat melacak status dan posisi kiriman secara real-time menggunakan nomor resi.", descEn: "Shipment tracking platform. Customers can track package status and location in real-time using their tracking number.", url: "https://sipexpress.co.id/", tags: ["Tracking", "Logistics", "Web App"], type: "Web Application", color: "from-yellow-400 to-orange-400", featured: true },
  { title: "SIP Express Plus", descId: "Solusi pengiriman barang B2B yang mudah, cepat, dan aman. Memberikan kualitas pelayanan terbaik agar barang kiriman sampai tujuan dengan aman dan tepat waktu.", descEn: "B2B delivery solution that is easy, fast, and secure. Providing the best quality service to ensure packages arrive safely and on time.", url: "#", tags: ["Logistics", "B2B", "Delivery"], type: "Web Application", color: "from-orange-400 to-red-400" },
  { title: "MRBS Indorent", descId: "Meeting Room Booking System untuk manajemen ruang kerja dan penjadwalan yang efisien.", descEn: "Meeting Room Booking System for efficient workspace management and scheduling.", url: "#", tags: ["Booking System", "Enterprise", "Maintenance"], type: "Internal Tool", color: "from-violet-500 to-purple-500", featured: false },
  { title: "VOC Indorent", descId: "Platform Voice of Customer untuk mengumpulkan dan mengelola feedback serta survei kepuasan pelanggan.", descEn: "Voice of Customer platform for collecting and managing customer feedback and satisfaction surveys.", url: "#", tags: ["Customer Feedback", "Analytics", "Maintenance"], type: "Web Application", color: "from-teal-500 to-cyan-500", featured: false },
  { title: "Recruitment Indorent", descId: "Portal rekrutmen HR untuk posting lowongan, aplikasi, dan sistem manajemen kandidat.", descEn: "HR recruitment portal for job postings, applications, and candidate management system.", url: "https://recruitment.indorent.co.id/", tags: ["HR Tech", "Recruitment", "Portal"], type: "Web Application", color: "from-blue-500 to-indigo-500", featured: false },
  { title: "Elite Car Rental", descId: "Aplikasi ride-hailing lengkap mirip Grab/Gojek. User bisa booking ride, cari driver, dan bayar melalui Midtrans.", descEn: "Full-featured ride-hailing application similar to Grab/Gojek. Users can book rides, find drivers, and pay through Midtrans.", url: "#", tags: ["Mobile App", "Ride-hailing", "Midtrans", "Maps"], type: "Web & Mobile Application", color: "from-yellow-400 to-yellow-500", featured: false, hasNote: true },
];

export default function ProjectsSection() {
  const { t, locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${filter === f.key ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50"}`}>{f.label}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`project-card glass-card rounded-3xl overflow-hidden group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: isVisible ? `${(index + 2) * 0.1}s` : "0s" }}>
              <div className={`h-40 bg-gradient-to-br ${project.color} p-6 relative overflow-hidden`}>
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
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (<span key={tagIndex} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{tag}</span>))}
                  {project.tags.length > 3 && <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">+{project.tags.length - 3}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
