import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ScrollProgress from '@/components/ScrollProgress';
import OptimizedPremiumBackground from './OptimizedPremiumBackground';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <OptimizedPremiumBackground />
      <ScrollProgress />
      <Navbar />
      <div className="pt-[var(--nav-h)]">
        <Outlet />
      </div>
      <StickyCTA />
      <Footer />
    </div>
  );
};

export default Layout;
