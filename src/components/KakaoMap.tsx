import React, { useEffect, useRef } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  level?: number;
  center?: {
    lat: number;
    lng: number;
  };
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  width = '100%',
  height = '400px',
  level = 3,
  center = { lat: 37.5665, lng: 126.9780 }, // 서울 시청 기본 위치
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // 카카오 지도 API가 로드되었는지 확인
    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
      const { kakao } = window;
      
      // 지도 옵션
      const options = {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: level,
      };

      // 지도 생성
      const map = new kakao.maps.Map(mapRef.current, options);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(center.lat, center.lng),
      });

      // 마커를 지도에 표시
      marker.setMap(map);

      // 정보창 생성
      const infoWindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">수영장 위치</div>',
      });

      // 마커에 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });
    } else {
      console.error('카카오 지도 API가 로드되지 않았습니다.');
    }
  }, [center.lat, center.lng, level]);

  return (
    <div className="kakao-map-container">
      <div
        ref={mapRef}
        style={{ width, height }}
        className="rounded-lg border shadow-md"
      />
    </div>
  );
};

export default KakaoMap; 