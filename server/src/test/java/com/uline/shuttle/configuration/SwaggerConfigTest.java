package com.uline.shuttle.configuration;

import com.uline.shuttle.app.configuration.SwaggerConfig;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Paths;
import java.util.function.Consumer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springdoc.core.customizers.OpenApiCustomiser;

class SwaggerConfigTest {

  private static <T> T consume(T t, Consumer<T> consumer) {
    consumer.accept(t);
    return t;
  }

  @Test
  void testOpenApi() {
    OpenAPI result = new SwaggerConfig().openApi();
    Assertions.assertNotNull(result);
  }

  @Test
  void testOpenApiCustomizer() {
    OpenApiCustomiser result = new SwaggerConfig().openApiCustomizer();
    result.customise(
        consume(
            new SwaggerConfig().openApi(),
            api ->
                api.setPaths(
                    consume(
                        new Paths(),
                        paths ->
                            paths.addPathItem(
                                "/foo",
                                consume(
                                    new PathItem(),
                                    pathItem -> pathItem.setDescription("foo")))))));
    Assertions.assertNotNull(result);
  }
}
