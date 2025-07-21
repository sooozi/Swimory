import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, UserIcon } from 'lucide-react'; // 아이콘은 자유롭게 교체 가능

const DockBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full h-[60px] bg-white border-t border-gray-200 flex justify-around items-center z-50">
      <Link to="/" className={currentPath === '/home' ? 'text-blue-500' : 'text-gray-500'}>
        <HomeIcon className="w-6 h-6" />
      </Link>
      <Link to="/" className={currentPath === '/search' ? 'text-blue-500' : 'text-gray-500'}>
        <SearchIcon className="w-6 h-6" />
      </Link>
      <Link to="/" className={currentPath === '/mypage' ? 'text-blue-500' : 'text-gray-500'}>
        <UserIcon className="w-6 h-6" />
      </Link>
    </nav>
  );
};

export default DockBar;
