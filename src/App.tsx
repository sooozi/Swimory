import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Intro from './pages/Intro';
import Index from './pages/Index';
import MobileFrameLayout from './layouts/MobileFrameLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* 모든 페이지는 Layout 안에서 렌더링되도록 함 */}
        <Route element={<MobileFrameLayout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/mypage" element={<Index />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;