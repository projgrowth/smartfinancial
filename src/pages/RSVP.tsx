import React, { useState } from 'react';
import SEO from '@/components/SEO';
import GradientAccent from '@/components/GradientAccent';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const RSVP = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const rsvpUrl = 'https://www.yoursvp.com/73bf00b9-1724-4773-8666-cd5d869287ae';

  return (
    <>
      <SEO
        title="Event RSVP | Crown Financial"
        description="Reserve your spot for our upcoming event. Join us for an evening of financial planning insights and networking."
        noindex={true}
      />
      
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section className="section-bg-premium-light section-xl relative overflow-hidden">
          <GradientAccent variant="purple" position="top-left" />
          <GradientAccent variant="blue" position="bottom-right" />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-component-lg">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Event Registration</span>
              </div>
              
              <h1 className="heading-xl">
                Join Us for an Exclusive Event
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                We're excited to invite you to our upcoming event. Reserve your spot below and be part of an engaging experience.
              </p>

              {/* Event Details */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">Check details below</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Time</p>
                    <p className="text-sm text-muted-foreground">See registration form</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">Details in form</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section */}
        <section className="section-bg-default section-xl relative">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="space-component-md text-center mb-12">
                <h2 className="heading-lg">Complete Your Registration</h2>
                <p className="text-body text-muted-foreground">
                  Fill out the form below to secure your spot at this exclusive event.
                </p>
              </div>

              {/* Iframe Container */}
              <div className="relative rounded-xl overflow-hidden shadow-elegant bg-card border border-border">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="text-center space-component-sm">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading registration form...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={rsvpUrl}
                  className="w-full min-h-[600px] md:min-h-[800px] border-0"
                  title="Event RSVP Form"
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen
                />
              </div>

              {/* Fallback Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Having trouble viewing the form?
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open(rsvpUrl, '_blank')}
                  className="gap-2"
                >
                  Open in New Tab
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RSVP;
