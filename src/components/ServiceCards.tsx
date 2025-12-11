import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { services } from '@/content/services';
import { siteSettings } from '@/config/siteSettings';

const ServiceCards = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const scrollToSchedule = () => {
    const element = document.getElementById('schedule');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section
      id="services"
      className="section-xl section-bg-subtle"
      role="region"
      aria-labelledby="services-heading"
    >
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="heading-lg mb-4">
            Services for Discerning Clients
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Comprehensive wealth management designed for business owners, executives, and affluent families.
          </p>
        </div>

        <div className="grid-four-col gap-unified-md">
          {services.map((service) => {
            const isOpen = openItems.includes(service.id);
            
            return (
              <div
                key={service.id}
                className="bg-card border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-150"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                
                <h3 className="heading-sm mb-2">{service.title}</h3>
                <p className="text-body-sm text-muted-foreground mb-4">
                  {service.description}
                </p>

                <Collapsible open={isOpen} onOpenChange={() => toggleItem(service.id)}>
                  <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-150 group">
                    <span>{isOpen ? 'Show less' : 'Learn more'}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <ul className="mt-4 space-y-2 pt-4 border-t border-border/30">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <button
                        onClick={scrollToSchedule}
                        className="w-full py-2 px-4 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium rounded-md transition-colors duration-150"
                      >
                        {siteSettings.cta.secondary} →
                      </button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
