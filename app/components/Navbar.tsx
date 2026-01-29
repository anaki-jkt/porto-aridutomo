"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const navLinks = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLabel = (key: string) => {
    return t.nav[key as keyof typeof t.nav] || key;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-yellow-400 flex items-center justify-center font-bold text-lg text-white">A</div>
            <span className="font-semibold text-lg hidden sm:block text-slate-800">Ari</span>
          </a>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === link.href.replace("#", "") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"}`}>{getLabel(link.key)}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 cursor-pointer">
              <span>{t.nav.letsTalk}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer text-slate-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === link.href.replace("#", "") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"}`}>{getLabel(link.key)}</a>
            ))}
            <div className="px-4 py-2">
              <LanguageToggle />
            </div>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mx-4 mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium text-center cursor-pointer">{t.nav.letsTalk}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
