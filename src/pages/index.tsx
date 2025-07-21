import { useNavigate } from 'react-router-dom';
import { ArrowDownIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-100 via-blue-100 to-sky-200 flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 animate-pulse bg-[url('/wave-pattern.svg')] bg-repeat opacity-10" />
      <h1 className="text-5xl md:text-5xl font-extrabold text-blue-700 tracking-tight drop-shadow-md z-10">
        Swimory 🐬
      </h1>
      <p className="mt-4 text-lg md:text-l text-gray-700 font-medium z-10">
        수영의 기억을 지도 위에 그리고 기록으로 남기다
      </p>

      <div className="mt-8 flex gap-4 z-10">
        <button
          onClick={() => navigate('/map')}
          className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
        >
          수영장 찾기
        </button>
        <button
          onClick={() => navigate('/record')}
          className="px-6 py-3 rounded-2xl bg-white text-blue-600 border border-blue-300 hover:bg-blue-100 shadow-sm transition"
        >
          기록 시작하기
        </button>
      </div>

      <div className="absolute bottom-6 animate-bounce z-10">
        <ArrowDownIcon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
  );
}

export default Index