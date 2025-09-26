"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export type Citation = {
  id: string;           // stable key, e.g., "em-2025"
  title: string;        // short label, e.g., "EM State of the VCM 2025"
  publisher?: string;   // e.g., "Ecosystem Marketplace"
  date?: string;        // e.g., "2025-07-01"
  url?: string;         // external URL
  note?: string;        // short context note
};

type Props = {
  anchorLabel?: string;       // button label, default "Sources"
  citations: Citation[];      // list of citations
  description?: string;       // optional descriptor rendered under the title
  title?: string;             // drawer title
};

export default function SourcesDrawer({
  anchorLabel = "Sources",
  citations,
  description,
  title = "References & Sources",
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-xl border px-3 py-2 text-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-black">
        {anchorLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl"
          aria-describedby="sources-desc"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {description && (
            <p id="sources-desc" className="mt-1 text-sm text-gray-700">{description}</p>
          )}
          <ul className="mt-4 space-y-3">
            {citations.map((c) => (
              <li key={c.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {c.title}
                      {c.publisher && <span className="ml-2 text-gray-600">· {c.publisher}</span>}
                    </p>
                    <p className="text-xs text-gray-600">
                      {c.date ? c.date : null}
                      {c.note ? (c.date ? " · " : "") + c.note : null}
                    </p>
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline hover:no-underline"
                    >
                      Open
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
