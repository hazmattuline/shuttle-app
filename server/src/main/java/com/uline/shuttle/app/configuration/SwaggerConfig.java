package com.uline.shuttle.app.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import io.swagger.v3.oas.models.tags.Tag;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI openApi() {
    return new OpenAPI()
        .info(
            new Info()
                .title("Shuttle App")
                .description("Services related to Uline Shuttles")
                .license(new License().name("Copyright 2020 Uline, Inc.")))
        .components(
            new Components()
                .addSecuritySchemes(
                    "uline_auth",
                    new SecurityScheme().type(Type.HTTP).scheme("bearer").bearerFormat("JWT")))
        .security(Arrays.asList(new SecurityRequirement().addList("uline_auth")));
  }

  @Bean
  public OpenApiCustomiser openApiCustomizer() {
    return openApi -> {
      // Add a tag for any path that has a tag not in the tag list
      Map<String, Tag> tags =
          Optional.ofNullable(openApi.getTags())
              .orElse(Collections.emptyList())
              .stream()
              .collect(
                  Collectors.toMap(
                      Tag::getName, Function.identity(), (o1, o2) -> o1, TreeMap::new));
      Optional.ofNullable(openApi.getPaths())
          .orElse(new Paths())
          .values()
          .stream()
          .flatMap(
              path ->
                  path.readOperations()
                      .stream()
                      .flatMap(
                          operation ->
                              Optional.ofNullable(operation.getTags())
                                  .orElse(Collections.emptyList())
                                  .stream()))
          .forEach(tagName -> tags.putIfAbsent(tagName, new Tag().name(tagName)));

      // Sort the tags alphabetically
      openApi.setTags(
          tags.values()
              .stream()
              .sorted(Comparator.comparing(tag -> StringUtils.stripAccents(tag.getName())))
              .collect(Collectors.toList()));

      // Sort the schemas
      openApi
          .getComponents()
          .setSchemas(
              new TreeMap<>(
                  Optional.ofNullable(openApi.getComponents().getSchemas())
                      .orElse(Collections.emptyMap())));

      // Sort the paths
      Paths paths = openApi.getPaths();
      if (paths != null) {
        Paths newPaths = new Paths();
        new TreeMap<>(Optional.ofNullable(paths.getExtensions()).orElse(Collections.emptyMap()))
            .entrySet()
            .stream()
            .forEach(entry -> newPaths.addExtension(entry.getKey(), entry.getValue()));
        new TreeMap<>(paths)
            .entrySet()
            .stream()
            .forEach(entry -> newPaths.addPathItem(entry.getKey(), entry.getValue()));
        openApi.setPaths(newPaths);
      }
    };
  }

  /** Redirect anything looking for the old /v2/api-docs to the new /v3/api-docs */
  @Controller
  public static class RedirectV2Api {
    @GetMapping("/v2/api-docs")
    public ModelAndView redirectApi() {
      return new ModelAndView("redirect:/v3/api-docs");
    }
  }
}
