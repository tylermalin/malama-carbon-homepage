import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { IdahoPilotContactForm } from './IdahoPilotContactForm';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

interface IdahoPilotContactDialogProps {
  children?: React.ReactNode;
  triggerText?: string;
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  triggerSize?: 'default' | 'sm' | 'lg' | 'icon';
  triggerClassName?: string;
}

export function IdahoPilotContactDialog({
  children,
  triggerText = "Apply Now - Check Eligibility",
  triggerVariant = "default",
  triggerSize = "lg",
  triggerClassName = ""
}: IdahoPilotContactDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    // Keep dialog open for 2 seconds to show success message, then close
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            variant={triggerVariant} 
            size={triggerSize}
            className={triggerClassName}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Idaho Rock Weathering Pilot Application
          </DialogTitle>
        </DialogHeader>
        <IdahoPilotContactForm 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}



