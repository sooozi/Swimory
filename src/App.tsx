import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from './pages/Intro'; // 인트로 화면
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </Router>
  );
}

export default App;