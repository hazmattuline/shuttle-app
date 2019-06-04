package com.uline.configuration.management.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    WebMvcConfigurer.super.addResourceHandlers(registry);
    if (!registry.hasMappingForPattern("/**")) {
      registry
          .addResourceHandler("/ui")
          .addResourceLocations("classpath:/META-INF/resources/webjars/ui/index.html")
          .setCachePeriod(0);
      registry
          .addResourceHandler("/ui/**")
          .addResourceLocations("classpath:/META-INF/resources/webjars/ui/")
          .setCachePeriod(0);
    }
  }

  @Override
  public void addViewControllers(final ViewControllerRegistry registry) {
    registry.addViewController("/ui/").setViewName("forward:/ui/index.html");
  }
}
