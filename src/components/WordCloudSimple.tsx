type Item = { text: string; weight: 1|2|3|4|5 };
export default function WordCloudSimple({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((w, i) => (
        <span
          key={i}
          className={[
            "rounded-xl bg-gray-50 px-3 py-1",
            w.weight === 5 ? "text-3xl font-bold" :
            w.weight === 4 ? "text-2xl font-semibold" :
            w.weight === 3 ? "text-xl font-semibold" :
            w.weight === 2 ? "text-lg" : "text-base"
          ].join(" ")}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
