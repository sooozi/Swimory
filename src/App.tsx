import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Intro from './pages/Intro';
import MobileFrameLayout from './layouts/MobileFrameLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* 모든 페이지를 MobileFrameLayout으로 감쌈 */}
        <Route element={<MobileFrameLayout />}>
          <Route path="/" element={<Intro />} />
          {/* 필요한 다른 페이지들 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;