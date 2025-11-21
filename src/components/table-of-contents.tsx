import React from 'react';
import { cn } from '@/components/ui/utils';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaQuery } from '@/hooks/use-media-query';

const sections = [
  { id: 'executive-summary', title: 'Executive Summary', level: 1 },
  { id: 'context-objectives', title: 'Context & Objectives', level: 1 },
  { id: 'verification-gap', title: 'The Verification & Integrity Gap', level: 1 },
  { id: 'udrmv-framework', title: 'The Universal Digital MRV Framework', level: 1 },
  { id: 'token-architecture', title: 'Token Architecture & Digital Integrity', level: 1 },
  { id: 'digital-methodologies', title: 'Digital Methodologies: ExtensionSets', level: 1 },
  { id: 'technical-architecture', title: 'Technical Architecture & Cardano Integration', level: 1 },
  { id: 'governance', title: 'Governance, Risk, and Compliance', level: 1 },
  { id: 'use-cases', title: 'Use Cases, Pilots & Real-World Applications', level: 1 },
  { id: 'roadmap', title: 'Roadmap & Call to Action', level: 1 },
];

interface TableOfContentsProps {
  activeSection: string;
}

export function TableOfContents({ activeSection }: TableOfContentsProps) {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const TOCContent = () => (
    <nav className="space-y-2">
      <h2 className="font-medium text-black mb-4">Table of Contents</h2>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'w-full text-left text-sm py-2 px-3 rounded-md transition-colors hover:bg-gray-100 hover:text-black',
                activeSection === section.id
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-600'
              )}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <div className="lg:hidden w-full mb-6 print:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="toc">
            <AccordionTrigger className="text-base text-black">Table of Contents</AccordionTrigger>
            <AccordionContent>
              <TOCContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-64 shrink-0 print:hidden">
      <div className="sticky top-24">
        <Card className="p-4 bg-white">
          <TOCContent />
        </Card>
      </div>
    </div>
  );
}

