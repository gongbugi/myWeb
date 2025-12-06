package com.gongBG.myWeb.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() {
        try {
            // resources 폴더에 있는 키 파일을 읽어옵니다.
            InputStream serviceAccount = getClass().getResourceAsStream("/serviceAccountKey.json");

            if (serviceAccount == null) {
                throw new IllegalStateException("serviceAccountKey.json 파일을 찾을 수 없습니다. resources 폴더를 확인하세요.");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // FirebaseApp이 이미 초기화되어 있지 않은 경우에만 초기화
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase Admin SDK가 성공적으로 초기화되었습니다.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Firebase 초기화 실패: " + e.getMessage());
        }
    }
}