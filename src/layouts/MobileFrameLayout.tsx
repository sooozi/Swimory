import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import DockBar from '../components/layout/DockBar';

const MobileFrameLayout = () => {
  const { pathname } = useLocation();

  const hiddenLayoutRoutes = ['/', '/login'];
  const isLayoutHidden = hiddenLayoutRoutes.includes(pathname);

  return (
    <div className="relative px-auto md:py-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔵 li 기반 배경 애니메이션 */}
      <ul className="floating-bg pointer-events-none absolute top-0 left-0 w-full h-full z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      {/* 🔵 메인 콘텐츠 */}
      <div
        className="
          relative z-10
          w-full h-screen    
          md:w-[375px] md:h-[80vh]
          bg-white rounded-none 
          md:rounded-[30px]  
          shadow-none md:shadow-2xl
          border-none md:border border-gray-200
          overflow-hidden
          flex flex-col
        "
      >
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
