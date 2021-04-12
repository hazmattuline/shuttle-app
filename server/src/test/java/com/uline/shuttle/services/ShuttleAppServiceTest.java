package com.uline.shuttle.services;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.impl.ShuttleAppServiceImpl;
import java.util.ArrayList;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.TripRequest;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.TripResponse;

@RunWith(MockitoJUnitRunner.class)
public class ShuttleAppServiceTest {

  @InjectMocks ShuttleAppServiceImpl shuttleAppService;

  @Mock ShuttleAppClient shuttleAppClient;

  @Test
  public void testChangeStatus() {
    Mockito.when(shuttleAppClient.changeStatus(Mockito.any(ShuttleRequest.class), Mockito.anyInt()))
        .thenReturn(new ShuttleResponse());
    Assert.assertNotNull(shuttleAppService.changeStatus(new ShuttleRequest(), 1));
  }

  @Test
  public void testEnRoute() {
    Mockito.when(shuttleAppClient.enRoute(Mockito.anyInt(), Mockito.any(ShuttleRequest.class)))
        .thenReturn(new ShuttleResponse());
    Assert.assertNotNull(shuttleAppService.enRoute(1, new ShuttleRequest()));
  }

  @Test
  public void testGetDay() {
    Mockito.when(shuttleAppClient.getDay(Mockito.anyString(), Mockito.anyInt()))
        .thenReturn(new ArrayList<>());
    Assert.assertNotNull(shuttleAppService.getDay("", 1));
  }

  @Test
  public void testGetRoutes() {
    Mockito.when(shuttleAppClient.getRoutes()).thenReturn(new ArrayList<>());
    Assert.assertNotNull(shuttleAppService.getRoutes());
  }

  @Test
  public void testGetShuttlesStatus() {
    Mockito.when(shuttleAppClient.getShuttlesStatus(Mockito.anyString()))
        .thenReturn(new ArrayList<>());
    Assert.assertNotNull(shuttleAppService.getShuttlesStatus(""));
  }

  @Test
  public void testGetTrip() {
    Mockito.when(shuttleAppClient.getTrip(Mockito.anyString(), Mockito.anyInt()))
        .thenReturn(new TripResponse());
    Assert.assertNotNull(shuttleAppService.getTrip("", 1));
  }

  @Test
  public void testPostTrip() {
    Mockito.when(shuttleAppClient.postTrip(Mockito.any(TripRequest.class)))
        .thenReturn(new TripResponse());
    Assert.assertNotNull(shuttleAppService.postTrip(new TripRequest()));
  }

  @Test
  public void testSubmitDay() {
    Mockito.when(shuttleAppClient.submitDay(Mockito.any(DayRequest.class)))
        .thenReturn(new DayResponse());
    Assert.assertNotNull(shuttleAppService.submitDay(new DayRequest()));
  }

  @Test
  public void testSubmitNote() {
    Mockito.when(shuttleAppClient.submitNote(Mockito.any(NoteRequest.class)))
        .thenReturn(new NoteResponse());
    Assert.assertNotNull(shuttleAppService.submitNote(new NoteRequest()));
  }
}
