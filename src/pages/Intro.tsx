import { useNavigate } from 'react-router-dom';

export default function IntroPage() {
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h1 className="text-[2.5rem] font-extrabold text-primary tracking-tight drop-shadow-md z-10">
        Swimory 🐬
      </h1>
      <p className="mt-4 text-base md:text-l text-gray-700 font-medium z-10">
        수영의 기억을 지도 위에 그리고 기록으로 남기다
      </p>

      <div className="mt-8 flex gap-4 z-10">
        <button
          // onClick={() => navigate('/')}
          onClick={() => window.location.href = KAKAO_AUTH_URL}
          className="btn-primary px-5 py-3 rounded-2xl shadow-md transition text-sm"
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
}