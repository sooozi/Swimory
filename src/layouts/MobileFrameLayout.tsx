import React from 'react';
import { Outlet } from 'react-router-dom';

const MobileFrameLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      {/* PC에서만 카드 프레임 형태로 보이고, 모바일에선 전체 영역 사용 */}
      <div className="
        w-full h-full              // 기본: 모바일에서는 전체 영역
        md:w-[375px] md:h-[812px] // PC에서는 고정된 모바일 사이즈
        bg-white rounded-none     // 모바일에서는 둥근 모서리 제거
        md:rounded-[30px]         // PC에서만 둥근 모서리
        shadow-none md:shadow-2xl
        border-none md:border border-gray-200
        overflow-hidden
      ">
        <div className="w-full h-full overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MobileFrameLayout;
