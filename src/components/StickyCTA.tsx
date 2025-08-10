import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden" role="region" aria-label="Mobile schedule call-to-action">
      <div className="mx-auto max-w-screen-md px-4 pb-4">
        <div className="rounded-xl border border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
          <div className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Ready to talk?</p>
              <p className="text-xs text-foreground/70 truncate">Book a free 30 min consultation</p>
            </div>
            <a href="#schedule" className="shrink-0" aria-label="Schedule a free consultation">
              <Button size="sm" className="gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Schedule
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
