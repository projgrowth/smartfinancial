import { Linkedin, Instagram, LucideIcon } from 'lucide-react';

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export type NavLink = {
  name: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/smart-financial-planning',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thesmartfinancialplan/',
    icon: Instagram,
  },
];

export const companyLinks: NavLink[] = [
  { name: 'Our Team', url: '/#team' },
  { name: 'FAQ', url: '/#faq' },
];

export const serviceLinks: NavLink[] = [
  { name: 'Wealth Management', url: '/#services' },
  { name: 'Investment Planning', url: '/#services' },
  { name: 'Retirement Planning', url: '/#services' },
  { name: 'Tax Optimization', url: '/#services' },
  { name: 'Estate Planning', url: '/#services' },
];

export const contactInfo = {
  address: {
    line1: '111 N Orange Ave, STE 800',
    line2: 'Orlando, Florida 32801',
  },
  phone: {
    display: '(706) 627-5729',
    tel: '+17066275729',
  },
  email: 'info@thesmartfinancialplan.com',
};
