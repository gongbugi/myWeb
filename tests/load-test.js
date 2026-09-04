import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 50 },  // 10초 동안 가상 사용자(VU) 50명까지 점진적 증가
    { duration: '20s', target: 50 },  // 20초 동안 50명 유지 (부하 유지)
    { duration: '10s', target: 0 },   // 10초 동안 0명으로 감소 (테스트 종료)
  ],
  thresholds: {
    // 성공적인 응답(200)이 99% 이상이어야 함
    http_req_failed: ['rate<0.01'],
    // 95%의 요청이 300ms 이내에 응답해야 함
    http_req_duration: ['p(95)<300'],
  },
};

const BASE_URL = 'https://d1xs14d7r4iei7.cloudfront.net';
// const BASE_URL = 'http://43.200.176.250';

export default function () {
  // 백엔드 API (게시글 목록 조회) 호출
  const res = http.get(`${BASE_URL}/api/study`);

  // 응답 상태가 200인지 확인
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  // 사용자가 다음 행동을 하기 전 생각하는 시간(Think time) 모사
  sleep(1);
}
