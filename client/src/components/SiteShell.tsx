import { useState, type ReactNode } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { PspLogo } from "@/components/PspLogo";
import { useCopy } from "@/lib/i18n";

export type Language = "EN" | "FR" | "SW";


export function SiteShell({ children, active, language = "EN", onLanguageChange }: { children: ReactNode; active?: string; language?: Language; onLanguageChange?: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  const t = useCopy(language).nav;
  const nav = [
    ["/verification", t.verification],
    ["/protection", t.protection],
    ["/survivor", t.survivor],
    ["/news", t.news],
    ["/about", t.about],
  ];
  const changeLanguage = (next: Language) => onLanguageChange?.(next);
  return (
    <div className="min-h-screen bg-[#f6f9fb] text-[#10202f]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061528]/95 text-white shadow-[0_8px_30px_rgba(4,12,25,.16)] backdrop-blur-xl">
        <div className="container flex min-h-[76px] items-center justify-between gap-6">
          <a href="/" onClick={() => setOpen(false)} aria-label="Project Safe Passage home"><PspLogo /></a>
          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map(([href, label]) => <a key={href} href={href} className={`text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:text-white ${active === href ? "text-[#57e6b1]" : "text-slate-400"}`}>{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex rounded-full border border-white/10 p-0.5 text-[10px] font-semibold tracking-[0.12em] text-slate-400" aria-label={t.language}>
              {(["EN", "FR", "SW"] as Language[]).map((item) => <button key={item} onClick={() => changeLanguage(item)} className={`rounded-full px-2.5 py-1.5 transition ${language === item ? "bg-white/10 text-white" : "hover:text-white"}`}>{item}</button>)}
            </div>
            <a href="/verification" className="inline-flex items-center gap-2 rounded-full bg-[#57e6b1] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#062219] transition hover:bg-[#80f0c5] active:scale-[.98]">{t.cta}<ArrowRight size={14} /></a>
          </div>
          <button aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} className="rounded-xl border border-white/10 p-2 text-slate-300 sm:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {open && <div className="border-t border-white/10 bg-[#061528] px-5 py-5 sm:hidden"><div className="flex flex-col gap-4">{nav.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">{label}</a>)}<div className="flex gap-2 pt-2">{(["EN", "FR", "SW"] as Language[]).map((item) => <button key={item} onClick={() => changeLanguage(item)} className={`rounded-full border px-3 py-2 text-[10px] ${language === item ? "border-[#57e6b1] text-[#57e6b1]" : "border-white/10 text-slate-400"}`}>{item}</button>)}</div><a href="/verification" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#57e6b1] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#062219]">{t.cta}<ArrowRight size={14} /></a></div></div>}
      </header>
      {children}
      <footer className="bg-[#061528] py-10 text-slate-400">
        <div className="container">
          <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 lg:flex-row lg:items-center">
            <div><PspLogo /><p className="mt-4 max-w-md text-xs leading-6 text-slate-500">{useCopy(language).footer}</p></div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400 sm:grid-cols-3">{nav.map(([href, label]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}</div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] leading-5 text-slate-500 sm:flex-row"><span>© 2026 Project Safe Passage · IMI Initiative</span><span><a href="mailto:fangterrence20@gmail.com" className="transition hover:text-white">fangterrence20@gmail.com</a> · Use official channels to report urgent danger.</span></div>
        </div>
      </footer>
    </div>
  );
}
