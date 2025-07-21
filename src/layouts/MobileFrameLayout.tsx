import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import DockBar from '../components/layout/DockBar';

const MobileFrameLayout = () => {
  return (
    <div className="px-auto md:py-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* PC에서만 카드 프레임 형태로 보이고, 모바일에선 전체 영역 사용 */}
      <div className="
        w-full h-screen    
        md:w-[375px] md:h-[80vh] // PC에서는 고정된 모바일 사이즈
        bg-white rounded-none 
        md:rounded-[30px]  
        shadow-none md:shadow-2xl
        border-none md:border border-gray-200
        overflow-hidden
        flex flex-col
      ">
        <Header />
        <main className="w-full flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <DockBar />
      </div>
    </div>
  );
};

export default MobileFrameLayout;
