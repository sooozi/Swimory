import React from 'react';

import './App.css';
import NearbyPools from './components/NearbyPools';
import { SwimmingPool } from './types/pool';

// 기본 컴포넌트 정의
function Home() {
  const handlePoolSelect = (pool: SwimmingPool) => {
    console.log('선택된 수영장:', pool);
    alert(`${pool.name}을(를) 선택했습니다!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 p-8 text-white text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">🏊‍♀️</span>
        </div>
        <h1 className="text-3xl font-bold">Swimory</h1>
        <p className="text-lg">수영 기록 관리 앱</p>
      </header>
      
      <main className="container mx-auto py-8">
        <NearbyPools onPoolSelect={handlePoolSelect} />
      </main>
    </div>
  );
}

// About 컴포넌트는 나중에 라우팅 설정 시 사용 예정
// function About() {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">About Swimory</h1>
//       <p className="text-gray-600">
//         Swimory는 수영 활동을 기록하고 관리하는 앱입니다.
//       </p>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
