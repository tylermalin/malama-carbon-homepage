type Step = { label: string; year: number; done: boolean };
export default function NDCProgress({ steps }: { steps: Step[] }) {
  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-semibold mb-2">Paris 'Ratchet' Milestones</h3>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={[
              "inline-flex h-6 w-6 items-center justify-center rounded-full border",
              s.done ? "bg-black text-white" : "bg-white text-black"
            ].join(" ")}>
              {s.done ? "✓" : i+1}
            </span>
            <span className="text-sm">{s.year} — {s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
