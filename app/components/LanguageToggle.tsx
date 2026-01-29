"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-sm font-medium transition-all duration-300 cursor-pointer"
      aria-label="Toggle language"
    >
      <span className={`${locale === "id" ? "text-blue-600" : "text-slate-400"}`}>ID</span>
      <span className="text-slate-300">/</span>
      <span className={`${locale === "en" ? "text-blue-600" : "text-slate-400"}`}>EN</span>
    </button>
  );
}
