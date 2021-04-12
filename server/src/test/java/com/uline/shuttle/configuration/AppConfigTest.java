package com.uline.shuttle.configuration;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.security.service.UserResolver;
import com.uline.shuttle.app.configuration.AppConfig;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mock;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

public class AppConfigTest {

  @Mock UlineRestTemplate restTemplate;
  @Mock UserResolver userResolver;

  @Test
  public void testTokenInterceptor() {
    AppConfig appConfig = new AppConfig();
    Assert.assertNotNull(
        appConfig.tokenInterceptor(
            new UlineRestTemplate(new HttpComponentsClientHttpRequestFactory()), userResolver));
  }
}
