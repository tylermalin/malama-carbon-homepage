"use client";
import * as Popover from "@radix-ui/react-popover";

type Props = {
  name: string;
  imageUrl: string; // square portrait
  subtitle?: string;
  facts: string[];  // 2–4 short bullets
};

export default function PortraitPopover({ name, imageUrl, subtitle, facts }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex items-center gap-3 rounded-2xl border px-3 py-2 hover:shadow transition-shadow">
        <img src={imageUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
        <div className="text-left">
          <p className="font-semibold">{name}</p>
          {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
            <Popover.Content
              className="w-80 max-w-[90vw] max-h-[80vh] overflow-y-auto rounded-2xl border bg-white p-4 shadow-xl"
              style={{ zIndex: 9999 }}
              sideOffset={8}
              align="start"
              side="top"
              avoidCollisions={true}
              collisionPadding={16}
            >
          <p className="text-sm mb-2"><span className="font-semibold">{name}</span> — key notes</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {facts.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
