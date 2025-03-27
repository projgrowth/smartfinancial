
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AnimatedSectionTransition from './AnimatedSectionTransition';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

const SectionTransitionDemo = () => {
  const { toast } = useToast();
  
  const handleClick = (style: string) => {
    toast({
      title: "Section transition clicked",
      description: `You clicked the ${style} transition`
    });
  };

  const styles = [
    { name: 'Wave', value: 'wave' },
    { name: 'Chevron', value: 'chevron' },
    { name: 'Diagonal', value: 'diagonal' },
    { name: 'Curved', value: 'curved' },
    { name: 'Arrow', value: 'arrow' }
  ];

  const colorSchemes = [
    { name: 'Light to Dark', value: 'light-to-dark' },
    { name: 'Dark to Light', value: 'dark-to-light' },
    { name: 'Blue to White', value: 'blue-to-white' },
    { name: 'White to Blue', value: 'white-to-blue' },
    { name: 'Custom', value: 'custom', from: '#f3e8ff', to: '#ffffff' }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Section Transitions
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-12">
            Beautiful transitions between sections to create a cohesive flow throughout the website.
          </p>
        </ScrollReveal>
        
        <div className="space-y-16">
          {/* Transition Styles */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-charcoal">Transition Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {styles.map((style) => (
                <div key={style.value} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-center mb-2">{style.name}</h4>
                  <div className="h-20 bg-white rounded-md relative">
                    <AnimatedSectionTransition 
                      style={style.value as any}
                      position="bottom"
                      showIcon={true}
                      iconType="chevron"
                      onClick={() => handleClick(style.name)}
                      className="absolute bottom-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Color Schemes */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-charcoal">Color Schemes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {colorSchemes.map((scheme) => (
                <div key={scheme.value} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-center mb-2">{scheme.name}</h4>
                  <div className="h-20 bg-white rounded-md relative">
                    <AnimatedSectionTransition 
                      style="wave"
                      colorScheme={scheme.value as any}
                      fromColor={scheme.from}
                      toColor={scheme.to}
                      position="bottom"
                      className="absolute bottom-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Icon Options */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-charcoal">Icon Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-center mb-2">Chevron</h4>
                <div className="h-20 bg-white rounded-md relative">
                  <AnimatedSectionTransition 
                    style="wave"
                    position="bottom"
                    showIcon={true}
                    iconType="chevron"
                    className="absolute bottom-0"
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-center mb-2">Chevrons</h4>
                <div className="h-20 bg-white rounded-md relative">
                  <AnimatedSectionTransition 
                    style="wave"
                    position="bottom"
                    showIcon={true}
                    iconType="chevrons"
                    className="absolute bottom-0"
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-center mb-2">Arrow</h4>
                <div className="h-20 bg-white rounded-md relative">
                  <AnimatedSectionTransition 
                    style="wave"
                    position="bottom"
                    showIcon={true}
                    iconType="arrow"
                    className="absolute bottom-0"
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-center mb-2">No Icon</h4>
                <div className="h-20 bg-white rounded-md relative">
                  <AnimatedSectionTransition 
                    style="wave"
                    position="bottom"
                    showIcon={false}
                    className="absolute bottom-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTransitionDemo;
