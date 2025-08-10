import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="pt-[var(--nav-h)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
