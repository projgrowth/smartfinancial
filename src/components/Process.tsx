import { Lightbulb, Layers, CheckCheck } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Deep Discovery",
    description: "We dive deep to understand your complete financial picture—goals, concerns, and aspirations—to build a foundation of clarity.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Bespoke Blueprint",
    description: "Receive a custom financial plan tailored to your unique situation, with clear strategies and actionable steps.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Growth & Guidance",
    description: "Benefit from ongoing support and regular reviews to adapt your plan as life evolves and opportunities arise.",
    icon: CheckCheck,
  },
];

const Process = () => {
  return (
    <section 
      id="process" 
      className="section-lg section-bg-premium-dark section-contain" 
      role="region"
      aria-labelledby="process-heading"
    >
      <div className="container-default">
        <h2 
          id="process-heading" 
          className="heading-lg text-center text-white text-balance"
        >
          Our Process
        </h2>
        <p className="text-center max-w-2xl mx-auto text-body-lg text-balance text-white/80 mt-4">
          Our three-step approach creates clarity, confidence, and continuous growth in your financial journey.
        </p>

        <div className="grid-three-col mt-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-center"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-white/30">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
