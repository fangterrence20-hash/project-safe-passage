import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Fingerprint,
  Globe2,
  Handshake,
  Landmark,
  LockKeyhole,
  MapPin,
  Menu,
  Network,
  Radar,
  ScanLine,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const agencies = [
  {
    name: "EastBridge Labour Mobility",
    id: "TZ-PEA-00041",
    countries: "Tanzania · Oman · UAE",
    routes: "Middle East Corridor",
    category: "Labor Recruitment",
    status: "VERIFIED",
    score: 94,
    fees: "Fee schedule verified · no worker-paid placement fee",
    audited: "18 Jun 2026",
    hash: "0x7a4d…91fe",
    initials: "EB",
    tone: "emerald",
  },
  {
    name: "Kilimanjaro Study Pathways",
    id: "TZ-EDU-00018",
    countries: "Tanzania · UK · Ireland",
    routes: "Western Corridor",
    category: "Education Agency",
    status: "VERIFIED",
    score: 91,
    fees: "Fee schedule verified · student disclosures on file",
    audited: "02 May 2026",
    hash: "0x3f19…c12a",
    initials: "KS",
    tone: "blue",
  },
  {
    name: "Horizon Talent Connect",
    id: "TZ-PEA-00107",
    countries: "Tanzania · Saudi Arabia",
    routes: "Middle East Corridor",
    category: "Labor Recruitment",
    status: "UNDER AUDIT",
    score: 68,
    fees: "Awaiting updated contract and fee disclosures",
    audited: "In progress",
    hash: "0x9be2…44d0",
    initials: "HT",
    tone: "amber",
  },
  {
    name: "Mwanza Global Scholars",
    id: "TZ-EDU-00063",
    countries: "Tanzania · Germany · Netherlands",
    routes: "Western Corridor",
    category: "Education Agency",
    status: "VERIFIED",
    score: 88,
    fees: "Fee schedule verified · refund terms published",
    audited: "21 Apr 2026",
    hash: "0x1c6a…d7b4",
    initials: "MG",
    tone: "violet",
  },
  {
    name: "Nexus Online Careers",
    id: "TZ-PEA-00092",
    countries: "Tanzania · Malaysia",
    routes: "Southeast Asia Corridor",
    category: "Labor Recruitment",
    status: "REVOKED / BLACKLISTED",
    score: 24,
    fees: "Licence revoked · do not send funds or documents",
    audited: "11 Mar 2026",
    hash: "0xa820…e3cc",
    initials: "NO",
    tone: "red",
  },
];

const pillars = [
  { number: "01", title: "Legal Compliance", swahili: "Uzingatiaji wa Sheria", description: "Licensing and registration verification for every travel, recruitment, and education agency in the intake queue.", icon: Landmark, stat: "Registration evidence", detail: "We verify the operating licence, beneficial ownership, registration status, and authority to place or advise travellers." },
  { number: "02", title: "Financial Transparency", swahili: "Uwazi wa Kifedha", description: "A review of client-fund handling, fee schedules, refunds, and the money trail behind every promise.", icon: BarChart3, stat: "Client funds audited", detail: "Agencies must disclose fees and demonstrate controls that prevent hidden charges, diversion of funds, or worker-paid placement abuse." },
  { number: "03", title: "Client Protection Protocols", swahili: "Ulinzi wa Wasafiri", description: "Safeguards that protect migrants and students before, during, and after a placement or journey.", icon: ShieldCheck, stat: "Protection controls", detail: "We test contracts, consent, grievance handling, emergency contacts, data protection, and escalation pathways for risk." },
  { number: "04", title: "Ethical Recruitment Standards", swahili: "Uajiri wa Kimaadili", description: "Fair, honest, and non-coercive recruitment practices aligned with responsible mobility standards.", icon: Handshake, stat: "Integrity interview", detail: "Evidence includes advertising claims, recruiter conduct, employer checks, contract clarity, and treatment of vulnerable applicants." },
  { number: "05", title: "International Migration Law", swahili: "Sheria za Uhamiaji Duniani", description: "Adherence to global legal frameworks, UN GCM principles, and anti-trafficking obligations across corridors.", icon: Globe2, stat: "Framework alignment", detail: "A seal is not self-declared: the board records legal alignment, risk exceptions, and the evidence behind every score." },
];

const governanceCycle = [
  { number: "01", title: "Direction", label: "Set the signal", detail: "Define intelligence requirements and migration risk priorities.", icon: Radar },
  { number: "02", title: "Collection", label: "Gather the evidence", detail: "Collect agency data, survivor testimony, and field intelligence.", icon: Search },
  { number: "03", title: "Processing", label: "Structure the record", detail: "Filter, organize, and normalize raw information for review.", icon: SlidersHorizontal },
  { number: "04", title: "Analysis", label: "Score the integrity", detail: "Evaluate compliance, fraud risk, and five-point audit results.", icon: BarChart3 },
  { number: "05", title: "Dissemination", label: "Publish the truth", detail: "Release white-list status, alerts, and migration integrity reports.", icon: Network },
];

const corridorCards = [
  { name: "Middle East", route: "Oman · UAE · Saudi Arabia", risk: "Contract fraud & exploitation", color: "emerald", icon: MapPin },
  { name: "Western Corridor", route: "UK · Europe · USA", risk: "Visa & education scams", color: "amber", icon: Globe2 },
  { name: "Southeast Asia", route: "Online job scam routes", risk: "Forced cyber-slavery", color: "violet", icon: Network },
];

function StatusBadge({ status }: { status: string }) {
  const styles = status === "VERIFIED"
    ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
    : status === "UNDER AUDIT"
      ? "border-amber-300/25 bg-amber-300/10 text-amber-200"
      : "border-red-300/25 bg-red-400/10 text-red-300";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ${styles}`}>
      {status === "VERIFIED" ? <CheckCircle2 size={12} /> : status === "UNDER AUDIT" ? <Activity size={12} /> : <AlertTriangle size={12} />}
      {status}
    </span>
  );
}

function SectionKicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${light ? "text-emerald-300" : "text-emerald-700"}`}>
      <span className={`h-px w-7 ${light ? "bg-emerald-400/60" : "bg-emerald-600/50"}`} />
      {children}
    </div>
  );
}

function Modal({ title, eyebrow, children, onClose }: { title: string; eyebrow: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#020a13]/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0d1a27] p-6 shadow-2xl shadow-black/40 sm:max-w-xl sm:rounded-[28px] sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">{eyebrow}</p>
            <h2 id="modal-title" className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          </div>
          <button aria-label="Close dialog" onClick={onClose} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-white/25 hover:text-white"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<"EN" | "FR" | "SW">("EN");
  const labels = language === "FR" ? { mission: "Mission", audit: "Audit en 5 points", governance: "Intelligence KPI", registry: "Liste blanche", corridors: "Corridors africains", cta: "Rechercher la liste" } : language === "SW" ? { mission: "Dhamira", audit: "Ukaguzi", governance: "Ujasusi wa KPI", registry: "Usajili", corridors: "Njia za Afrika", cta: "Tafuta usajili" } : { mission: "Mission", audit: "5-point audit", governance: "KPI intelligence", registry: "White List", corridors: "African corridors", cta: "Search White List" };
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [selectedAgency, setSelectedAgency] = useState<typeof agencies[number] | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const visibleAgencies = useMemo(() => agencies.filter((agency) => {
    const matchesQuery = `${agency.name} ${agency.id} ${agency.countries} ${agency.routes}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All categories" || agency.category === category;
    const matchesStatus = status === "All statuses" || agency.status === status;
    return matchesQuery && matchesCategory && matchesStatus;
  }), [query, category, status]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f8f8] text-[#10202f]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#071522]/90 backdrop-blur-xl">
        <div className="container flex h-[74px] items-center justify-between gap-6">
          <button onClick={() => scrollTo("top")} className="group flex items-center gap-3 text-left">
            <span className="relative grid h-9 w-9 place-items-center rounded-[11px] border border-emerald-300/30 bg-emerald-300/10 text-emerald-300 shadow-[0_0_30px_rgba(64,224,161,0.12)]"><ShieldCheck size={20} strokeWidth={1.7} /><span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#071522] bg-emerald-300" /></span>
            <span className="leading-none"><span className="block font-display text-[15px] font-semibold tracking-wide text-white">PROJECT SAFE PASSAGE</span><span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-slate-400">Intelligence · Integrity · Protection</span></span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {[{ id: "mission", label: labels.mission }, { id: "pillars", label: labels.audit }, { id: "governance", label: labels.governance }, { id: "registry", label: labels.registry }, { id: "corridors", label: labels.corridors }].map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-300 transition hover:text-white">{item.label}</button>)}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex rounded-full border border-white/10 p-0.5 text-[10px] font-semibold tracking-[0.12em] text-slate-400">
              <button onClick={() => setLanguage("FR")} className={`rounded-full px-2.5 py-1.5 transition ${language === "FR" ? "bg-white/10 text-white" : "hover:text-white"}`}>FR</button>
              <button onClick={() => setLanguage("EN")} className={`rounded-full px-2.5 py-1.5 transition ${language === "EN" ? "bg-white/10 text-white" : "hover:text-white"}`}>EN</button>
              <button onClick={() => setLanguage("SW")} className={`rounded-full px-2.5 py-1.5 transition ${language === "SW" ? "bg-white/10 text-white" : "hover:text-white"}`}>SW</button>
            </div>
            <button onClick={() => scrollTo("registry")} className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#082016] transition hover:bg-emerald-200 active:scale-[0.97]">{labels.cta}<ArrowRight size={14} /></button>
          </div>
          <button aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)} className="rounded-lg border border-white/10 p-2 text-slate-300 sm:hidden">{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileMenu && <div className="border-t border-white/10 bg-[#071522] px-5 py-5 sm:hidden"><div className="flex flex-col gap-4">{["mission", "pillars", "governance", "registry", "corridors"].map((id) => <button key={id} onClick={() => scrollTo(id)} className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">{id}</button>)}<button onClick={() => scrollTo("registry")} className="mt-2 rounded-full bg-emerald-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#082016]">Search registry</button></div></div>}
      </header>

      <main id="top">
        <section className="relative isolate min-h-[730px] overflow-hidden bg-[#071522] pt-[74px] text-white">
          <div className="absolute inset-0 bg-[url('/manus-storage/psp-network-texture_120dd999.png')] bg-cover bg-[center_right] opacity-85" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071522_0%,rgba(7,21,34,.96)_28%,rgba(7,21,34,.6)_62%,rgba(7,21,34,.12)_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:78px_78px]" />
          <div className="container relative flex min-h-[656px] flex-col justify-center pb-14 pt-20">
            <div className="max-w-[720px]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" /></span> Africa · intelligence network</div>
              <h1 className="max-w-[760px] font-display text-[clamp(3.3rem,7.6vw,6.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">Sanitizing global <span className="text-emerald-300">migration routes</span> through intelligence & transparency.</h1>
              <p className="mt-7 max-w-[570px] text-base leading-7 text-slate-300 sm:text-lg">Auditing travel agencies against a five-point integrity standard so migrants can verify who has earned the Digital Trust Seal.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => scrollTo("registry")} className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#082016] shadow-[0_10px_35px_rgba(64,224,161,0.16)] transition hover:bg-emerald-200 active:scale-[0.98]">Search digital registry <ArrowRight size={16} /></button><button onClick={() => setReportOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-emerald-300/60 hover:bg-white/[0.08] active:scale-[0.98]"><LockKeyhole size={15} className="text-emerald-300" /> Report scam / incident</button></div>
              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-slate-400"><span className="inline-flex items-center gap-2"><Check size={13} className="text-emerald-300" /> Before you pay, verify</span><span className="hidden h-3 w-px bg-white/20 sm:block" /><span className="inline-flex items-center gap-2"><Check size={13} className="text-emerald-300" /> Before you travel, be sure</span></div>
            </div>
            <div className="mt-16 grid max-w-[900px] grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[{ value: "140+", label: "Agencies audited" }, { value: "94%", label: "Evidence coverage" }, { value: "05", label: "Seal criteria" }].map((stat) => <div key={stat.label} className="bg-[#0a1a29]/80 px-5 py-5 backdrop-blur-sm sm:px-6"><p className="font-display text-3xl font-semibold text-white">{stat.value}</p><p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">{stat.label}</p></div>)}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 hidden w-[39%] max-w-[510px] p-8 lg:block"><div className="rounded-2xl border border-white/10 bg-[#081725]/75 p-5 shadow-2xl backdrop-blur-md"><div className="mb-5 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300"><Activity size={14} className="text-emerald-300" /> Live route watch</span><span className="text-[10px] text-emerald-300">● ACTIVE</span></div><div className="space-y-4">{[{ label: "JNIA / DAR ES SALAAM", value: "12 checks", color: "bg-emerald-300", width: "82%" }, { label: "NAMANGA / KENYA BORDER", value: "08 checks", color: "bg-amber-300", width: "57%" }, { label: "KIA / KILIMANJARO", value: "19 checks", color: "bg-emerald-300", width: "91%" }].map((row) => <div key={row.label}><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-slate-400"><span>{row.label}</span><span className="text-slate-200">{row.value}</span></div><div className="h-1 rounded-full bg-white/10"><div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }} /></div></div>)}</div><div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Last synced 02 min ago</div></div></div>
        </section>

        <section id="mission" className="scroll-mt-20 border-b border-slate-200 bg-[#f5f8f8] py-20 sm:py-28"><div className="container"><div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]"><div><SectionKicker>Why PSP exists</SectionKicker><h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#10202f] sm:text-6xl">A trust deficit is a <span className="text-emerald-700">protection</span> problem.</h2></div><div className="max-w-md pb-1 text-sm leading-7 text-slate-600"><p>Project Safe Passage is an intelligence-led, youth-focused humanitarian initiative. We move migration governance from reactive awareness to pre-emptive oversight.</p><p className="mt-4 font-medium text-[#10202f]">“Your future is precious. Don't let it be forged.”</p></div></div><div className="mt-14 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#0d1a27] p-6 text-white shadow-[0_20px_50px_rgba(16,32,47,.12)] md:col-span-2 md:p-8"><div className="flex items-start justify-between gap-6"><div><span className="mb-12 block text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">The mandate</span><h3 className="max-w-lg font-display text-2xl font-semibold leading-tight sm:text-3xl">Safeguarding the dream behind every departure.</h3></div><Landmark className="shrink-0 text-emerald-300" size={30} strokeWidth={1.4} /></div><p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">Aligned with national anti-trafficking laws, AU migration policy, the UN GCM, and corridor-specific frameworks across Africa.</p><div className="mt-7 flex flex-wrap gap-2">{["MOHA", "TaESA", "EAC", "SADC", "UN GCM"].map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-300">{tag}</span>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><span className="mb-12 block text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-600">The signal</span><div className="flex items-end gap-2"><span className="font-display text-6xl font-semibold tracking-[-0.06em] text-[#10202f]">3</span><span className="mb-2 text-sm text-slate-500">primary fraud vectors</span></div><div className="mt-6 space-y-3">{["Contract exploitation", "Visa & study scams", "Online job trafficking"].map((item, index) => <div key={item} className="flex items-center gap-3 text-sm text-slate-600"><span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 font-mono text-[10px] text-slate-500">0{index + 1}</span>{item}</div>)}</div></div></div></div></section>

        <section id="pillars" className="scroll-mt-20 bg-[#eaf1ef] py-20 sm:py-28"><div className="container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionKicker>Five-point Digital Trust Seal audit</SectionKicker><h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#10202f] sm:text-5xl">Trust is <span className="text-emerald-700">earned</span> in evidence.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-600">Every agency earns its seal by passing the full integrity audit. No self-declared ratings. No shortcuts.</p></div><div className="mt-12 grid gap-3 lg:grid-cols-[.8fr_1.2fr]"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{pillars.map((pillar, index) => { const Icon = pillar.icon; return <button key={pillar.number} onClick={() => setSelectedPillar(index)} className={`group rounded-2xl border p-5 text-left transition ${selectedPillar === index ? "border-[#10202f] bg-[#10202f] text-white shadow-[0_15px_35px_rgba(16,32,47,.14)]" : "border-white bg-white/65 text-[#10202f] hover:border-emerald-300 hover:bg-white"}`}><div className="flex items-center gap-4"><span className={`grid h-10 w-10 place-items-center rounded-xl ${selectedPillar === index ? "bg-emerald-300 text-[#082016]" : "bg-[#eaf1ef] text-emerald-700"}`}><Icon size={19} strokeWidth={1.8} /></span><span className="flex-1"><span className={`block text-[10px] font-semibold tracking-[0.14em] ${selectedPillar === index ? "text-emerald-300" : "text-emerald-700"}`}>{pillar.number} / AUDIT</span><span className="mt-1 block font-display text-lg font-semibold leading-tight">{pillar.title}</span></span><ChevronRight size={18} className={`transition-transform ${selectedPillar === index ? "translate-x-1 text-emerald-300" : "text-slate-300"}`} /></div></button>; })}</div><div className="relative overflow-hidden rounded-2xl bg-[#10202f] p-7 text-white sm:p-10"><div className="absolute -right-16 -top-16 h-60 w-60 rounded-full border border-emerald-300/15" /><div className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-emerald-300/10" /><div className="relative flex h-full flex-col justify-between"><div><div className="mb-8 flex items-center justify-between"><span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">{pillars[selectedPillar].swahili}</span><span className="font-mono text-xs text-slate-500">{pillars[selectedPillar].number} / 05</span></div><h3 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{pillars[selectedPillar].title}</h3><p className="mt-6 max-w-xl text-base leading-7 text-slate-300">{pillars[selectedPillar].description}</p></div><div className="mt-12 border-t border-white/10 pt-5"><div className="flex items-end justify-between gap-5"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Audit evidence required</span><span className="font-display text-xl font-semibold text-emerald-300">{pillars[selectedPillar].stat}</span></div><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">{pillars[selectedPillar].detail}</p></div></div></div></div></div></section>

        <section id="governance" className="scroll-mt-20 bg-[#10202f] py-20 text-white sm:py-28"><div className="container"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><SectionKicker light>KPI intelligence system</SectionKicker><h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">From raw signal to <span className="text-emerald-300">public trust.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-slate-400">PSP operates an evidence-based governance loop. It converts agency records, survivor testimony, and field intelligence into auditable decisions and public migration integrity reports.</p><div className="mt-8 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-5"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300"><Activity size={14} /> Operations scorecard</div><div className="mt-5 grid grid-cols-2 gap-4"><div><p className="font-display text-2xl font-semibold text-white">94%</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">Evidence coverage</p></div><div><p className="font-display text-2xl font-semibold text-white">18h</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">Alert response</p></div><div><p className="font-display text-2xl font-semibold text-white">87</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">Avg integrity score</p></div><div><p className="font-display text-2xl font-semibold text-white">05</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">Seal criteria</p></div></div></div></div><div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{governanceCycle.map((stage, index) => { const Icon = stage.icon; return <div key={stage.number} className={`relative rounded-2xl border p-5 ${index === 3 ? "border-amber-300/30 bg-amber-300/[0.08]" : "border-white/10 bg-white/[0.04]"}`}><div className="flex items-center justify-between"><span className="font-mono text-[11px] text-emerald-300">{stage.number}</span><Icon size={17} className={index === 3 ? "text-amber-200" : "text-slate-400"} /></div><h3 className="mt-8 font-display text-lg font-semibold text-white">{stage.title}</h3><p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">{stage.label}</p><p className="mt-4 text-xs leading-5 text-slate-400">{stage.detail}</p></div>; })}</div><div className="mt-4 rounded-2xl border border-white/10 bg-[#0d1a27] p-5 sm:p-6"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">KPI logic</p><p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Throughput, pass rate, average score, evidence coverage, alerts, response time, and white-list status are tracked as operating signals—not vanity metrics.</p></div><button onClick={() => scrollTo("registry")} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-300/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-300 transition hover:border-emerald-300/70 hover:bg-emerald-300/10">See verified agencies <ArrowRight size={14} /></button></div></div></div></div></div></section>
        <section id="registry" className="scroll-mt-20 bg-[#071522] py-20 text-white sm:py-28"><div className="container"><div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr]"><div><SectionKicker light>Digital trust registry</SectionKicker><h2 className="max-w-lg font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Check the signal before you <span className="text-emerald-300">commit.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-slate-400">The public white-list for prospective migrants and students. Search a travel agency by name, registration ID, route, or status before you pay.</p><div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300"><Fingerprint size={15} className="text-emerald-300" /> Blockchain-anchored identity</div><p className="text-xs leading-6 text-slate-400">Confirmed registered companies receive an immutable verification ID that can be independently referenced across the PSP network.</p><div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] p-3 font-mono text-[10px] text-emerald-200"><span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-300/15"><Check size={14} /></span> psp://trust/TZ-PEA-00041</div></div></div><div><div className="rounded-2xl border border-white/10 bg-[#0d1a27] p-4 sm:p-5"><div className="flex flex-col gap-3 xl:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Agency name, ID, or route" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-300/60" /></div><div className="grid grid-cols-2 gap-3 xl:w-[290px]"><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#142535] px-3 text-xs text-slate-300 outline-none focus:border-emerald-300/60"><option>All categories</option><option>Labor Recruitment</option><option>Education Agency</option></select><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#142535] px-3 text-xs text-slate-300 outline-none focus:border-emerald-300/60"><option>All statuses</option><option>VERIFIED</option><option>UNDER AUDIT</option><option>REVOKED / BLACKLISTED</option></select></div></div><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500"><SlidersHorizontal size={13} /> {visibleAgencies.length} matches · last synced today</span><span className="hidden text-[10px] uppercase tracking-[0.14em] text-emerald-300 sm:inline-flex sm:items-center sm:gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Registry operational</span></div></div><div className="mt-4 space-y-3">{visibleAgencies.slice(0, showAll ? visibleAgencies.length : 3).map((agency) => <button key={agency.id} onClick={() => setSelectedAgency(agency)} className="group w-full rounded-2xl border border-white/10 bg-[#0d1a27] p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-[#112333]"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-bold ${agency.tone === "emerald" ? "bg-emerald-300/15 text-emerald-300" : agency.tone === "amber" ? "bg-amber-300/15 text-amber-200" : agency.tone === "red" ? "bg-red-300/15 text-red-300" : agency.tone === "blue" ? "bg-sky-300/15 text-sky-300" : "bg-violet-300/15 text-violet-300"}`}>{agency.initials}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="font-display text-lg font-semibold text-white">{agency.name}</span><StatusBadge status={agency.status} /></span><span className="mt-1 block text-[11px] text-slate-500"><span className="font-mono text-slate-400">{agency.id}</span> <span className="mx-1.5 text-slate-700">·</span> {agency.countries} <span className="mx-1.5 text-slate-700">·</span> {agency.category}</span></span><span className="flex items-center justify-between gap-5 sm:justify-end"><span className="text-right"><span className="block text-[10px] uppercase tracking-[0.13em] text-slate-500">Trust score</span><span className={`font-display text-xl font-semibold ${agency.score > 80 ? "text-emerald-300" : agency.score > 50 ? "text-amber-200" : "text-red-300"}`}>{agency.score}<span className="text-xs text-slate-500">/100</span></span></span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-500 transition group-hover:border-emerald-300/40 group-hover:text-emerald-300"><ChevronRight size={17} /></span></span></div></button>)}{visibleAgencies.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-slate-400">No agencies match these filters. Try a different registration ID or status.</div>}{visibleAgencies.length > 3 && <button onClick={() => setShowAll(!showAll)} className="mt-2 w-full rounded-xl border border-white/10 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300 transition hover:border-emerald-300/40 hover:text-white">{showAll ? "Show fewer agencies" : `View all ${visibleAgencies.length} matching agencies`}</button>}</div></div></div></div></section>

        <section id="corridors" className="scroll-mt-20 bg-white py-20 sm:py-28"><div className="container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionKicker>Corridor intelligence</SectionKicker><h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#10202f] sm:text-5xl">Know the risk <span className="text-emerald-700">vector.</span></h2></div><button onClick={() => setReportOpen(true)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#10202f] transition hover:text-emerald-700">Report an incident <ArrowRight size={15} /></button></div><div className="mt-12 grid gap-4 md:grid-cols-3">{corridorCards.map((corridor) => { const Icon = corridor.icon; return <div key={corridor.name} className="group rounded-2xl border border-slate-200 bg-[#f8fbfa] p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_40px_rgba(16,32,47,.08)]"><div className="flex items-center justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl ${corridor.color === "emerald" ? "bg-emerald-100 text-emerald-700" : corridor.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-violet-100 text-violet-700"}`}><Icon size={20} strokeWidth={1.7} /></span><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Active watch</span></div><h3 className="mt-9 font-display text-2xl font-semibold text-[#10202f]">{corridor.name}</h3><p className="mt-2 text-xs font-medium text-emerald-700">{corridor.route}</p><div className="mt-8 border-t border-slate-200 pt-4"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Primary vector</p><p className="mt-1 text-sm text-slate-600">{corridor.risk}</p></div></div>; })}</div></div></section>

        <section className="bg-[#eaf1ef] py-20 sm:py-28"><div className="container"><div className="relative overflow-hidden rounded-[28px] bg-[#10202f] px-6 py-12 text-white sm:px-12 sm:py-16"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(64,224,161,.18),transparent_64%)]" /><div className="relative max-w-3xl"><SectionKicker light>Built for the next safe passage</SectionKicker><h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">Before you pay, <span className="text-emerald-300">verify.</span><br />Before you travel, be sure.</h2><p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">Project Safe Passage protects the dreams of Tanzanian youth with intelligence, integrity, and a public record you can check.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => scrollTo("registry")} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#082016] transition hover:bg-emerald-200">Search the registry <Search size={15} /></button><button onClick={() => setReportOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-white/35">Securely report an incident <LockKeyhole size={14} className="text-emerald-300" /></button></div></div></div></div></section>
      </main>

      <footer className="bg-[#071522] py-10 text-slate-400"><div className="container"><div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] border border-emerald-300/30 bg-emerald-300/10 text-emerald-300"><ShieldCheck size={18} /></span><div><p className="font-display text-sm font-semibold text-white">Project Safe Passage</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em]">A continental African initiative</p></div></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.15em]"><button onClick={() => scrollTo("mission")} className="transition hover:text-white">Mission</button><button onClick={() => scrollTo("registry")} className="transition hover:text-white">Registry</button><button onClick={() => setReportOpen(true)} className="transition hover:text-white">Report safely</button></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] leading-5 text-slate-500 sm:flex-row"><span>Led by Capt. Terrence A. Fang · Senior Migration Governance Specialist</span><span>© 2026 Project Safe Passage</span></div></div></footer>

      {selectedAgency && <Modal title={selectedAgency.name} eyebrow="Audit record · public verification" onClose={() => setSelectedAgency(null)}><div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4"><div><p className="font-mono text-xs text-emerald-200">{selectedAgency.id}</p><p className="mt-1 text-xs text-slate-400">{selectedAgency.countries} · {selectedAgency.routes}</p></div><StatusBadge status={selectedAgency.status} /></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Compliance score</p><p className="mt-2 font-display text-3xl font-semibold text-emerald-300">{selectedAgency.score}<span className="text-sm text-slate-500">/100</span></p><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${selectedAgency.score}%` }} /></div></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Last audited</p><p className="mt-2 font-display text-xl font-semibold text-white">{selectedAgency.audited}</p><p className="mt-1 text-[10px] text-slate-500">Independent board record</p></div></div><div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Verified fees policy</p><p className="mt-2 text-sm leading-6 text-slate-300">{selectedAgency.fees}</p></div><div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500"><BadgeCheck size={14} className="text-emerald-300" /> Blockchain verifiable ID</div><p className="mt-3 break-all rounded-lg bg-black/20 p-3 font-mono text-[11px] text-emerald-200">psp://trust/{selectedAgency.id}/{selectedAgency.hash}</p></div><button onClick={() => setSelectedAgency(null)} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#082016] transition hover:bg-emerald-200">Close audit record <Check size={15} /></button></Modal>}

      {reportOpen && <Modal title="Report a scam or incident" eyebrow="Encrypted survivor intelligence intake" onClose={() => { setReportOpen(false); setReportSent(false); }}>{reportSent ? <div className="py-8 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-300/15 text-emerald-300"><CheckCircle2 size={28} /></span><h3 className="mt-5 font-display text-2xl font-semibold text-white">Report securely received</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">Your information has been queued for protected review. If you are in immediate danger, contact local emergency services.</p><button onClick={() => setReportOpen(false)} className="mt-7 rounded-xl border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/30">Done</button></div> : <div><p className="mb-6 text-sm leading-6 text-slate-400">Share only what feels safe. This demo intake shows the protected experience; connect it to your approved survivor intelligence workflow before production launch.</p><div className="space-y-4"><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">What happened?</span><textarea rows={4} placeholder="Describe the agency, offer, route, or incident…" className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-300/60" /></label><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Safe contact (optional)</span><input placeholder="Phone or email" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-300/60" /></label><div className="flex items-start gap-2 text-[11px] leading-5 text-slate-500"><LockKeyhole size={14} className="mt-0.5 shrink-0 text-emerald-300" /> Your submission is designed to be encrypted and handled with survivor-centered safeguards.</div><button onClick={() => setReportSent(true)} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#082016] transition hover:bg-emerald-200">Submit protected report <ArrowRight size={15} /></button></div></div>}</Modal>}
    </div>
  );
}
