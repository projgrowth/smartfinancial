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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Social Security Maximization Seminar</span>
              </div>
              
              <h1 className="heading-xl">
                Maximize Your Social Security. Minimize Regret.
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Join Smart Financial Planning for an exclusive educational seminar on how to make the most of your Social Security benefits and avoid common retirement mistakes.
              </p>
              
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Nearly half of retirees lose tens of thousands in lifetime benefits by claiming at age 62. Learn how to avoid costly mistakes.
              </p>

              {/* Event Details */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <Calendar className="w-10 h-10 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-2">Date</p>
                    <p className="text-sm text-muted-foreground">Thursday, November 13, 2024</p>
                    <p className="text-sm text-muted-foreground">or</p>
                    <p className="text-sm text-muted-foreground">Tuesday, November 18, 2024</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <Clock className="w-10 h-10 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-2">Time</p>
                    <p className="text-sm text-muted-foreground">6:30 PM - 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
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
                    >
                      View Map →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Host Badge */}
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-foreground border border-primary/20">
                <span className="text-sm">Hosted by <span className="font-semibold">Vince Gallegos</span>, Smart Financial Planning</span>
              </div>
              
              {/* Hero CTA Button */}
              <div className="mt-8">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => smoothScrollTo('rsvp-form')}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  Reserve Your Spot Today
                </Button>
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
                <h2 className="heading-lg mb-6">Why This Seminar Matters</h2>
                <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
                  One of the most important retirement decisions you'll make is when and how to claim Social Security benefits. This seminar explains how to maximize your Social Security income, minimize taxes, and avoid costly mistakes that can permanently impact your retirement lifestyle.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="space-component-lg">
                <div className="text-center mb-8">
                  <h3 className="heading-md mb-4">What You'll Learn</h3>
                  <p className="text-body text-muted-foreground">
                    Walk away with actionable strategies to optimize your retirement income
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4 p-6 rounded-lg bg-card/40 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Claiming Age Impact</p>
                      <p className="text-sm text-muted-foreground">How the age you apply affects your total lifetime benefit.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-accent/5 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Tax Minimization</p>
                      <p className="text-sm text-muted-foreground">Strategies for minimizing taxes on Social Security income.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-card/40 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Income Coordination</p>
                      <p className="text-sm text-muted-foreground">Coordinating Social Security with pensions, IRAs, and other income sources.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-accent/5 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">COLA Adjustments</p>
                      <p className="text-sm text-muted-foreground">Understanding cost-of-living adjustments and their impact.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-card/40 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Delaying Benefits</p>
                      <p className="text-sm text-muted-foreground">When delaying benefits makes sense—and when it doesn't.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-accent/5 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Employment Effects</p>
                      <p className="text-sm text-muted-foreground">How current employment affects benefit eligibility.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-card/40 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Family & Survivor Benefits</p>
                      <p className="text-sm text-muted-foreground">Two lesser-known strategies to increase family and survivor benefits.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-accent/5 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Fixing Mistakes</p>
                      <p className="text-sm text-muted-foreground">What to do if you've made a filing mistake.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 rounded-lg bg-card/40 border border-border/50 hover:border-primary/30 shadow-elegant hover:-translate-y-1 transition-all duration-200">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Holistic Planning</p>
                      <p className="text-sm text-muted-foreground">How to integrate Social Security with your overall retirement plan.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Should Attend */}
              <div className="text-center p-8 rounded-xl bg-accent/5 border border-accent/20 space-component-md">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="heading-md mb-4">Who Should Attend</h3>
                <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                  This seminar is designed for pre-retirees and retirees, generally ages 55–70, who want to understand how to make the most of their Social Security benefits and retirement income. Whether you're planning to claim soon or have already started benefits, you'll gain valuable insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Venue Information Section */}
        <section className="section-bg-premium-light section-xl relative">
          <GradientAccent variant="blue" position="top-left" />
          
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-component-md mb-12">
                <h2 className="heading-lg">Event Details & Contact</h2>
                <p className="text-body text-muted-foreground">
                  Questions? Need more information? We're here to help.
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

        {/* RSVP Form Section */}
        <section id="rsvp-form" className="section-bg-default section-xl relative scroll-mt-20">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="space-component-md text-center mb-12">
                <h2 className="heading-lg">Reserve Your Seat</h2>
                <p className="text-body text-muted-foreground">
                  Choose your preferred date and secure your spot. Space is limited, so register early to ensure your attendance.
                </p>
              </div>

              {/* Date Selection Reminder */}
              <div className="mb-8 p-6 rounded-lg bg-accent/10 border border-accent/30 max-w-3xl mx-auto">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Two Dates Available</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Thursday, November 13, 2024 at 6:30 PM</p>
                      <p>• Tuesday, November 18, 2024 at 6:30 PM</p>
                      <p className="mt-3 font-medium text-foreground">Choose your preferred session in the registration form below.</p>
                    </div>
                  </div>
                </div>
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

              {/* Post-Registration Information */}
              <div className="mt-8 p-6 rounded-lg bg-card border border-border max-w-3xl mx-auto">
                <h3 className="font-semibold text-foreground mb-4">What to Expect After Registration</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>You'll receive a confirmation email with event details and location information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>A calendar invite will be sent to easily add the event to your schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>We'll send a reminder 48 hours before the event with any last-minute updates</span>
                  </li>
                </ul>
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
