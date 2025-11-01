
import React, { useState } from 'react';
import { KeyTerm } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface KeyTermsProps {
  terms: KeyTerm[];
}

const KeyTerms: React.FC<KeyTermsProps> = ({ terms }) => {
  const [expandedTerm, setExpandedTerm] = useState<number | null>(null);
  
  if (terms.length === 0) return null;
  
  const toggleTerm = (index: number) => {
    setExpandedTerm(expandedTerm === index ? null : index);
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/90 p-5 rounded-lg border border-blue-400/50 shadow-md">
      <h4 className="text-sm font-medium text-blue-50 mb-4 tracking-wide flex items-center">
        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></span>
        Key Financial Concepts
      </h4>
      <div className="space-y-3">
        {terms.map((term, idx) => (
          <div 
            key={idx} 
            className="bg-blue-800/50 rounded-md border border-blue-700/50 overflow-hidden transition-all duration-300 hover:border-blue-500/50"
          >
            <button
              onClick={() => toggleTerm(idx)}
              className="w-full text-left p-3 flex justify-between items-center group"
              aria-expanded={expandedTerm === idx}
              aria-controls={`term-content-${idx}`}
            >
              <h5 className="text-sm font-medium group-hover:text-blue-200 transition-colors duration-200" style={{ color: 'hsl(var(--primary-foreground))' }}>
                {term.term}
              </h5>
              {expandedTerm === idx ? (
                <ChevronUp className="h-4 w-4 text-blue-300 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-300 transition-transform duration-300" />
              )}
            </button>
            <div 
              id={`term-content-${idx}`}
              className={`overflow-hidden transition-all duration-300 ${
                expandedTerm === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-3 pb-3 pt-1">
                <p className="text-xs text-blue-100 leading-relaxed border-t border-blue-700/30 pt-2">
                  {term.definition}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyTerms;
