package com.gongBG.myWeb;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jwt.JwtDecoder;

/**
 * 테스트용 JwtDecoder.
 *
 * SecurityConfig의 oauth2ResourceServer(jwt)는 JwtDecoder 빈을 필요로 하는데,
 * Spring Boot는 issuer-uri(또는 jwk-set-uri)가 설정돼 있을 때만 이 빈을 자동 생성한다.
 * 테스트 프로필에는 Cognito 주소가 없으므로 컨텍스트 로딩이 실패한다.
 *
 * 실제 토큰 검증은 테스트 대상이 아니므로, 컨텍스트가 뜨도록 빈만 채운다.
 * (issuer-uri를 테스트에 넣으면 기동 시 Cognito로 네트워크 호출이 발생해 CI가 외부에 의존하게 된다)
 */
@TestConfiguration
public class TestSecurityConfig {

    @Bean
    public JwtDecoder jwtDecoder() {
        return token -> {
            throw new UnsupportedOperationException("테스트에서는 토큰을 검증하지 않는다");
        };
    }
}
