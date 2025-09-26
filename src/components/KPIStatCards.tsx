type KPI = { label: string; value: string; note?: string };
export default function KPIStatCards({ items }: { items: KPI[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((k, i) => (
        <div key={i} className="rounded-2xl border p-4">
          <p className="text-2xl font-bold">{k.value}</p>
          <p className="text-sm text-gray-700">{k.label}</p>
          {k.note && <p className="text-xs text-gray-500 mt-1">{k.note}</p>}
        </div>
      ))}
    </div>
  );
}
