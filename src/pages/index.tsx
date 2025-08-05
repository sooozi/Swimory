import { useNavigate } from 'react-router-dom';
import { ArrowDownIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    const storedEmail = localStorage.getItem('email');
    setNickname(storedNickname);
    setEmail(storedEmail);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 relative">
      {/* 사용자 정보 */}
      <section className="w-full overflow-[inherit] max-w-md bg-white rounded-2xl shadow-md px-6 py-6 mb-6 text-center relative">
        {nickname && email ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">💁🏻‍♀️&nbsp;반가워요, 
              <span className="relative inline-block group">
                <span className="text-blue-700 font-bold text-sm">&nbsp;{nickname}!</span>
                {/* 이메일 말풍선 */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10 whitespace-nowrap">
                  {email}
                </span>
              </span>
            </p>

            <button
              onClick={() => {
                localStorage.removeItem('nickname');
                localStorage.removeItem('email');
                setNickname(null);
                setEmail(null);
                navigate('/');
              }}
              className="px-3 py-1 rounded-full bg-white border border-blue-300 text-blue-600 text-xs hover:bg-blue-50 shadow-sm transition"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-white text-2xl">
              👋
            </div>
            <p className="text-blue-600 font-medium">안녕하세요. 방문자님!</p>
          </>
        )}
      </section>
      
      {/* Swimory 소개 */}
      <section className="w-full max-w-md bg-white rounded-2xl shadow-md px-6 py-6 text-center mb-20">
        <h2 className="text-3xl font-extrabold text-blue-700 tracking-tight">Swimory 🐬</h2>
        
        <p className="mt-2 text-base font-medium text-gray-700 opacity-0 translate-y-4 animate-fadeUp delay-100">
          수영의 기록과 정보, 한 곳에
        </p>
        <p className="mt-1 text-sm text-gray-500 opacity-0 translate-y-4 animate-fadeUp delay-200">
          서울 수영인을 위한 웹 기반 수영 관리 플랫폼
        </p>
        <p className="mt-1 text-xs text-gray-400 opacity-0 translate-y-4 animate-fadeUp delay-300">
          수영장 정보 · 수영 기록 · 영상 콘텐츠까지 한눈에
        </p>
      </section>

      <div className="flex flex-col gap-10 w-full mb-10">
        <Card
          buttonText="수영장 찾기"
          buttonLink="/info"
          description={
            <>
              <span className="text-secondary font-semibold">원하는 위치</span>를 기준으로<br />
              주변 <span className="text-secondary font-semibold">수영장</span>을 쉽게 찾아보세요!
            </>
          }
          iconPosition="top-right"
          iconImages={[
            { src: '/icon/icon_pool.png', alt: '수영장 풀 아이콘', className: 'w-24' },
          ]}
        />

        <Card
          buttonText="기록 시작하기"
          buttonLink="/record"
          description={
            <>
              수영 일지를 <span className="text-secondary font-semibold">기록</span>하고<br />
              나만의 <span className="text-secondary font-semibold">운동 히스토리</span>를 만들어보세요!
            </>
          }
          iconPosition="top-right1"
          iconImages={[
            { src: '/icon/icon_note.png', alt: '기록 아이콘', className: 'w-20' },
          ]}
        />

        <Card
          buttonText="영상 보기"
          buttonLink="/video"
          description={
            <>
              <span className="text-secondary font-semibold">수영 꿀팁</span>부터<br />
              <span className="text-secondary font-semibold">전문 영상</span>까지 한눈에!
            </>
          }
          iconPosition="top-right2"
          iconImages={[
            { src: '/icon/icon_video.png', alt: '영상 아이콘', className: 'w-20' },
          ]}
        />
      </div>

      {/* 하단 안내 아이콘 */}
      {/* <div className="absolute bottom-6 animate-bounce z-10">
        <ArrowDownIcon className="w-6 h-6 text-white opacity-70" />
      </div> */}
    </div>
  );
}
