import React from 'react';

export default function RecordPage() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-100 via-blue-100 to-sky-200 flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 animate-pulse bg-white/10 blur-sm" />
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight drop-shadow-md z-10">
        Record Page 📘
      </h1>
      
      <p className="mt-4 text-lg text-gray-700 font-medium z-10 text-center px-6">
        Record 페이지입니다.
      </p>

      <div className="mt-8 z-10">
        <a
          href="/"
          className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
        >
          홈으로 이동
        </a>
      </div>
    </div>
  );
}