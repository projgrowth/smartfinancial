import { useState } from 'react';
import { Lightbulb, Layers, CheckCheck } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Deep Discovery",
    description: "We dive deep to understand your complete financial picture—goals, concerns, and aspirations.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Bespoke Blueprint",
    description: "Receive a custom financial plan tailored to your unique situation with actionable strategies.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Growth & Guidance",
    description: "Ongoing support and regular reviews to adapt your plan as life evolves.",
    icon: CheckCheck,
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section 
      id="process" 
      className="section-xl section-bg-premium-dark" 
      role="region"
      aria-labelledby="process-heading"
    >
      <div className="container-default">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 id="process-heading" className="heading-lg text-white">
            Our Process
          </h2>
          <p className="text-body text-white/80 max-w-xl mx-auto">
            A clear path to financial confidence in three focused steps.
          </p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-[16.67%] right-[16.67%] h-px bg-white/20" />
            
            <div className="grid grid-cols-3 gap-8">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.number;
                
                return (
                  <div
                    key={step.number}
                    className="relative"
                    onMouseEnter={() => setActiveStep(step.number)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    {/* Step indicator */}
                    <div className="flex justify-center mb-8">
                      <div 
                        className={`
                          w-16 h-16 rounded-full flex items-center justify-center
                          border-2 transition-all duration-150 cursor-pointer
                          ${isActive 
                            ? 'bg-accent border-accent scale-110' 
                            : 'bg-white/5 border-white/30 hover:border-accent/50'
                          }
                        `}
                      >
                        <Icon className={`w-7 h-7 transition-colors duration-150 ${isActive ? 'text-white' : 'text-accent'}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`text-center transition-all duration-150 ${isActive ? 'transform -translate-y-1' : ''}`}>
                      <span className={`text-sm font-medium transition-colors duration-150 ${isActive ? 'text-accent' : 'text-white/60'}`}>
                        Step {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-150 ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.number} className="relative flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  {!isLast && (
                    <div className="w-px h-full bg-white/20 my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <span className="text-xs font-medium text-accent">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;