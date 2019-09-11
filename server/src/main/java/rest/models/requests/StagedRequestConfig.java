package rest.models.requests;

public class StagedRequestConfig {

  private String dataContextId;

  private String serviceEndpoint;

  private String serviceMethod;

  public String getDataContextId() {
    return dataContextId;
  }

  public String getServiceEndpoint() {
    return serviceEndpoint;
  }

  public String getServiceMethod() {
    return serviceMethod;
  }

  public void setDataContextId(String dataContextId) {
    this.dataContextId = dataContextId;
  }

  public void setServiceEndpoint(String serviceEndpoint) {
    this.serviceEndpoint = serviceEndpoint;
  }

  public void setServiceMethod(String serviceMethod) {
    this.serviceMethod = serviceMethod;
  }
}
