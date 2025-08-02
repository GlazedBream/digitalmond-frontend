
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://bcfd72f0-3451-4907-9b7d-15567219600f.mock.pstmn.io',
  // timeout: 1000, // 예시: 1초 타임아웃 설정
  // headers: { 'Content-Type': 'application/json' }, // 예시: 공통 헤더 설정
});

// 개발 환경에서 MOCK_AUTH_TOKEN이 설정되어 있으면 Authorization 헤더에 추가
if (process.env.MOCK_AUTH_TOKEN) {
  client.defaults.headers.common['Authorization'] = `Bearer ${process.env.MOCK_AUTH_TOKEN}`;
}

export default client;
