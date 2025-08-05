import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

type Pool = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  reserveUrl?: string;
};

export default function InfoPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 서울시 수영장 데이터 예시 (실제 API 연결 전까지 mock 데이터 사용)
  const mockData: Pool[] = [
    {
      name: '서울 강서 수영장',
      address: '서울시 강서구 가양동 1-1',
      lat: 37.561, lng: 126.839,
      reserveUrl: 'https://yeyak.seoul.go.kr'
    },
    {
      name: '서울 송파 수영장',
      address: '서울시 송파구 문정동 2-2',
      lat: 37.502, lng: 127.116,
      reserveUrl: 'https://yeyak.seoul.go.kr'
    }
  ];

  useEffect(() => {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 5,
          };

          const map = new window.kakao.maps.Map(container, options);

          // 사용자 위치 마커
          new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(latitude, longitude),
          });

          const filteredPools = mockData.filter(pool => {
            const dist = getDistance(latitude, longitude, pool.lat, pool.lng);
            return dist <= 2000;
          });

          setPools(filteredPools);
          setLoading(false);

          filteredPools.forEach(pool => {
            const marker = new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(pool.lat, pool.lng),
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
                <div style="padding:8px;font-size:14px;">
                  <strong>${pool.name}</strong><br/>
                  ${pool.address}<br/>
                  <a href="${pool.reserveUrl}" target="_blank" style="color:blue;">예약하기</a>
                </div>
              `
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
              infowindow.open(map, marker);
            });
          });
        },
        (err) => {
          alert('위치 접근을 허용해야 지도를 볼 수 있어요.');
          setLoading(false);
        }
      );
    });
  };

  return () => {
    document.head.removeChild(script);
  };
}, []);

  // 거리 계산 함수 (단위: meter)
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000; // 지구 반지름 (m)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 지도 영역 */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* 상단 위치 안내 */}
      <div className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-800">
        {loading ? '수영장 정보를 불러오는 중...' : `반경 2km 내 수영장 ${pools.length}곳`}
      </div>

      {/* 하단 수영장 리스트 패널 */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-white rounded-t-2xl p-4 shadow-xl max-h-[45%] overflow-y-auto">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">근처 수영장</h2>
        {pools.map((pool, index) => (
          <div key={index} className="mb-4 p-3 border border-gray-100 rounded-xl shadow-sm">
            <p className="font-bold text-gray-800">{pool.name}</p>
            <p className="text-sm text-gray-500">{pool.address}</p>
            {pool.reserveUrl && (
              <a
                href={pool.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-500 text-sm underline"
              >
                예약하러 가기 →
              </a>
            )}
          </div>
        ))}
        {!loading && pools.length === 0 && (
          <p className="text-gray-500 text-sm">반경 2km 내 수영장이 없어요 🥲</p>
        )}
      </div>

      {/* 하단 아이콘 */}
      <div className="absolute bottom-6 animate-bounce z-10 left-1/2 -translate-x-1/2">
        <ArrowDownIcon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
  );
}
