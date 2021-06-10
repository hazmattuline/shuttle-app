package rest.models.requests;

import io.swagger.v3.oas.annotations.media.Schema;

public class StagedRequest {

  @Schema(description = "Id of the data context this staged request belongs to")
  private String dataContextId;

  @Schema(description = "The previous state of the data being changed in the staged json")
  private String originalJson;

  @Schema(description = "The service endpoint to apply the staged json with")
  private String returnServiceEndpoint;

  @Schema(description = "The http method to use when making the http call to the service endpoint")
  private String returnServiceMethod;

  @Schema(description = "The json to send to the service endpoint")
  private String stagedJson;

  @Schema(description = "The comments submitted by the creator of this staged request")
  private String stagedRequestText;

  public String getDataContextId() {
    return dataContextId;
  }

  public String getOriginalJson() {
    return originalJson;
  }

  public String getReturnServiceEndpoint() {
    return returnServiceEndpoint;
  }

  public String getReturnServiceMethod() {
    return returnServiceMethod;
  }

  public String getStagedJson() {
    return stagedJson;
  }

  public String getStagedRequestText() {
    return stagedRequestText;
  }

  public void setDataContextId(String dataContextId) {
    this.dataContextId = dataContextId;
  }

  public void setOriginalJson(String originalJson) {
    this.originalJson = originalJson;
  }

  public void setReturnServiceEndpoint(String returnServiceEndpoint) {
    this.returnServiceEndpoint = returnServiceEndpoint;
  }

  public void setReturnServiceMethod(String returnServiceMethod) {
    this.returnServiceMethod = returnServiceMethod;
  }

  public void setStagedJson(String stagedJson) {
    this.stagedJson = stagedJson;
  }

  public void setStagedRequestText(String stagedRequestText) {
    this.stagedRequestText = stagedRequestText;
  }
}
