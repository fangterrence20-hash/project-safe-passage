import { useMemo } from "react";
import { MapPin, ShieldCheck } from "lucide-react";
import { MapView } from "@/components/Map";

const agencies = [
  { name: "PSP Cameroon Hub", position: { lat: 4.05, lng: 9.7 }, city: "Douala", status: "VERIFIED" },
  { name: "West Africa Partner", position: { lat: 6.52, lng: 3.38 }, city: "Lagos", status: "VERIFIED" },
  { name: "East Africa Partner", position: { lat: -1.28, lng: 36.82 }, city: "Nairobi", status: "VERIFIED" },
  { name: "PSP Tanzania Hub", position: { lat: -6.79, lng: 39.28 }, city: "Dar es Salaam", status: "VERIFIED" },
  { name: "Southern Africa Partner", position: { lat: -26.2, lng: 28.05 }, city: "Johannesburg", status: "UNDER AUDIT" },
  { name: "North Africa Partner", position: { lat: 30.04, lng: 31.24 }, city: "Cairo", status: "VERIFIED" },
];

const corridors = [
  { name: "Central / Gulf", color: "#57e6b1", path: [{ lat: 4.05, lng: 9.7 }, { lat: -6.79, lng: 39.28 }, { lat: 25.2, lng: 55.27 }] },
  { name: "West / Europe", color: "#f0bd4c", path: [{ lat: 6.52, lng: 3.38 }, { lat: 4.05, lng: 9.7 }, { lat: 33.57, lng: -7.59 }] },
  { name: "East / Southern", color: "#7c9cff", path: [{ lat: -1.28, lng: 36.82 }, { lat: -6.79, lng: 39.28 }, { lat: -26.2, lng: 28.05 }] },
];

export function AfricaMap() {
  const center = useMemo(() => ({ lat: 2, lng: 18 }), []);
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1d30] shadow-[0_24px_60px_rgba(4,12,25,.20)]">
      <div className="absolute left-5 top-5 z-10 rounded-full border border-emerald-300/20 bg-[#071522]/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur">Live corridor intelligence</div>
      <MapView initialCenter={center} initialZoom={3} className="h-[430px] opacity-90 sm:h-[520px]" onMapReady={(map) => {
        corridors.forEach((corridor) => new google.maps.Polyline({ map, path: corridor.path, strokeColor: corridor.color, strokeOpacity: 0.78, strokeWeight: 3, geodesic: true }));
        agencies.forEach((agency) => {
          const node = document.createElement("div");
          node.className = "grid h-8 w-8 place-items-center rounded-full border-2 border-[#071522] bg-[#57e6b1] text-[#071522] shadow-lg";
          node.innerHTML = '<span style="font-size:14px">✦</span>';
          const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: agency.position, title: `${agency.name} · ${agency.status}`, content: node });
          marker.addListener("click", () => map.setZoom(5));
        });
      }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#071522] via-[#071522]/85 to-transparent px-5 pb-5 pt-14 sm:px-7"><div className="grid gap-3 sm:grid-cols-3">{corridors.map((corridor) => <div key={corridor.name} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: corridor.color }} />{corridor.name}</div>)}</div><div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500"><MapPin size={12} className="text-emerald-300" /> {agencies.length} verified or monitored PSP points across Africa</div></div>
    </div>
  );
}

export function MapLegend() {
  return <div className="grid gap-3 sm:grid-cols-3">{agencies.slice(0, 3).map((agency) => <div key={agency.name} className="rounded-xl border border-slate-200 bg-white p-4"><div className="flex items-center gap-2"><ShieldCheck size={15} className="text-emerald-600" /><span className="text-xs font-semibold text-[#10202f]">{agency.city}</span></div><p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-slate-500">{agency.status} · corridor node</p></div>)}</div>;
}
