import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Intro from './pages/Intro';
import Record from './pages/Record';
import Index from './pages/Index';
import Video from './pages/Video';
import Info from './pages/Info';
import MobileFrameLayout from './layouts/MobileFrameLayout';
import OauthKakao from './pages/OauthKakao';

function App() {
  return (
    <Router>
      <Routes>
        {/* 모든 페이지는 Layout 안에서 렌더링되도록 함 */}
        <Route element={<MobileFrameLayout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/mypage" element={<Index />} /> // 로그인 후 바로 노출되는 페이지 (내 정보)
          <Route path="/info" element={<Info />} /> // 수영장 정보 노출 페이지
          <Route path="/record" element={<Record />} /> // 수영 기록하는 페이지
          <Route path="/video" element={<Video />} /> // 유튜브 영상 노출 페이지
          <Route path="/oauth/kakao" element={<OauthKakao />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;