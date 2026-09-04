import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 400 }, // 15초 동안 200명까지 빡세게 점진적 증가
    { duration: '30s', target: 400 }, // 30초 동안 200명 유지 (본격적인 DB 부하)
    { duration: '15s', target: 0 },   // 15초 동안 0명으로 쿨다운
  ],
  thresholds: {
    // 트래픽이 많아도 95%의 요청이 500ms 이내에 응답하는지 확인
    http_req_duration: ['p(95)<500'],
  },
};

const BASE_URL = 'https://d1xs14d7r4iei7.cloudfront.net';
// const BASE_URL = 'http://43.200.176.250';

export default function () {
  // 캐시를 완벽하게 무시하기 위해 무작위 파라미터 추가
  // 이렇게 하면 매 요청이 새로운 요청으로 인식되어 무조건 백엔드 DB까지 도달합니다.
  const randomParam = Math.random().toString(36).substring(7);
  const res = http.get(`${BASE_URL}/api/study?nocache=${randomParam}`);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  // VUs가 많으므로 생각하는 시간(Think time)을 살짝 줄여서 서버를 더 괴롭힙니다.
  sleep(0.5);
}
