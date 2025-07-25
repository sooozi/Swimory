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
      {nickname && email ? (
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0 text-white text-center">
          💁🏻‍♀️ 안녕하세요. <span className="font-semibold">{nickname}</span>님!<br />
          <span className="text-sm opacity-80">{email}</span>
          <br />
          {/* ✅ 로그아웃 버튼 */}
          <button
            onClick={() => {
              localStorage.removeItem('nickname');
              localStorage.removeItem('email');
              setNickname(null);
              setEmail(null);
              navigate('/'); // 홈으로 이동 (필요 시)
            }}
            className="mt-2 px-4 py-1 bg-white text-blue-600 text-sm font-medium rounded hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="transition-all duration-700 ease-out opacity-100 translate-y-0 text-white">
          💁🏻‍♀️ 안녕하세요. 방문자님!
        </div>
      )}
      
      {/* 상단 서비스 소개 */}
      <div className="my-12 text-center px-6 z-10">
        <p className="text-white text-lg font-medium">수영의 기록과 정보, 한 곳에</p>
        <p className="mt-2 text-3xl text-white font-bold tracking-tight">Swimory 🐬</p>
        <p className="mt-2 text-sm text-white opacity-90">서울 수영인을 위한 웹 기반 수영 관리 플랫폼</p>
        <p className="mt-1 text-xs text-white opacity-80">수영장 정보 · 수영 기록 · 영상 콘텐츠까지 한번에</p>
      </div>

      <div className="flex flex-col gap-10">
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
