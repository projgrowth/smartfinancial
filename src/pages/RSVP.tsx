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
              {/* Badge Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border-2 border-green-500/30 font-semibold text-base shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>FREE Seminar</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border-2 border-orange-500/30 font-semibold text-base shadow-lg animate-pulse">
                  <Users className="w-5 h-5" />
                  <span>Limited Seating Available</span>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Social Security Maximization Seminar</span>
              </div>
              
              <h1 className="heading-xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Maximize Your Social Security. Minimize Regret.
              </h1>
              
              <p className="text-body-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Join Smart Financial Planning for an exclusive educational seminar on how to make the most of your Social Security benefits and avoid common retirement mistakes. Nearly half of retirees lose <strong className="text-foreground">tens of thousands</strong> in lifetime benefits by claiming at <strong className="text-foreground">age 62</strong>. Learn how to avoid costly mistakes.
              </p>
              
              {/* Primary CTA - Above Event Cards */}
              <div className="mb-12">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => smoothScrollTo('rsvp-form')}
                  className="shadow-2xl hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 text-lg px-8 py-6 h-auto w-full sm:w-auto animate-pulse hover:animate-none hover:scale-105"
                  aria-label="Scroll to registration form to reserve your spot"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Your Spot Today
                </Button>
                <p className="text-sm text-muted-foreground mt-3">Secure your preferred date now • Free admission</p>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-accent/50">
                  <Calendar className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base md:text-lg mb-3">Choose Your Date</p>
                    <div className="space-y-2">
                      <p className="text-sm md:text-base text-foreground font-medium">Thursday, November 13, 2024</p>
                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-accent/30"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-card px-3 text-accent font-bold text-sm">OR</span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-foreground font-medium">Tuesday, November 18, 2024</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary/50">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base md:text-lg mb-3">Time</p>
                    <p className="text-sm md:text-base text-foreground font-medium">6:30 PM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground mt-1">(90 minutes)</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary/50">
                  <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  <div className="text-center">
                    <p className="font-bold text-foreground text-base md:text-lg mb-3">Location</p>
                    <p className="text-sm md:text-base text-foreground font-medium">SpringHill Suites</p>
                    <p className="text-sm md:text-base text-muted-foreground">Orlando Lake Nona</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=13700+Boggy+Creek+Rd+Orlando+FL+32824" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent hover:underline mt-2 inline-flex items-center gap-1 font-medium transition-colors min-h-[44px] min-w-[44px] justify-center"
                      aria-label="View SpringHill Suites location on Google Maps"
                    >
                      View Map <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Host Badge */}
              <div className="mt-8 inline-flex flex-col items-center gap-2 px-6 py-4 rounded-xl bg-primary/10 text-foreground border border-primary/20">
                <span className="text-sm">Hosted by <span className="font-bold text-lg">Vince Gallegos</span></span>
                <span className="text-xs text-muted-foreground">Certified Financial Planner™ • Smart Financial Planning</span>
              </div>
            </div>
          </div>
        </section>

        {/* Event Description Section */}
        <section className="section-bg-default section-2xl relative">
          <GradientAccent variant="gold" position="top-right" />
          
          <div className="container">
            <div className="max-w-5xl mx-auto space-component-2xl">
              {/* Event Overview */}
              <div className="text-center space-component-md mb-16">
                <h2 className="heading-xl mb-6">Why This Seminar Matters</h2>
                <p className="text-body-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  One of the most important retirement decisions you'll make is <strong className="text-foreground">when and how to claim Social Security benefits</strong>. This seminar explains how to maximize your Social Security income, minimize taxes, and avoid costly mistakes that can <strong className="text-foreground">permanently impact</strong> your retirement lifestyle.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="space-component-2xl">
                <div className="text-center mb-12">
                  <h3 className="heading-lg mb-4">What You'll Learn</h3>
                  <p className="text-body-lg text-muted-foreground">
                    Walk away with actionable strategies to optimize your retirement income
                  </p>
                </div>

                {/* Featured Top 3 Learning Points */}
                <div className="mb-16">
                  <h4 className="text-sm font-bold text-accent text-center mb-8 tracking-wider uppercase">Featured Topics</h4>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative flex flex-col gap-4 p-8 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                        1
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground text-lg mb-2">Claiming Age Impact</p>
                        <p className="text-base text-muted-foreground leading-relaxed">How the age you apply affects your total lifetime benefit.</p>
                      </div>
                    </div>

                    <div className="relative flex flex-col gap-4 p-8 rounded-xl bg-gradient-to-br from-accent/10 via-primary/5 to-transparent border-2 border-accent/30 hover:border-accent/50 shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]">
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                        2
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground text-lg mb-2">Tax Minimization</p>
                        <p className="text-base text-muted-foreground leading-relaxed">Strategies for minimizing taxes on Social Security income.</p>
                      </div>
                    </div>

                    <div className="relative flex flex-col gap-4 p-8 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-2 border-primary/30 hover:border-primary/50 shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                        3
                      </div>
                      <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground text-lg mb-2">Income Coordination</p>
                        <p className="text-base text-muted-foreground leading-relaxed">Coordinating Social Security with pensions, IRAs, and other income sources.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Topics */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground text-center mb-8 tracking-wider uppercase">Additional Topics Covered</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">COLA Adjustments</p>
                        <p className="text-sm text-muted-foreground">Understanding cost-of-living adjustments and their impact.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        5
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Delaying Benefits</p>
                        <p className="text-sm text-muted-foreground">When delaying benefits makes sense—and when it doesn't.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        6
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Employment Effects</p>
                        <p className="text-sm text-muted-foreground">How current employment affects benefit eligibility.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        7
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Family & Survivor Benefits</p>
                        <p className="text-sm text-muted-foreground">Two lesser-known strategies to increase family and survivor benefits.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        8
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Fixing Mistakes</p>
                        <p className="text-sm text-muted-foreground">What to do if you've made a filing mistake.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50 hover:border-primary/30 shadow-lg hover:-translate-y-1 transition-all duration-200">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        9
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Holistic Planning</p>
                        <p className="text-sm text-muted-foreground">How to integrate Social Security with your overall retirement plan.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Should Attend */}
              <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 border-2 border-accent/30 space-component-md shadow-xl">
                <Users className="w-14 h-14 text-accent mx-auto mb-6" />
                <h3 className="heading-md mb-4">Perfect For Ages 55-70</h3>
                <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  This seminar is designed for <strong className="text-foreground">pre-retirees and retirees approaching retirement</strong> who want to understand how to make the most of their Social Security benefits and retirement income. Whether you're planning to claim soon or have already started benefits, you'll gain valuable insights.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">200+ attendees</strong> have benefited from our seminars</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section - Moved Higher for Better Conversion */}
        <section id="rsvp-form" className="section-bg-premium-light section-2xl relative scroll-mt-20">
          <GradientAccent variant="purple" position="top-right" />
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="space-component-md text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited Spots Available</span>
                </div>
                <h2 className="heading-xl mb-4">Reserve Your Seat Today</h2>
                <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose your preferred date and secure your spot. <strong className="text-foreground">Space is limited</strong>, so register early to ensure your attendance.
                </p>
              </div>

              {/* Date Selection with Tabs */}
              <div className="mb-8 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-card border-2 border-accent/30 shadow-xl">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border-2 border-accent/40">
                    <Calendar className="w-8 h-8 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground text-base">Option 1</p>
                      <p className="text-sm text-muted-foreground">Thursday, Nov 13, 2024</p>
                      <p className="text-sm font-medium text-foreground">6:30 PM - 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border-2 border-primary/40">
                    <Calendar className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground text-base">Option 2</p>
                      <p className="text-sm text-muted-foreground">Tuesday, Nov 18, 2024</p>
                      <p className="text-sm font-medium text-foreground">6:30 PM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">Select your preferred session in the registration form below</p>
              </div>

              {/* Iframe Container */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-card border-2 border-border">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
                    <div className="text-center space-component-sm">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground font-medium">Loading registration form...</p>
                      <p className="text-sm text-muted-foreground">Just a moment while we prepare your registration</p>
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

              {/* Post-Registration Information */}
              <div className="mt-8 p-8 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 max-w-3xl mx-auto shadow-lg">
                <h3 className="font-bold text-foreground text-lg mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  What Happens After Registration
                </h3>
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">1</div>
                    <span>You'll receive a <strong className="text-foreground">confirmation email</strong> with event details and location information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">2</div>
                    <span>A <strong className="text-foreground">calendar invite</strong> will be sent to easily add the event to your schedule</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">3</div>
                    <span>We'll send a <strong className="text-foreground">reminder 48 hours before</strong> the event with any last-minute updates</span>
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
                  size="lg"
                  onClick={() => window.open(rsvpUrl, '_blank')}
                  className="gap-2 min-h-[48px] w-full sm:w-auto"
                  aria-label="Open registration form in a new tab"
                >
                  Open in New Tab
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Seminar Matters - Moved Below RSVP */}
        <section className="section-bg-default section-2xl relative">
          <GradientAccent variant="gold" position="bottom-left" />
          
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-xl mb-6">Why Attend This Seminar?</h2>
              <p className="text-body-xl text-muted-foreground leading-relaxed mb-8">
                One of the most important retirement decisions you'll make is <strong className="text-foreground">when and how to claim Social Security benefits</strong>. This seminar explains how to maximize your Social Security income, minimize taxes, and avoid costly mistakes that can <strong className="text-foreground">permanently impact</strong> your retirement lifestyle.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 rounded-xl bg-card/50 border border-border shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">Expert Guidance</p>
                  <p className="text-sm text-muted-foreground">Learn from certified financial professionals</p>
                </div>
                <div className="p-6 rounded-xl bg-card/50 border border-border shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">Real Examples</p>
                  <p className="text-sm text-muted-foreground">Case studies from actual retirees</p>
                </div>
                <div className="p-6 rounded-xl bg-card/50 border border-border shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">Actionable Steps</p>
                  <p className="text-sm text-muted-foreground">Walk away with a clear strategy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Venue Information Section */}
        <section className="section-bg-default section-2xl relative">
          <GradientAccent variant="blue" position="top-left" />
          
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-component-md mb-12">
                <h2 className="heading-lg">Questions? Get in Touch</h2>
                <p className="text-body-lg text-muted-foreground">
                  Need more information? We're here to help with any questions about the seminar.
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
