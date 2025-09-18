import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    const target = document.getElementById('schedule');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHide(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (hide) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden" role="region" aria-label="Mobile schedule call-to-action">
      <div className="container-narrow mx-auto px-gutter pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="rounded-xl border border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-elegant">
          <div className="flex items-center justify-between gap-site-md p-3">
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-foreground truncate">Ready to talk?</p>
              <p className="text-body-xs text-foreground/70 truncate">Book a free 30 min consultation</p>
            </div>
            <a href="#schedule" className="shrink-0" aria-label="Schedule a free consultation">
              <Button size="sm" className="gap-2">
                <Calendar className="icon-sm" aria-hidden="true" />
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
