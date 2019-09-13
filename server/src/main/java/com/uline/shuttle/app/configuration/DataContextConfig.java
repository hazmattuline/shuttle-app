package com.uline.shuttle.app.configuration;

import java.util.Map;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import rest.models.requests.StagedRequestConfig;

@RefreshScope
@Component
@PropertySource("classpath:data-contexts.properties")
@ConfigurationProperties("data.contexts")
public class DataContextConfig {

  public enum Activity {
    UPDATE_SHUTTLE_DAY,
    UPDATE_SHUTTLE_VEHICLE,
    ADD_SHUTTLE_DAY,
    ADD_SHUTTLE_VEHICLE
  }

  private Map<String, StagedRequestConfig> config;

  public Map<String, StagedRequestConfig> getConfig() {
    return config;
  }

  public StagedRequestConfig getConfigForActivity(Activity activity) {
    return config.get(activity.name());
  }

  public void setConfig(Map<String, StagedRequestConfig> config) {
    this.config = config;
  }
}
