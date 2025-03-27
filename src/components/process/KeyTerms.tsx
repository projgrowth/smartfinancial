
import React from 'react';
import { KeyTerm } from './types';

interface KeyTermsProps {
  terms: KeyTerm[];
}

const KeyTerms: React.FC<KeyTermsProps> = ({ terms }) => {
  if (terms.length === 0) return null;
  
  return (
    <div className="bg-blue-900/60 p-5 rounded-md border border-blue-400/50 shadow-inner shadow-blue-500/10">
      <h4 className="text-sm font-medium text-blue-50 mb-3 tracking-wide">Key Financial Concepts:</h4>
      <div className="space-y-4">
        {terms.map((term, idx) => (
          <div key={idx} className="last:mb-0 bg-blue-800/40 p-3 rounded border border-blue-700/40">
            <h5 className="text-sm font-medium text-white mb-1">{term.term}</h5>
            <p className="text-xs text-blue-50/95 leading-relaxed">{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyTerms;
