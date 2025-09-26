type Props = {
  quote: string;
  author?: string;
  source?: string;
};

export default function QuoteHighlight({ quote, author, source }: Props) {
  return (
    <figure className="rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-5">
      <blockquote className="text-lg leading-relaxed">"{quote}"</blockquote>
      <figcaption className="mt-2 text-sm text-gray-700">
        {author && <span className="font-medium">{author}</span>}
        {source && <span className="ml-1 text-gray-500">— {source}</span>}
      </figcaption>
    </figure>
  );
}
