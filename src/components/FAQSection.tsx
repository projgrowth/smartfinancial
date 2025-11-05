
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PremiumCard } from '@/components/ui/premium-card';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PremiumCard 
        variant="faq"
        className="space-component-sm transition-all duration-300"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left">
          <h3 className="heading-xs text-foreground">{question}</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-6 pt-0 text-body text-muted-foreground border-t border-border">
          {answer}
        </CollapsibleContent>
      </PremiumCard>
    </Collapsible>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: (
        <p>
          We offer comprehensive financial planning, investment management, retirement planning, tax optimization strategies, estate planning, and risk management solutions tailored specifically for high-achieving professionals and business owners.
        </p>
      )
    },
    {
      question: "How do you charge for your services?",
      answer: (
        <p>
          We use a transparent fee structure based on the complexity of your financial situation and the services required. We offer both fee-only planning and asset-based management fees. During our initial consultation, we'll provide a clear outline of our fee structure and exactly what services are included.
        </p>
      )
    },
    {
      question: "What is your investment philosophy?",
      answer: (
        <p>
          Our investment approach focuses on evidence-based strategies aligned with your specific goals and risk tolerance. We emphasize diversification, cost efficiency, tax optimization, and disciplined rebalancing to help you achieve long-term financial success while managing volatility.
        </p>
      )
    },
    {
      question: "What makes your approach different?",
      answer: (
        <p>
          Our approach combines military-grade discipline with innovative financial strategies. We specialize in working with high-income professionals and entrepreneurs, understanding their unique challenges. We focus on comprehensive planning that integrates all aspects of your financial life—not just investments, but tax planning, business strategies, and wealth protection.
        </p>
      )
    },
    {
      question: "How often will we meet to discuss my financial plan?",
      answer: (
        <p>
          For most clients, we schedule quarterly reviews to assess progress and make adjustments as needed. However, we customize our meeting frequency based on your preferences and the complexity of your financial situation. Additionally, we're always available for questions or concerns between scheduled meetings.
        </p>
      )
    },
    {
      question: "Do I need a minimum investment to work with you?",
      answer: (
        <p>
          We typically work with clients who have investable assets of $500,000 or more, or high-income professionals on track to reach that threshold within 2-3 years. However, we evaluate each situation individually and may make exceptions based on your specific circumstances and growth potential.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="section-lg relative overflow-hidden section-bg-premium-accent">
      <GradientAccent variant="subtle" position="bottom-left" intensity="low" />
      <div className="container-narrow relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center space-component-md">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-body-lg text-muted-foreground max-w-2xl mx-auto space-component-xl">
            Get answers to the most common questions about our financial planning services and approach.
          </p>
        </ScrollReveal>
        
        <div className="max-w-3xl mx-auto space-component-sm">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 75}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
