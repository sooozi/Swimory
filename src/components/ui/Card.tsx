import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface CardProps {
  buttonText: string;
  buttonLink: string;
  description: ReactNode;
  iconImages?: {
    src: string;
    alt: string;
    className?: string;
  }[];
  iconPosition?: 'top-right' | 'top-right1' | 'top-right2';
}

export default function Card({
  buttonText,
  buttonLink,
  description,
  iconImages = [],
  iconPosition = 'top-right',
}: CardProps) {
  const navigate = useNavigate();

  // 위치에 따라 Tailwind 클래스 정의
  const iconPositionClass = {
    'top-right': 'top-0 right-0',
    'top-right1': '-top-3 -right-3',
    'top-right2': 'top-3 right-3',
  }[iconPosition];

  return (
    <div className="relative w-full max-w-md py-8 pl-6 pr-14 bg-white rounded-2xl shadow-lg flex items-start gap-4">
      {/* 텍스트 및 버튼 영역 */}
      <div className="z-10">
        <button
          onClick={() => navigate(buttonLink)}
          className="absolute -top-5 mb-2 px-4 py-1 btn-primary text-white text-sm font-semibold py-3 rounded-full shadow-[0_2px_12px_rgba(90,129,250,0.4)] transition"
        >
          {buttonText}
        </button>
        <p className="mt-2 text-sm font-medium leading-snug">{description}</p>
      </div>

      {/* 아이콘 이미지들 */}
      {iconImages.length > 0 && (
        <div className={`absolute ${iconPositionClass} flex flex-col gap-1`}>
          {iconImages.map((icon, idx) => (
            <img
              key={idx}
              src={icon.src}
              alt={icon.alt}
              className={icon.className || 'w-8'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
