import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from 'lucide-react';
import { fetchPools } from '../api/pool';

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
  distance?: number;
};

export default function InfoPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          if (ignore) return;

          const { latitude, longitude } = pos.coords;

          mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 5,
          });

          // 빨간 마커 이미지 설정 (원하는 아이콘으로 바꿔도 됨)
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png'; // 빨간색 마커 이미지
          const imageSize = new window.kakao.maps.Size(40, 40); // 마커 크기
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

          // 현재 위치 마커
          new window.kakao.maps.Marker({
            map: mapInstance.current,
            position: new window.kakao.maps.LatLng(latitude, longitude),
            image: markerImage,
            title: '현재 위치',
          });

          try {
            const poolList = await fetchPools();
            console.log('✅ 수영장 원본 데이터:', poolList);

            const validPools = poolList.filter(pool => {
              const isValid = !isNaN(pool.lat) && !isNaN(pool.lng);
              if (!isValid) console.warn('❌ 잘못된 좌표:', pool);
              return isValid;
            });

            const sortedPools = validPools
              .map((pool) => {
                const distance = getDistance(latitude, longitude, pool.lat, pool.lng);
                if (isNaN(distance)) {
                  console.warn('❌ distance NaN 발생:', { ...pool, latitude, longitude });
                }
                return { ...pool, distance };
              })
              .sort((a, b) => a.distance! - b.distance!);

            setPools(sortedPools);
            console.log('✅ 유효한 수영장 수:', sortedPools.length);

            // 중심을 가장 가까운 수영장으로 이동
            if (sortedPools.length > 0) {
              mapInstance.current.setCenter(
                new window.kakao.maps.LatLng(sortedPools[0].lat, sortedPools[0].lng)
              );
            }

            // 마커 표시
            sortedPools.forEach((pool) => {
              const latlng = new window.kakao.maps.LatLng(pool.lat, pool.lng);

              const marker = new window.kakao.maps.Marker({
                map: mapInstance.current,
                position: latlng,
                title: pool.name,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:6px 12px;font-size:13px;">${pool.name}</div>`,
              });

              window.kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(mapInstance.current, marker);
              });

              console.log('📍 마커 생성됨:', pool.name, pool.lat, pool.lng);
            });
          } catch (err) {
            console.error('❌ 수영장 정보 불러오기 오류:', err);
            alert('수영장 정보를 불러오는 데 실패했습니다.');
          } finally {
            setLoading(false);
          }
        });
      });
    };

    return () => {
      ignore = true;
      document.head.removeChild(script);
    };
  }, []);

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    if ([lat1, lng1, lat2, lng2].some(v => isNaN(v))) {
      return Infinity;
    }

    const R = 6371000;
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
      <div ref={mapRef} className="absolute inset-0 z-[1]" />
      <div className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-800">
        {loading ? '수영장 정보를 불러오는 중...' : `가까운 수영장 ${pools.length}곳`}
      </div>
      <div className="absolute bottom-0 left-0 w-full z-20 bg-white rounded-t-2xl p-4 shadow-xl max-h-[45%] overflow-y-auto">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">근처 수영장</h2>
        {pools.map((pool, index) => (
          <div key={index} className="mb-4 p-3 border border-gray-100 rounded-xl shadow-sm">
            <p className="font-bold text-gray-800">{pool.name}</p>
            <p className="text-sm text-gray-500">{pool.address}</p>
            {pool.distance !== undefined && (
              <p className="text-xs text-gray-400">
                {(pool.distance / 1000).toFixed(2)} km 거리
              </p>
            )}
          </div>
        ))}
        {!loading && pools.length === 0 && (
          <p className="text-gray-500 text-sm">근처 수영장이 없어요 🥲</p>
        )}
      </div>
      <div className="absolute bottom-6 animate-bounce z-10 left-1/2 -translate-x-1/2">
        <ArrowDownIcon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
  );
}
