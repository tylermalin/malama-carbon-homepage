type Headline = { title: string; outlet: string; date: string; url?: string };
export default function HeadlineGallery({ items }: { items: Headline[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((h, i) => (
        <a key={i} href={h.url} target="_blank" rel="noreferrer"
           className="block rounded-2xl border p-4 hover:shadow focus:outline-none focus:ring-2 focus:ring-black">
          <p className="text-sm text-gray-500">{h.outlet} — {h.date}</p>
          <p className="mt-1 font-semibold">{h.title}</p>
        </a>
      ))}
    </div>
  );
}
