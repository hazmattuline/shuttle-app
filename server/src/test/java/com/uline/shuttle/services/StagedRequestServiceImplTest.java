package com.uline.shuttle.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uline.common.exception.BadRequestException;
import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.configuration.DataContextConfig;
import com.uline.shuttle.app.services.impl.StagedRequestServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import rest.models.requests.StagedRequest;
import rest.models.requests.StagedRequestConfig;

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RunWith(MockitoJUnitRunner.class)
public class StagedRequestServiceImplTest {

    @InjectMocks
    StagedRequestServiceImpl stagedRequestService;

    @Mock
    UlineRestTemplate ulineRestTemplate;

    @Mock
    ShuttleAppClient shuttleAppClient;

    @Mock
    DataContextConfig dataContextConfig;

    StagedRequest stagedRequest = new StagedRequest();

    @Before
    public void setup() {
        stagedRequest.setDataContextId("1");
        stagedRequest.setOriginalJson("{}");
        stagedRequest.setReturnServiceEndpoint("/http");
        stagedRequest.setReturnServiceMethod("POST");
        stagedRequest.setStagedJson("{}");
        stagedRequest.setStagedRequestText("NEED");
    }
    @Test
    public void testCreateStagedRequest() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenReturn(new ResponseEntity(map,HttpStatus.OK));
        URI uri =  stagedRequestService.updateDayRecord(1, "11/11/20", stagedRequest);
        Assert.assertNotNull(uri);
    }

    @Test
    public void testUpdateVehicle() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenReturn(new ResponseEntity(map,HttpStatus.OK));
        URI uri =  stagedRequestService.updateVehicle(1, stagedRequest);
        Assert.assertNotNull(uri);
    }

    @Test
    public void testAddVehicle() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenReturn(new ResponseEntity(map,HttpStatus.OK));
        URI uri =  stagedRequestService.addVehicle(stagedRequest);
        Assert.assertNotNull(uri);
    }

    @Test
    public void testAddDayRecord() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenReturn(new ResponseEntity(map,HttpStatus.OK));
        URI uri =  stagedRequestService.addDayRecord(stagedRequest);
        Assert.assertNotNull(uri);
    }


    @Test(expected = BadRequestException.class)
    public void testAddDayRecord_FAIL() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenThrow(new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
        URI uri =  stagedRequestService.addDayRecord(stagedRequest);
    }


    @Test(expected = BadRequestException.class)
    public void testAddDayRecord_FAIL_ON_DIFFERENT_EXCEPTION() throws JsonProcessingException {
        StagedRequestConfig requestConfig = new StagedRequestConfig();
        requestConfig.setServiceEndpoint("http://google.com");
        HttpHeaders map = new HttpHeaders();
        map.put("header", Arrays.asList("1", "2"));
        map.put("location", Arrays.asList("http://google.com"));
        HttpEntity<Void> httpEntity = new HttpEntity<Void>(map);

        Mockito.when(dataContextConfig.getConfigForActivity(Mockito.any())).thenReturn(requestConfig);
        Mockito.when(
                ulineRestTemplate.exchange(
                        ArgumentMatchers.anyString(),
                        ArgumentMatchers.eq(HttpMethod.POST),
                        ArgumentMatchers.any(HttpEntity.class),
                        ArgumentMatchers.eq(Void.class)
                                          )
                    ).thenThrow(new BadRequestException(""));
        URI uri =  stagedRequestService.addDayRecord(stagedRequest);
    }
}
