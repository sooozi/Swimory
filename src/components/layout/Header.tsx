import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full h-[60px] bg-white shadow-md text-center text-xl font-semibold sticky top-0 z-10 flex items-center justify-center">
      <Link to="/mypage" className="hover:opacity-80 transition-opacity">
        🐬 Swimory
      </Link>
    </header>
  );
};

export default Header;