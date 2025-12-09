
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
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-white/20 shadow-lg">
      <h4 className="text-sm font-medium text-white tracking-wide flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
        Key Financial Concepts
      </h4>
      <div className="space-component-xs">
        {terms.map((term, idx) => (
          <div 
            key={idx} 
            className="bg-white/5 rounded-md border border-white/20 overflow-hidden transition-all duration-150 hover:border-white/30"
          >
            <button
              onClick={() => toggleTerm(idx)}
              className="w-full text-left p-3 flex justify-between items-center group"
              aria-expanded={expandedTerm === idx}
              aria-controls={`term-content-${idx}`}
            >
              <h5 className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-150">
                {term.term}
              </h5>
              {expandedTerm === idx ? (
                <ChevronUp className="h-4 w-4 text-accent transition-transform duration-150" />
              ) : (
                <ChevronDown className="h-4 w-4 text-accent transition-transform duration-150" />
              )}
            </button>
            <div 
              id={`term-content-${idx}`}
              className={`overflow-hidden transition-all duration-150 ${
                expandedTerm === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-3 pb-3 pt-1">
                <p className="text-xs text-white/90 leading-relaxed border-t border-white/20 pt-2">
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
