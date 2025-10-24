import React, { useState } from 'react';
import SEO from '@/components/SEO';
import GradientAccent from '@/components/GradientAccent';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink, CheckCircle2, Users, Phone, Mail, Building2, Globe, Copy, Check } from 'lucide-react';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { toast } from 'sonner';
import { StickyRSVPButton } from '@/components/StickyRSVPButton';

const RSVP = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const rsvpUrl = 'https://www.yoursvp.com/73bf00b9-1724-4773-8666-cd5d869287ae';
  
  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <>
      <StickyRSVPButton />
      
      {/* Skip to Registration Link - Accessibility */}
      <a 
        href="#rsvp-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo('rsvp-form');
        }}
      >
        Skip to Registration Form
      </a>
      
      <SEO
        title="Social Security Maximization Seminar | Orlando, FL | Smart Financial Planning"
        description="Join our exclusive Social Security seminar on Nov 13 or 18 in Orlando. Learn how to maximize benefits, minimize taxes, and avoid costly retirement mistakes. Reserve your spot today!"
        noindex={true}
      />
      
      <main id="main-content" className="relative">
        {/* Hero Section - Key Information Front and Center */}
        <section className="section-bg-premium-light py-12 md:py-20 relative overflow-hidden">
          <GradientAccent variant="purple" position="top-left" />
          <GradientAccent variant="blue" position="bottom-right" />
          
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Main Headline */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">FREE Educational Seminar</span>
                </div>
                
                <h1 className="heading-xl mb-4">
                  Maximize Your Social Security Benefits
                </h1>
                
                <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  Learn strategies to increase your lifetime benefits by tens of thousands of dollars. 
                  Avoid the costly mistakes that nearly <strong className="text-foreground">half of retirees</strong> make.
                </p>
              </div>

              {/* Key Event Details - Prominent Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
                {/* Date & Time Card */}
                <div className="p-6 rounded-xl bg-card border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-xs">Choose Your Date</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/30 transition-all duration-300 hover:bg-accent/15">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                      <div className="space-y-0.5">
                        <p className="font-semibold text-base text-foreground">Thursday, Nov 13</p>
                        <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30 transition-all duration-300 hover:bg-primary/15">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="space-y-0.5">
                        <p className="font-semibold text-base text-foreground">Tuesday, Nov 18</p>
                        <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">90 minutes • Doors open at 6:15 PM</p>
                </div>

                {/* Location Card */}
                <div className="p-6 rounded-xl bg-card border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="heading-xs">Location</h3>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-lg font-semibold text-foreground">SpringHill Suites</p>
                    <p className="text-sm text-muted-foreground">Orlando Lake Nona</p>
                    <p className="text-sm text-muted-foreground">13700 Boggy Creek Rd<br/>Orlando, FL 32824</p>
                  </div>
                  
                  <div className="space-y-2">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=13700+Boggy+Creek+Rd+Orlando+FL+32824" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors duration-300"
                      aria-label="View location on Google Maps"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                      Free parking • Wheelchair accessible
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center space-y-4">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => smoothScrollTo('rsvp-form')}
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Scroll to registration form"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Your Free Seat
                </Button>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    No cost
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    Limited seating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn - Simplified */}
        <section className="py-12 md:py-16 relative">
          <GradientAccent variant="gold" position="top-right" />
          
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="heading-lg mb-3">What You'll Discover</h2>
                <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                  Walk away with actionable strategies to maximize your Social Security benefits
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">Optimal Claiming Age</p>
                  <p className="text-sm text-muted-foreground">When to start benefits for maximum lifetime income</p>
                </div>

                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">Tax Strategies</p>
                  <p className="text-sm text-muted-foreground">Reduce taxes on your Social Security income</p>
                </div>

                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">Spousal Benefits</p>
                  <p className="text-sm text-muted-foreground">Maximize family and survivor benefits</p>
                </div>

                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">Income Coordination</p>
                  <p className="text-sm text-muted-foreground">Integrate with pensions, IRAs, and other sources</p>
                </div>

                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">COLA Impact</p>
                  <p className="text-sm text-muted-foreground">How adjustments affect long-term benefits</p>
                </div>

                <div className="p-5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-base font-semibold text-foreground mb-2">Common Mistakes</p>
                  <p className="text-sm text-muted-foreground">Avoid errors that cost thousands in benefits</p>
                </div>
              </div>

              <div className="mt-8 text-center p-6 rounded-xl bg-accent/5 border border-accent/20 shadow-sm">
                <Users className="w-8 h-8 text-accent mx-auto mb-4" />
                <p className="font-semibold text-base text-foreground mb-2">Ideal for ages 55-70</p>
                <p className="text-sm text-muted-foreground">
                  Whether planning to claim soon or already receiving benefits
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section - Primary Focus */}
        <section id="rsvp-form" className="section-bg-premium-light py-12 md:py-20 relative scroll-mt-20">
          <GradientAccent variant="purple" position="top-right" />
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="heading-lg mb-3">Reserve Your Seat</h2>
                <p className="text-body-lg text-muted-foreground mb-6">
                  Select your preferred date in the form below
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited seating available</span>
                </div>
              </div>

              {/* Iframe */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border-2 border-primary/20 hover:shadow-xl transition-all duration-300">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading registration form...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={rsvpUrl}
                  className="w-full min-h-[32rem] md:min-h-[50rem] border-0"
                  title="Event RSVP Form"
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen
                />
              </div>

              {/* Fallback */}
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => window.open(rsvpUrl, '_blank')}
                  className="gap-2"
                  aria-label="Open registration form in a new tab"
                >
                  Open in New Tab
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {/* After Registration Info */}
              <div className="mt-8 p-6 rounded-lg bg-card border border-border shadow-sm">
                <h3 className="font-semibold text-base text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  What Happens Next
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-accent/5 border border-accent/20 transition-all duration-300 hover:bg-accent/10">
                    <Mail className="w-6 h-6 text-accent mb-3" />
                    <p className="font-medium text-sm text-foreground mb-1">Instant Confirmation</p>
                    <p className="text-xs text-muted-foreground">Email with event details</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 border border-primary/20 transition-all duration-300 hover:bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary mb-3" />
                    <p className="font-medium text-sm text-foreground mb-1">Calendar Invite</p>
                    <p className="text-xs text-muted-foreground">Add to your schedule</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-accent/5 border border-accent/20 transition-all duration-300 hover:bg-accent/10">
                    <Clock className="w-6 h-6 text-accent mb-3" />
                    <p className="font-medium text-sm text-foreground mb-1">Event Reminder</p>
                    <p className="text-xs text-muted-foreground">48 hours before</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information - Simplified */}
        <section className="py-12 md:py-16 relative">
          <GradientAccent variant="blue" position="top-left" />
          
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="heading-lg mb-2">Questions?</h2>
                <p className="text-body text-muted-foreground">
                  We're here to help
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Contact Card */}
                <div className="p-6 rounded-xl bg-card border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h3 className="heading-xs mb-6 flex items-center gap-2">
                    <Phone className="w-6 h-6 text-primary" />
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-all duration-300 group">
                      <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      <div className="flex-1">
                        <a href="tel:+17066275729" className="font-semibold text-base text-foreground hover:text-primary transition-colors duration-300">
                          (706) 627-5729
                        </a>
                      </div>
                      <button
                        onClick={() => copyToClipboard('(706) 627-5729', 'phone')}
                        className="touch-target p-1.5 hover:bg-accent/10 rounded transition-all duration-300 flex items-center justify-center"
                        aria-label="Copy phone number"
                      >
                        {copiedPhone ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-all duration-300 group">
                      <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      <div className="flex-1 min-w-0">
                        <a href="mailto:vince@thesmartfinancialplan.com" className="font-medium text-sm text-foreground hover:text-primary transition-colors duration-300 break-words">
                          vince@thesmartfinancialplan.com
                        </a>
                      </div>
                      <button
                        onClick={() => copyToClipboard('vince@thesmartfinancialplan.com', 'email')}
                        className="touch-target p-1.5 hover:bg-accent/10 rounded transition-all duration-300 flex items-center justify-center flex-shrink-0"
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>

                    <a 
                      href="https://thesmartfinancialplan.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-all duration-300 group"
                    >
                      <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      <span className="font-medium text-base text-foreground group-hover:text-primary transition-colors duration-300">
                        thesmartfinancialplan.com
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="p-6 rounded-xl bg-card border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h3 className="heading-xs mb-6 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    Office Location
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Smart Financial Planning</p>
                      <p className="text-sm text-foreground">111 N Orange Ave, Suite 800</p>
                      <p className="text-sm text-foreground mb-4">Orlando, FL 32801</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=111+N+Orange+Ave+Suite+800+Orlando+FL+32801" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors duration-300"
                      >
                        <MapPin className="w-4 h-4" />
                        Get Directions
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default RSVP;
