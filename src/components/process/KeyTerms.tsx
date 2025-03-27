
import React from 'react';
import { KeyTerm } from './types';

interface KeyTermsProps {
  terms: KeyTerm[];
}

const KeyTerms: React.FC<KeyTermsProps> = ({ terms }) => {
  if (terms.length === 0) return null;
  
  return (
    <div className="bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
      <h4 className="text-sm font-medium text-blue-200 mb-2">Key Financial Concepts:</h4>
      {terms.map((term, idx) => (
        <div key={idx} className="mb-2 last:mb-0">
          <h5 className="text-sm font-medium text-white">{term.term}</h5>
          <p className="text-xs text-lightgray">{term.definition}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyTerms;
