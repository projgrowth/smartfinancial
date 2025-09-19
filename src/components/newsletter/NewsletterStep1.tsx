
import React from 'react';
import { Mail } from 'lucide-react';

interface NewsletterStep1Props {
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
}

const NewsletterStep1: React.FC<NewsletterStep1Props> = ({ 
  email, 
  setEmail, 
  name, 
  setName 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2.5 pr-12 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 pointer-events-none" />
        </div>
      </div>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          Your Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          className="w-full px-4 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default NewsletterStep1;
