import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Mail, Phone, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ScrollReveal';
import { sanitizeInput } from '@/utils/security';
import { supabase } from '@/integrations/supabase/client';
import { meetingRequestSchema } from '@/lib/formValidation';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setContactInfo(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const validatedData = meetingRequestSchema.parse({
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        preferred_date: date && time ? `${format(date, 'EEEE, MMMM d, yyyy')} at ${time}` : undefined,
        message: contactInfo.message || undefined,
      });

      // Insert into database
      const { error: dbError } = await supabase
        .from('meeting_requests')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          preferred_date: validatedData.preferred_date,
          message: validatedData.message,
        });

      if (dbError) throw dbError;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'meeting',
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            preferred_date: validatedData.preferred_date,
            message: validatedData.message,
          },
        },
      });

      toast({
        title: "Meeting Request Submitted!",
        description: `We'll contact you within 24 hours to confirm your ${MEETING_TYPES.find(t => t.id === meetingType)?.name}.`,
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage || "There was an issue submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section id="schedule" className="section-lg relative overflow-hidden section-bg-subtle" role="region" aria-labelledby="schedule-heading">
      <div className="container-narrow relative z-10 space-component-lg">
        <div className="text-center space-component-sm">
          <ScrollReveal distance="8px">
            <h2 id="schedule-heading" className="heading-lg text-foreground">
              Schedule a Meeting
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100} distance="6px">
            <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto">
              Book a time to speak with our financial advisors about your goals and how we can help you achieve them.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow duration-150">
            <CardContent className="space-component-md">
              <Tabs defaultValue="schedule" className="w-full space-component-md">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="schedule">Schedule Online</TabsTrigger>
                  <TabsTrigger value="contact">Contact Us Directly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="schedule">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="grid-two-col gap-unified-lg">
                        <div className="space-component-sm">
                          <h3 className="heading-sm text-foreground">Select a Date</h3>
                          <div className="border border-accent/30 rounded-md bg-background space-component-xs">
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
                        
                        <div className="space-component-sm">
                          <div className="space-component-sm">
                            <h3 className="heading-sm text-foreground">Select Meeting Type</h3>
                            <div className="space-component-xs" role="radiogroup" aria-label="Select meeting type">
                              {MEETING_TYPES.map((type) => (
                                <button
                                  key={type.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={meetingType === type.id}
                                  aria-label={`${type.name} ${type.duration}`}
                                  tabIndex={0}
                                  className={`w-full text-left space-component-xs border rounded-md cursor-pointer transition-all duration-150 touch-target ${
                                    meetingType === type.id
                                      ? 'border-accent bg-accent/10'
                                      : 'border-border hover:border-accent/50'
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
                                      <p className="text-xs text-muted-foreground">Duration: {type.duration}</p>
                                    </div>
                                    <div className={`h-4 w-4 rounded-full border ${
                                      meetingType === type.id
                                        ? 'bg-accent border-accent'
                                        : 'border-border'
                                    }`}>
                                      {meetingType === type.id && (
                                        <div className="h-full w-full flex items-center justify-center">
                                          <div className="h-2 w-2 rounded-full bg-white"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {date && (
                            <div className="space-component-sm">
                              <h3 className="heading-sm text-foreground">
                                Available Times for {format(date, 'EEEE, MMMM d')}
                              </h3>
                              <div className="grid-time-slots" role="radiogroup" aria-label="Select a time slot">
                                {MEETING_TIMES.map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    role="radio"
                                    aria-checked={time === t}
                                    className={`space-component-xs border rounded-md text-center cursor-pointer text-sm transition-all duration-150 touch-target ${
                                      time === t
                                        ? 'border-accent bg-accent/10 text-accent-foreground'
                                        : 'border-border hover:border-accent/50'
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
                      <div className="space-component-sm">
                        <div className="space-component-xs bg-accent/5 rounded-md">
                          <h3 className="heading-sm text-foreground">Your Selected Time</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{time}</span>
                          </div>
                          <div className="text-muted-foreground">
                            <span className="font-medium">{MEETING_TYPES.find(t => t.id === meetingType)?.name}</span>
                            <span> ({MEETING_TYPES.find(t => t.id === meetingType)?.duration})</span>
                          </div>
                        </div>
                        
                        <div className="grid-two-col gap-unified-md">
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={contactInfo.name}
                              onChange={handleInputChange}
                              className="form-input touch-target"
                              aria-required="true"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={contactInfo.email}
                              onChange={handleInputChange}
                              className="form-input touch-target"
                              aria-required="true"
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={contactInfo.phone}
                            onChange={handleInputChange}
                            className="form-input touch-target"
                            aria-required="true"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="message" className="form-label">
                            What would you like to discuss? (Optional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={contactInfo.message}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>

                      </div>
                    )}
                    
                    <div className="flex justify-between space-component-sm">
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
                        <Button 
                          type="submit" 
                          variant="hero" 
                          disabled={isSubmitting}
                          className="flex items-center gap-2"
                        >
                          {isSubmitting ? "Submitting..." : "Confirm Meeting Request"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="contact">
                  <div className="text-center section-sm max-w-lg mx-auto space-component-md">
                    <h3 className="heading-sm text-foreground">
                      Prefer to reach us directly?
                    </h3>
                    
                    <div className="space-component-sm">
                      <div className="space-component-xs text-center">
                        <div className="inline-block space-component-xs rounded-full bg-accent/10">
                          <Phone className="h-6 w-6 text-accent" aria-hidden="true" />
                        </div>
                        <h4 className="font-medium">Call Us</h4>
                        <a href="tel:+17066275729" className="text-muted-foreground hover:text-accent transition-colors">(706) 627-5729</a>
                        <p className="text-xs text-muted-foreground">Monday - Friday, 9:00 AM - 5:00 PM ET</p>
                      </div>
                      
                      <div className="space-component-xs text-center">
                        <div className="inline-block space-component-xs rounded-full bg-accent/10">
                          <Mail className="h-6 w-6 text-accent" aria-hidden="true" />
                        </div>
                        <h4 className="font-medium">Email Us</h4>
                        <a href="mailto:info@thesmartfinancialplan.com" className="text-muted-foreground hover:text-accent transition-colors break-all">info@thesmartfinancialplan.com</a>
                        <p className="text-xs text-muted-foreground">We'll respond within 24 business hours</p>
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
