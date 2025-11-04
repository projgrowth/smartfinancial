import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import SkipLink from '@/components/SkipLink';
import { Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();
  const isRSVPPage = location.pathname === '/rsvp';

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="pt-[var(--nav-h)]">
        <Outlet />
      </main>
      {!isRSVPPage && <StickyCTA />}
      <Footer />
    </div>
  );
};

export default Layout;
