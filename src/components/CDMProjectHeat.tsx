type Row = { region: string; projects: number; topType?: string };
export default function CDMProjectHeat({ rows }: { rows: Row[] }) {
  const max = Math.max(...rows.map(r => r.projects));
  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-semibold mb-2">CDM Projects by Region (illustrative)</h3>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.region}</span>
              <span>{r.projects.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded bg-gray-100">
              <div className="h-2 rounded bg-black" style={{ width: `${(r.projects/max)*100}%` }} />
            </div>
            {r.topType && <p className="mt-1 text-xs text-gray-600">Common type: {r.topType}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
