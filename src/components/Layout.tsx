import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import SkipLink from '@/components/SkipLink';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="pt-[var(--nav-h)]">
        <Outlet />
      </main>
      <StickyCTA />
      <Footer />
    </div>
  );
};

export default Layout;
