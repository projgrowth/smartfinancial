import React from 'react';
import { Outlet } from 'react-router-dom';
import NewNavbar from '@/components/NewNavbar';

const NewLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <NewNavbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default NewLayout;