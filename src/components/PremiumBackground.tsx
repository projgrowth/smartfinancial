
import React, { memo } from 'react';

const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 via-white/80 to-amber-50/30"></div>
      
      {/* Abstract blue gradient shape (left) */}
      <div className="absolute top-[5%] -left-[10%] w-[50%] h-[90%] bg-gradient-to-br from-sky-200/20 to-blue-300/10 blur-3xl rounded-full transform -rotate-12"></div>
      
      {/* Abstract amber gradient shape (right) */}
      <div className="absolute top-[15%] -right-[10%] w-[50%] h-[70%] bg-gradient-to-br from-gold-light/20 to-gold/10 blur-3xl rounded-full transform rotate-12"></div>
      
      {/* Additional subtle shapes */}
      <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-blue-200/10 to-sky-300/5 blur-3xl rounded-full"></div>
      <div className="absolute top-[40%] right-[25%] w-[25%] h-[25%] bg-gradient-to-br from-gold-light/10 to-gold/5 blur-3xl rounded-full"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay"></div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(PremiumBackground);
