// 수영장 데이터 타입 정의
export interface SwimmingPool {
  id: string;
  name: string;
  address: string;
  phone?: string;
  operatingHours?: string;
  facilities?: string[];
  latitude?: number;
  longitude?: number;
  isPublic: boolean;
  fee?: {
    adult: number;
    child: number;
    senior: number;
  };
}

// 서울시 공공 수영장 API 응답 타입
export interface SeoulPoolApiResponse {
  result: {
    code: string;
    message: string;
  };
  data: {
    totalCount: number;
    pools: SwimmingPool[];
  };
}

// 수영장 검색 필터 타입
export interface PoolSearchFilter {
  location?: string;
  distance?: number;
  facilities?: string[];
  isPublicOnly?: boolean;
} 