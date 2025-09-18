
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Mail, Phone, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

const MEETING_TIMES = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const MEETING_TYPES = [
  { id: 'initial', name: 'Initial Consultation', duration: '30 min' },
  { id: 'comprehensive', name: 'Comprehensive Review', duration: '60 min' },
  { id: 'followup', name: 'Follow-up Meeting', duration: '45 min' }
];

const MeetingScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState('initial');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zapier_webhook_schedule') || '';
    }
    return '';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zapier_webhook_schedule', webhookUrl);
    }
  }, [webhookUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!contactInfo.name.trim() || !contactInfo.email.trim() || !contactInfo.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const webhook = webhookUrl.trim();

      if (webhook) {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({ 
            date: date?.toISOString(),
            time,
            meetingType: MEETING_TYPES.find(t => t.id === meetingType)?.name,
            ...contactInfo,
            timestamp: new Date().toISOString(),
            source: 'website'
          })
        });
      } else {
        console.warn('No Zapier webhook configured for scheduling. Add one in the Webhook URL field.');
      }
      
      toast({
        title: "Meeting Request Submitted!",
        description: `We'll contact you within 24 hours to confirm your ${MEETING_TYPES.find(t => t.id === meetingType)?.name} for ${format(date as Date, 'EEEE, MMMM d, yyyy')} at ${time}.`,
      });
      
      // Reset form
      setDate(undefined);
      setTime(null);
      setMeetingType('initial');
      setContactInfo({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setStep(1);
    } catch (error) {
      toast({
        title: "Request Submitted",
        description: "We've received your meeting request and will contact you shortly.",
      });
      
      // Reset form even if webhook fails
      setDate(undefined);
      setTime(null);
      setMeetingType('initial');
      setContactInfo({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setStep(1);
      toast({
        title: "Error",
        description: "There was an issue reaching the webhook. Please check the URL or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (step === 1 && !date) {
      toast({
        title: "Please select a date",
        description: "You need to select a date to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 1 && !time) {
      toast({
        title: "Please select a time",
        description: "You need to select a time slot to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <section id="schedule" className="section relative overflow-hidden bg-accent/20">
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" />
      <div className="container-site relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center content-group">
            Schedule a Meeting
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto content-section">
            Book a time to speak with our financial advisors about your goals and how we can help you achieve them.
          </p>
        </ScrollReveal>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-border shadow-design-sm hover:shadow-design-md transition-all duration-300">
            <CardContent className="card-padding">
              <Tabs defaultValue="schedule" className="w-full">
                <TabsList className="grid-two-col content-block">
                  <TabsTrigger value="schedule">Schedule Online</TabsTrigger>
                  <TabsTrigger value="contact">Contact Us Directly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="schedule">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="grid-two-col card-gap-lg">
                        <div>
                          <h3 className="heading-md text-foreground content-item">Select a Date</h3>
                          <div className="border border-border rounded-md card-padding-sm bg-background">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => 
                                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                isWeekend(date)
                              }
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="heading-md text-foreground content-item">Select Meeting Type</h3>
                          <div className="content-group" role="radiogroup" aria-label="Select meeting type">
                              {MEETING_TYPES.map((type) => (
                                <button
                                  key={type.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={meetingType === type.id}
                                  aria-label={`${type.name} ${type.duration}`}
                                  tabIndex={0}
                                  className={`w-full text-left card-padding border rounded-md cursor-pointer transition-all duration-200 ${
                                    meetingType === type.id
                                      ? 'border-primary bg-accent/10'
                                      : 'border-border hover:border-accent'
                                  }`}
                                  onClick={() => setMeetingType(type.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setMeetingType(type.id);
                                    }
                                  }}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">{type.name}</h4>
                                      <p className="text-body-xs text-muted-foreground">Duration: {type.duration}</p>
                                    </div>
                                    <div className={`icon-sm rounded-full border ${
                                      meetingType === type.id
                                        ? 'bg-primary border-primary'
                                        : 'border-muted'
                                    }`}>
                                      {meetingType === type.id && (
                                        <div className="h-full w-full flex items-center justify-center">
                                          <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          
                          {date && (
                            <div>
                              <h3 className="heading-sm text-foreground content-item">
                                Available Times for {format(date, 'EEEE, MMMM d')}
                              </h3>
                              <div className="grid grid-cols-2 sm:grid-cols-3 card-gap-sm" role="radiogroup" aria-label="Select a time slot">
                                {MEETING_TIMES.map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    role="radio"
                                    aria-checked={time === t}
                                    className={`touch-target border rounded-md text-center cursor-pointer text-body-sm transition-all duration-200 ${
                                      time === t
                                        ? 'border-primary bg-accent/10 text-primary'
                                        : 'border-border hover:border-accent'
                                    }`}
                                    onClick={() => setTime(t)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setTime(t);
                                      }
                                    }}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div>
                        <div className="mb-6 p-4 bg-blue-50/50 rounded-md">
                          <h3 className="heading-md text-charcoal space-component-xs">Your Selected Time</h3>
                          <div className="flex items-center gap-2 text-charcoal/80 mb-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-charcoal/80 mb-1">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="text-charcoal/80">
                            <span className="font-medium">{MEETING_TYPES.find(t => t.id === meetingType)?.name}</span>
                            <span> ({MEETING_TYPES.find(t => t.id === meetingType)?.duration})</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="name" className="block text-body-sm font-medium text-foreground space-component-xs">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={contactInfo.name}
                              onChange={handleInputChange}
                              className="w-full touch-target border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-body-sm font-medium text-foreground space-component-xs">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={contactInfo.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                            What would you like to discuss? (Optional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={contactInfo.message}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div className="mt-6">
                          <label htmlFor="zapierWebhook" className="block text-xs font-medium text-charcoal mb-1">
                            Zapier Webhook URL (optional, site owner)
                          </label>
                          <input
                            type="url"
                            id="zapierWebhook"
                            placeholder="https://hooks.zapier.com/..."
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-[11px] text-charcoal/60 mt-1">If provided, a request is sent to this URL on submit.</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                      {step > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                      )}
                      
                      {step < 2 ? (
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          className="ml-auto"
                          disabled={!date || !time}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit">
                          Schedule Meeting
                        </Button>
                      )}
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="contact">
                  <div className="text-center py-6 px-4 max-w-lg mx-auto">
                    <h3 className="text-lg font-medium text-charcoal mb-6">
                      Prefer to reach us directly?
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="inline-block p-3 rounded-full bg-blue-100 mb-3">
                          <Phone className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium">Call Us</h4>
                        <p className="text-charcoal/80">(706) 627-5729</p>
                        <p className="text-xs text-charcoal/60 mt-1">Monday - Friday, 9:00 AM - 5:00 PM ET</p>
                      </div>
                      
                      <div>
                        <div className="inline-block p-3 rounded-full bg-blue-100 mb-3">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium">Email Us</h4>
                        <p className="text-charcoal/80">info@thesmartfinancialplan.com</p>
                        <p className="text-xs text-charcoal/60 mt-1">We'll respond within 24 business hours</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MeetingScheduler;
