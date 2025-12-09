import { FileSearch, CreditCard, BarChart4, Shield } from 'lucide-react';

const services = [
  {
    title: "Retirement Design",
    description: "Create a clear roadmap for your ideal retirement with personalized income strategies and lifestyle planning.",
    icon: FileSearch,
  },
  {
    title: "Tax Strategy",
    description: "Minimize your tax burden through strategic planning, smart timing, and proactive optimization.",
    icon: CreditCard,
  },
  {
    title: "Investment Management",
    description: "Build and maintain a diversified portfolio aligned with your goals, risk tolerance, and time horizon.",
    icon: BarChart4,
  },
  {
    title: "Wealth Protection",
    description: "Safeguard your assets and legacy with comprehensive estate planning and risk management.",
    icon: Shield,
  },
];

const ServiceCards = () => {
  const scrollToSchedule = () => {
    const element = document.getElementById('schedule');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            Services Tailored To Your Need
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial planning designed to address every aspect of your wealth journey.
          </p>
        </div>

        <div className="grid-four-col gap-unified-md">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-150"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="heading-sm mb-2">{service.title}</h3>
              <p className="text-body-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              
              <button
                onClick={scrollToSchedule}
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-150"
              >
                Get started →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
