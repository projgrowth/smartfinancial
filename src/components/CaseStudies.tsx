
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Briefcase, Users, ChartBar, DollarSign } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PrimaryButton from './PrimaryButton';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 'young-professional',
      title: 'Young Professional',
      name: 'Alex, 32',
      description: 'Tech industry professional balancing student loans with early career wealth building',
      challenge: 'Balancing student loan repayment with retirement savings and home purchase goals',
      solution: 'Debt optimization plan paired with targeted investment strategy for long-term growth',
      result: 'On track to be debt-free in 3 years while building retirement savings and a home down payment fund',
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600'
    },
    {
      id: 'family-planner',
      title: 'Growing Family',
      name: 'The Johnsons',
      description: 'Dual-income household with young children planning for education and retirement',
      challenge: 'Funding college savings while maintaining lifestyle and preparing for retirement',
      solution: 'Tax-efficient education funding strategy alongside optimized retirement contributions',
      result: 'College funds growing steadily while maintaining retirement trajectory and current lifestyle',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600'
    },
    {
      id: 'business-owner',
      title: 'Business Owner',
      name: 'Sarah, 45',
      description: 'Entrepreneur managing business growth alongside personal financial planning',
      challenge: 'Separating business and personal finances while planning for eventual exit strategy',
      solution: 'Integrated business valuation and retirement plan with tax-optimized investment approach',
      result: 'Business value growing with clear exit timeline and personal wealth accumulation plan',
      icon: <ChartBar className="w-8 h-8 text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600'
    },
    {
      id: 'pre-retiree',
      title: 'Pre-Retiree',
      name: 'Michael, 58',
      description: 'Executive approaching retirement with complex compensation and estate planning needs',
      challenge: 'Transitioning from high-income career to retirement while minimizing tax impact',
      solution: 'Comprehensive retirement income plan with estate planning and tax-efficient drawdown strategy',
      result: 'On track for retirement in 4 years with optimized income stream and legacy plans in place',
      icon: <DollarSign className="w-8 h-8 text-blue-500" />,
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600'
    }
  ];

  return (
    <section id="case-studies" className="section relative overflow-hidden bg-slate-lightest/30 py-24">
      <GradientAccent variant="blue" position="bottom-right" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            How We've Helped Clients Like You
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-16">
            Our tailored financial strategies have helped professionals at all stages achieve their goals. 
            See how we might help someone in your situation.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 100}>
              <Card className="group overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-blue-50">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16/9} className="bg-blue-50">
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">
                        {study.icon}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-medium text-charcoal">{study.title}</h3>
                        <p className="text-sm text-charcoal/60">{study.name}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-charcoal/70 mb-4">{study.description}</p>
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-medium text-sm text-charcoal">Challenge:</h4>
                      <p className="text-sm text-charcoal/80">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-charcoal">Our Approach:</h4>
                      <p className="text-sm text-charcoal/80">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-charcoal">Outcome:</h4>
                      <p className="text-sm text-charcoal/80">{study.result}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <PrimaryButton 
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    See If We're a Good Fit
                  </PrimaryButton>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
