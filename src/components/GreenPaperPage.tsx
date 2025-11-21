import React, { useState, useEffect } from 'react';
import { TableOfContents } from './table-of-contents';
import { WhitepaperContent } from './whitepaper-content';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';
import { Footer } from './Footer';

export function GreenPaperPage() {
  const [activeSection, setActiveSection] = useState('executive-summary');

  const handlePrintToPDF = () => {
    window.print();
  };

  // Intersection Observer for auto-scrolling TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.1,
      }
    );

    // Observe all section headings
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black green-paper-page">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 print:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-black" />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintToPDF}
                className="hidden sm:flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 bg-white" style={{ backgroundColor: 'white' }}>
        <div className="flex gap-8 py-8">
          {/* Table of Contents Sidebar */}
          <TableOfContents activeSection={activeSection} />
          
          {/* Main Content */}
          <main className="flex-1 max-w-[900px]">
            <WhitepaperContent />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

