export function PspLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#d9ad3b]/55 bg-[#061528] shadow-[0_10px_28px_rgba(4,12,25,.28)]">
        <img src="/manus-storage/project-safe-passage-3d-logo_86403387.png" alt="Project Safe Passage shield" className="h-10 w-10 object-contain" />
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </span>
      {!compact && <span className="leading-none"><span className="block font-display text-[14px] font-semibold tracking-[0.08em] text-white">PROJECT SAFE PASSAGE</span><span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-slate-400">Africa · Intelligence · Integrity</span></span>}
    </span>
  );
}
