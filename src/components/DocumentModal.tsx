"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
  title: string;
  imageUrl: string;   // scan/screenshot of document cover or page
  description?: string;
};

export default function DocumentModal({ title, imageUrl, description }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-xl border px-3 py-2 hover:shadow">View document</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {description && <p className="mt-1 text-sm text-gray-700">{description}</p>}
          <div className="mt-4">
            <img src={imageUrl} alt={title} className="w-full rounded-xl border" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
