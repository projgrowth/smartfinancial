
import React from 'react';
import { KeyTerm } from './types';

interface KeyTermsProps {
  terms: KeyTerm[];
}

const KeyTerms: React.FC<KeyTermsProps> = ({ terms }) => {
  if (terms.length === 0) return null;
  
  return (
    <div className="bg-blue-900/30 p-4 rounded-md border border-blue-500/30">
      <h4 className="text-sm font-medium text-blue-100 mb-3">Key Financial Concepts:</h4>
      <div className="space-y-3">
        {terms.map((term, idx) => (
          <div key={idx} className="last:mb-0">
            <h5 className="text-sm font-medium text-white">{term.term}</h5>
            <p className="text-xs text-blue-100/90">{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyTerms;
