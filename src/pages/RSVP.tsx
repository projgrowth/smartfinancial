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
        {/* Hero Section */}
        <section className="section-bg-premium-light section-xl relative overflow-hidden">
          <GradientAccent variant="purple" position="top-left" />
          <GradientAccent variant="blue" position="bottom-right" />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-component-lg">
              {/* Badge Row - Simplified */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Free Seminar</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited Seating</span>
                </div>
              </div>
              
              <h1 className="heading-xl">
                Maximize Your Social Security. Minimize Regret.
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join Smart Financial Planning for an exclusive educational seminar on how to make the most of your Social Security benefits and avoid common retirement mistakes. Nearly half of retirees lose <strong className="text-foreground">tens of thousands</strong> in lifetime benefits by claiming at <strong className="text-foreground">age 62</strong>.
              </p>
              
              {/* CTA - Simplified */}
              <div className="mt-8 mb-10">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => smoothScrollTo('rsvp-form')}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  aria-label="Scroll to registration form"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Your Spot Today
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Free admission • Choose your date</p>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow duration-200">
                  <Calendar className="w-10 h-10 text-accent" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-2">Date</p>
                    <p className="text-sm text-muted-foreground">Thursday, Nov 13, 2024</p>
                    <p className="text-xs text-muted-foreground my-1">or</p>
                    <p className="text-sm text-muted-foreground">Tuesday, Nov 18, 2024</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow duration-200">
                  <Clock className="w-10 h-10 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-2">Time</p>
                    <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                    <p className="text-xs text-muted-foreground">(90 minutes)</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow duration-200">
                  <MapPin className="w-10 h-10 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-2">Location</p>
                    <p className="text-sm text-muted-foreground">SpringHill Suites</p>
                    <p className="text-sm text-muted-foreground">Orlando Lake Nona</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=13700+Boggy+Creek+Rd+Orlando+FL+32824" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-1 inline-block"
                      aria-label="View SpringHill Suites on Google Maps"
                    >
                      View Map →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Host Badge */}
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm">Hosted by <span className="font-semibold">Vince Gallegos, CFP®</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Event Description Section */}
        <section className="section-bg-default section-xl relative">
          <GradientAccent variant="gold" position="top-right" />
          
          <div className="container">
            <div className="max-w-5xl mx-auto space-component-xl">
              {/* Event Overview */}
              <div className="text-center space-component-md mb-12">
                <h2 className="heading-lg mb-6">What You'll Learn</h2>
                <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
                  One of the most important retirement decisions you'll make is when and how to claim Social Security benefits. Walk away with actionable strategies to <strong className="text-foreground">maximize your benefits</strong> and avoid costly mistakes.
                </p>
              </div>

              {/* Learning Points Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Claiming Age Impact</p>
                    <p className="text-sm text-muted-foreground">How the age you apply affects your total lifetime benefit.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Tax Minimization</p>
                    <p className="text-sm text-muted-foreground">Strategies for minimizing taxes on Social Security income.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Income Coordination</p>
                    <p className="text-sm text-muted-foreground">Coordinating Social Security with pensions, IRAs, and other income sources.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">COLA Adjustments</p>
                    <p className="text-sm text-muted-foreground">Understanding cost-of-living adjustments and their impact.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Delaying Benefits</p>
                    <p className="text-sm text-muted-foreground">When delaying benefits makes sense—and when it doesn't.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Employment Effects</p>
                    <p className="text-sm text-muted-foreground">How current employment affects benefit eligibility.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Family & Survivor Benefits</p>
                    <p className="text-sm text-muted-foreground">Two lesser-known strategies to increase family and survivor benefits.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Fixing Mistakes</p>
                    <p className="text-sm text-muted-foreground">What to do if you've made a filing mistake.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/30 shadow-md hover:shadow-lg transition-all duration-200">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Holistic Planning</p>
                    <p className="text-sm text-muted-foreground">How to integrate Social Security with your overall retirement plan.</p>
                  </div>
                </div>
              </div>

              {/* Who Should Attend - Compact */}
              <div className="text-center p-8 rounded-xl bg-accent/5 border border-accent/20">
                <Users className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground text-lg mb-2">Perfect for ages 55-70 approaching retirement</h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Whether planning to claim soon or already receiving benefits, gain valuable insights to maximize your retirement income.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section */}
        <section id="rsvp-form" className="section-bg-premium-light section-xl relative scroll-mt-20">
          <GradientAccent variant="purple" position="top-right" />
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="heading-lg mb-4">Reserve Your Seat</h2>
                <p className="text-body-lg text-muted-foreground">
                  Choose your preferred date below. Space is limited.
                </p>
              </div>

              {/* Date Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <Calendar className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Thursday, Nov 13</p>
                    <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Tuesday, Nov 18</p>
                    <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Iframe */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-card border border-border">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading registration form...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={rsvpUrl}
                  className="w-full min-h-[500px] md:min-h-[800px] border-0"
                  title="Event RSVP Form"
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen
                />
              </div>

              {/* Post-Registration */}
              <div className="mt-8 p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">After You Register</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Confirmation email with event details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Calendar invite for easy scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Reminder 48 hours before the event</span>
                  </li>
                </ul>
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
            </div>
          </div>
        </section>

        {/* Contact & Venue Information */}
        <section className="section-bg-default section-xl relative">
          <GradientAccent variant="blue" position="top-left" />
          
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-component-md mb-10">
                <h2 className="heading-lg">Questions? Get in Touch</h2>
                <p className="text-body text-muted-foreground">
                  Need more information? We're here to help.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-component-md p-8 rounded-xl bg-card border border-border shadow-elegant">
                  <h3 className="heading-sm mb-6 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Contact Information
                  </h3>
                  
                  <div className="space-component-sm">
                    <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors group">
                      <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                        <div className="flex items-center gap-2">
                          <a href="tel:+17066275729" className="font-semibold text-foreground text-lg hover:text-primary transition-colors">
                            (706) 627-5729
                          </a>
                          <button
                            onClick={() => copyToClipboard('(706) 627-5729', 'phone')}
                            className="p-1.5 hover:bg-accent/10 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Copy phone number"
                          >
                            {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors group">
                      <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <a href="mailto:vince@thesmartfinancialplan.com" className="font-semibold text-foreground text-lg hover:text-primary transition-colors break-words">
                            vince@thesmartfinancialplan.com
                          </a>
                          <button
                            onClick={() => copyToClipboard('vince@thesmartfinancialplan.com', 'email')}
                            className="p-1.5 hover:bg-accent/10 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                            aria-label="Copy email address"
                          >
                            {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg">
                      <Building2 className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Office</p>
                        <p className="text-sm text-foreground">111 N Orange Ave, Suite 800</p>
                        <p className="text-sm text-foreground">Orlando, FL 32801</p>
                      </div>
                    </div>

                    <a 
                      href="https://thesmartfinancialplan.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent/5 transition-colors group"
                    >
                      <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Website</p>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">thesmartfinancialplan.com →</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="space-component-md p-8 rounded-xl bg-card border border-border shadow-elegant">
                  <h3 className="heading-sm mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Venue Information
                  </h3>
                  
                  <div className="space-component-sm">
                    <div className="mb-6">
                      <p className="font-semibold text-foreground text-lg mb-2">SpringHill Suites Orlando Lake Nona</p>
                      <p className="text-sm text-muted-foreground mb-4">13700 Boggy Creek Rd, Orlando, FL 32824</p>
                      
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=SpringHill+Suites+Orlando+Lake+Nona+13700+Boggy+Creek+Rd+Orlando+FL+32824" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        <MapPin className="w-4 h-4" />
                        View on Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <p className="text-sm text-foreground">
                        <strong>Parking:</strong> Complimentary parking available on-site
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground">
                        The venue is wheelchair accessible and offers convenient amenities for all attendees.
                      </p>
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
