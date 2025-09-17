
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { faqItems, sections } from '../data/content';

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
      className="border border-border rounded-lg overflow-hidden bg-card mb-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between space-component-sm text-left">
        <h3 className="font-medium text-foreground">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-accent flex-shrink-0" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-component-sm pt-0 text-muted-foreground border-t border-border/50">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

const FAQSection = () => {
  const { title, subtitle, description } = sections.faq;

  return (
    <section id="faq" className="section-lg relative overflow-hidden bg-secondary/30">
      <GradientAccent variant="subtle" position="bottom-left" intensity="low" />
      <div className="container-site relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center space-component-sm">
            {title}
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground container-narrow mx-auto space-component-lg">
            {description}
          </p>
        </ScrollReveal>
        
        <div className="container-narrow mx-auto">
          {faqItems.map((faq, index) => (
            <ScrollReveal key={faq.id} delay={index * 100}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
