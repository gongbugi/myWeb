package com.gongBG.myWeb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MyWeb {

	public static void main(String[] args) {
		SpringApplication.run(MyWeb.class, args);
	}

}
