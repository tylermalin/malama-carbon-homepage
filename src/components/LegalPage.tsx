import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (section?: string) => void;
  title: string;
  content: string;
}

export function LegalPage({ onNavigate, title, content }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate()}
              className="mb-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl md:text-5xl font-medium mb-6">
              {title}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Effective Date: January 1, 2025
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card p-8 rounded-2xl border">
              <p className="text-lg text-muted-foreground mb-8">
                {content}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-medium mb-4 text-primary">Information We Collect</h2>
                  <p className="text-muted-foreground">
                    This section will outline the types of information Mālama Carbon collects from users of our platform.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium mb-4 text-primary">How We Use Your Information</h2>
                  <p className="text-muted-foreground">
                    This section will describe how we use the collected information to provide and improve our services.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium mb-4 text-primary">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this {title.toLowerCase()}, please contact us at legal@malama.co
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}