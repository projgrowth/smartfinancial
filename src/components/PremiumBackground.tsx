
import React, { memo } from 'react';

const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      {/* Modern gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 via-white/90 to-amber-50/30"></div>
      
      {/* Abstract blue gradient shape (left) - more subtle */}
      <div className="absolute top-[5%] -left-[10%] w-[50%] h-[90%] bg-gradient-to-br from-sky-200/15 to-blue-300/10 blur-3xl rounded-full transform -rotate-12 animate-float duration-25000"></div>
      
      {/* Abstract amber gradient shape (right) - more subtle */}
      <div className="absolute top-[15%] -right-[10%] w-[50%] h-[70%] bg-gradient-to-br from-gold-light/15 to-gold/10 blur-3xl rounded-full transform rotate-12 animate-float duration-20000"></div>
      
      {/* Additional subtle shapes with staggered animations */}
      <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-blue-200/10 to-sky-300/5 blur-3xl rounded-full animate-float duration-15000"></div>
      <div className="absolute top-[40%] right-[25%] w-[25%] h-[25%] bg-gradient-to-br from-gold-light/10 to-gold/5 blur-3xl rounded-full animate-float duration-12000"></div>
      
      {/* Add a subtle grid pattern for modern feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOEgwdjE4aDM2eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')] opacity-[0.02]"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.01] mix-blend-overlay"></div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(PremiumBackground);
