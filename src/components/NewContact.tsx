import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const NewContact = () => {
  const handleScheduleCall = () => {
    // In a real implementation, this would open a scheduling modal or redirect to a scheduling page
    window.open('https://calendly.com/smartfinancialplanning', '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "(706) 627-5729",
      action: "tel:+17066275729"
    },
    {
      icon: Mail,
      label: "Email", 
      value: "info@thesmartfinancialplan.com",
      action: "mailto:info@thesmartfinancialplan.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Central Florida",
      action: null
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon-Fri 9AM-5PM",
      action: null
    }
  ];

  return (
    <section id="contact" className="section-lg bg-background">
      <div className="container-unified">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-unified-xl items-center">
          {/* Content Side */}
          <div className="space-component-lg">
            <h2 className="heading-lg">Ready to Get Started?</h2>
            <p className="text-body-lg">
              Schedule your private strategy call today and discover how we can help you achieve your financial goals.
            </p>
            
            <div className="space-component-md">
              <Button 
                onClick={handleScheduleCall}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-medium"
              >
                Schedule Your Strategy Call
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <info.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-foreground">{info.label}</p>
                    {info.action ? (
                      <a href={info.action} className="text-body-sm text-muted-foreground hover:text-accent transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-body-sm text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Side */}
          <div>
            <Card className="bg-muted/30 border border-border">
              <CardContent className="p-8 space-component-md">
                <h3 className="heading-sm">What to Expect</h3>
                
                <div className="space-component-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-accent-foreground font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium">Comprehensive Review</h4>
                      <p className="text-body-sm">We'll discuss your current financial situation and goals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-accent-foreground font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium">Personalized Strategy</h4>
                      <p className="text-body-sm">Receive tailored recommendations for your unique situation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-accent-foreground font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium">Next Steps</h4>
                      <p className="text-body-sm">Clear action plan to move forward with confidence</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-body-sm text-center text-muted-foreground">
                    30-minute complimentary consultation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewContact;