/**
 * Testimonials Content
 * Anonymized client testimonials for social proof
 */

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  context?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'founder-exit',
    quote: 'They helped me see my business exit not as an endpoint, but as the beginning of my next chapter. The tax savings alone paid for years of planning.',
    attribution: 'Founder, $5M Exit',
    context: 'Business Owner',
  },
  {
    id: 'executive-stock',
    quote: 'I finally have a clear strategy for my stock options. No more guessing about timing or worrying about concentration risk.',
    attribution: 'VP, Fortune 500 Tech Company',
    context: 'Corporate Executive',
  },
  {
    id: 'physician-couple',
    quote: 'As dual-income physicians, our financial situation was complex. They brought clarity and coordination we\'d been missing for years.',
    attribution: 'Physician Couple, $3M+ Portfolio',
    context: 'Medical Professionals',
  },
  {
    id: 'retiree-legacy',
    quote: 'Retirement planning is about more than numbers. They helped us define what legacy really means to our family.',
    attribution: 'Retired Executive, 65',
    context: 'Pre-Retiree',
  },
  {
    id: 'business-owner-succession',
    quote: 'The succession planning process was transformative. My children are prepared, my team is aligned, and I have peace of mind.',
    attribution: 'Second-Generation Business Owner',
    context: 'Business Owner',
  },
  {
    id: 'executive-relocation',
    quote: 'When I relocated for a new role, they seamlessly handled the stock transition and helped me avoid costly mistakes.',
    attribution: 'C-Suite Executive, Manufacturing',
    context: 'Corporate Executive',
  },
];
