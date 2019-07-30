package com.uline.shuttle.app.configuration;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.security.jwt.JwtTokenInterceptor;
import com.uline.security.service.UserResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.client.ClientHttpRequestInterceptor;

@Configuration
@PropertySource(value = {"classpath:application.properties"})
@ComponentScan({"com.uline.shuttle.app", "com.uline.security"})
public class AppConfig {
  @Bean
  public ClientHttpRequestInterceptor tokenInterceptor(
      final UlineRestTemplate restTemplate, final UserResolver userResolver) {
    JwtTokenInterceptor interceptor = new JwtTokenInterceptor(userResolver);
    restTemplate.getInterceptors().add(interceptor);
    return interceptor;
  }
}
