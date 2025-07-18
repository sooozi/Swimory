import axios from 'axios';

import { SeoulPoolApiResponse } from '../types/pool';

// 서울시 공공 수영장 데이터 API
export const getPublicPools = async (): Promise<SeoulPoolApiResponse> => {
  const API_KEY = process.env.REACT_APP_SEOUL_API_KEY;
  
  if (!API_KEY) {
    throw new Error('서울시 API 키가 설정되지 않았습니다. .env 파일에 REACT_APP_SEOUL_API_KEY를 추가하세요.');
  }

  try {
    const response = await axios.get(
      `https://api.seoul.go.kr/openapi-url?KEY=${API_KEY}&format=json`
    );
    return response.data;
  } catch (error) {
    console.error('공공 수영장 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
}; 