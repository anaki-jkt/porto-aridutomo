"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const contactInfo = [
  { icon: "email", key: "email", value: "sosial.aridutomo@gmail.com", href: "mailto:sosial.aridutomo@gmail.com", color: "from-blue-500 to-blue-600" },
  { icon: "linkedin", key: "linkedin", href: "https://linkedin.com", color: "from-cyan-500 to-blue-500" },
  { icon: "github", key: "github", href: "https://github.com", color: "from-slate-600 to-slate-700" },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${getContactValue("email")}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getContactValue = (key: string, value?: string) => {
    if (key === "email") return value || "";
    if (key === "linkedin") return t.contact.linkedin;
    if (key === "github") return t.contact.github;
    return "";
  };

  const renderIcon = (type: string) => {
    if (type === "email") return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    if (type === "linkedin") return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>;
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-green-50 text-sm text-green-600 mb-4 font-medium">{t.contact.title}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{t.contact.heading} <span className="gradient-text">{t.contact.headingHighlight}</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className={`lg:col-span-2 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-slate-800">{t.contact.infoTitle}</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a key={index} href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all group cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>{renderIcon(info.icon)}</div>
                    <div><p className="text-sm text-slate-500">{t.contact[info.key as keyof typeof t.contact]}</p><p className="font-medium group-hover:text-blue-600 transition-colors text-slate-800">{getContactValue(info.key, info.value)}</p></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`lg:col-span-3 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-semibold text-slate-800">{t.contact.formTitle}</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div><label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700">{t.contact.name}</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800 placeholder-slate-400" placeholder={t.contact.namePlaceholder} /></div>
                <div><label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700">{t.contact.emailLabel}</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800 placeholder-slate-400" placeholder={t.contact.emailPlaceholder} /></div>
              </div>
              <div><label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-700">{t.contact.subject}</label><input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800 placeholder-slate-400" placeholder={t.contact.subjectPlaceholder} /></div>
              <div><label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700">{t.contact.message}</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800 placeholder-slate-400 resize-none" placeholder={t.contact.messagePlaceholder} /></div>
              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>{t.contact.send}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
