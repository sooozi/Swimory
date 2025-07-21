import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import DockBar from '../components/layout/DockBar';

const MobileFrameLayout = () => {
  const { pathname } = useLocation();

  // 이 경로들에서는 Header, DockBar 숨김
  const hiddenLayoutRoutes = ['/', '/login'];
  const isLayoutHidden = hiddenLayoutRoutes.includes(pathname);

  return (
    <div className="px-auto md:py-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="
        w-full h-screen    
        md:w-[375px] md:h-[80vh]
        bg-white rounded-none 
        md:rounded-[30px]  
        shadow-none md:shadow-2xl
        border-none md:border border-gray-200
        overflow-hidden
        flex flex-col
      ">
        {!isLayoutHidden && <Header />}
        <main className="w-full flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {!isLayoutHidden && <DockBar />}
      </div>
    </div>
  );
};

export default MobileFrameLayout;

