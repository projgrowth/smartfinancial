
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
      className="border border-blue-100 rounded-lg overflow-hidden bg-white mb-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-5 text-left">
        <h3 className="font-medium text-charcoal">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500 flex-shrink-0" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-5 pt-0 text-charcoal/80 border-t border-blue-50">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

const FAQSection = () => {
  const { title, subtitle, description } = sections.faq;

  return (
    <section id="faq" className="section-lg relative overflow-hidden bg-blue-50/30">
      <GradientAccent variant="subtle" position="bottom-left" intensity="low" />
      <div className="container-site relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center mb-4">
            {title}
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            {description}
          </p>
        </ScrollReveal>
        
        <div className="max-w-3xl mx-auto">
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
