import React, { useEffect, useState } from 'react';

import useGeolocation from '../hooks/useGeolocation';
import { SwimmingPool } from '../types/pool';

interface SwimmingPoolWithDistance extends SwimmingPool {
  distance: number;
}

interface NearbyPoolsProps {
  onPoolSelect?: (pool: SwimmingPool) => void;
}

const NearbyPools: React.FC<NearbyPoolsProps> = ({ onPoolSelect }) => {
  const { latitude, longitude, error, loading, getCurrentPosition } = useGeolocation();
  const [nearbyPools, setNearbyPools] = useState<SwimmingPoolWithDistance[]>([]);
  const [searchRadius, setSearchRadius] = useState(2000); // 2km

  // 두 지점 간 거리 계산 (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // 미터로 변환
  };

  // 샘플 수영장 데이터 (실제로는 API에서 가져옴)
  const samplePools: SwimmingPool[] = [
    {
      id: '1',
      name: '강남 수영장',
      address: '서울특별시 강남구 테헤란로 123',
      latitude: 37.5010,
      longitude: 127.0396,
      phone: '02-1234-5678',
      operatingHours: '06:00-22:00',
      facilities: ['수영장', '사우나', '헬스장'],
      isPublic: true,
      fee: { adult: 8000, child: 5000, senior: 6000 }
    },
    {
      id: '2',
      name: '홍대 수영장',
      address: '서울특별시 마포구 홍익로 456',
      latitude: 37.5563,
      longitude: 126.9236,
      phone: '02-2345-6789',
      operatingHours: '06:00-23:00',
      facilities: ['수영장', '샤워실', '락커룸'],
      isPublic: false,
      fee: { adult: 12000, child: 8000, senior: 10000 }
    },
    {
      id: '3',
      name: '잠실 수영장',
      address: '서울특별시 송파구 올림픽로 789',
      latitude: 37.5133,
      longitude: 127.1028,
      phone: '02-3456-7890',
      operatingHours: '05:30-22:30',
      facilities: ['수영장', '사우나', '헬스장', '카페'],
      isPublic: true,
      fee: { adult: 10000, child: 6000, senior: 8000 }
    }
  ];

  // 가까운 수영장 검색
  const searchNearbyPools = () => {
    if (!latitude || !longitude) return;

    const poolsWithDistance = samplePools.map(pool => {
      if (pool.latitude && pool.longitude) {
        const distance = calculateDistance(latitude, longitude, pool.latitude, pool.longitude);
        return { ...pool, distance };
      }
      return { ...pool, distance: Infinity };
    });

    const filtered = poolsWithDistance
      .filter(pool => pool.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance);

    setNearbyPools(filtered);
  };

  useEffect(() => {
    if (latitude && longitude) {
      searchNearbyPools();
    }
  }, [latitude, longitude, searchRadius]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">가까운 수영장 찾기</h2>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={getCurrentPosition}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '위치 확인 중...' : '내 위치 확인'}
          </button>
          
          <select
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1000}>1km 이내</option>
            <option value={2000}>2km 이내</option>
            <option value={5000}>5km 이내</option>
            <option value={10000}>10km 이내</option>
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {error}
          </div>
        )}

        {latitude && longitude && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
            현재 위치: 위도 {latitude.toFixed(6)}, 경도 {longitude.toFixed(6)}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {nearbyPools.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {latitude && longitude ? 
              `${searchRadius/1000}km 이내에 수영장이 없습니다.` :
              '위치를 확인해주세요.'
            }
          </div>
        ) : (
          nearbyPools.map((pool) => (
            <button
              key={pool.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer text-left w-full"
              onClick={() => onPoolSelect?.(pool)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{pool.name}</h3>
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-blue-600 font-medium">
                    {formatDistance(pool.distance)}
                  </span>
                  {pool.isPublic && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      공공
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-2">{pool.address}</p>
              
              <div className="flex gap-4 text-sm text-gray-500">
                <span>📞 {pool.phone}</span>
                <span>🕐 {pool.operatingHours}</span>
              </div>
              
              <div className="flex gap-2 mt-2">
                {pool.facilities?.map((facility, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {facility}
                  </span>
                ))}
              </div>
              
              {pool.fee && (
                <div className="mt-2 text-sm text-gray-600">
                  요금: 성인 {pool.fee.adult.toLocaleString()}원, 
                  어린이 {pool.fee.child.toLocaleString()}원
                                 </div>
               )}
             </button>
           ))
         )}
       </div>
     </div>
   );
 };

export default NearbyPools; 