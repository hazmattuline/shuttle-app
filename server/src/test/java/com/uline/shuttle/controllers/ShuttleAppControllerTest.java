package com.uline.shuttle.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uline.shuttle.app.controllers.ShuttleAppController;
import com.uline.shuttle.app.services.ShuttleAppService;
import com.uline.shuttle.app.services.StagedRequestService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.StagedRequest;
import rest.models.requests.TripRequest;

import java.net.URI;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
public class ShuttleAppControllerTest {
    @InjectMocks
    private ShuttleAppController shuttleAppController;

    @Mock
    private ShuttleAppService shuttleAppService;

    @Mock
    private StagedRequestService stagedRequestService;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;


    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(shuttleAppController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testChangeStatus() throws Exception {
        mockMvc.perform(patch("/api/shuttles/1/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new ShuttleRequest()))).andExpect(status().isOk());
    }

    @Test
    public void testEnRoute() throws Exception {
        mockMvc.perform(patch("/api/shuttles/1/coordinates")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new ShuttleRequest()))).andExpect(status().isOk());
    }

    @Test
    public void testGetDay() throws Exception {
        mockMvc.perform(get("/api/shuttle-days")
                .param("date", "10/10/20")
                .param("vehicle", "1")
        ).andExpect(status().isOk());
    }

    @Test
    public void testGetRoutes() throws Exception {
        mockMvc.perform(get("/api/shuttle-routes")
                       ).andExpect(status().isOk());
    }

    @Test
    public void testShuttlesStatus() throws Exception {
        mockMvc.perform(get("/api/shuttles")
                        .param("status", "A")
                       ).andExpect(status().isOk());
    }

    @Test
    public void testGetTrip() throws Exception {
        mockMvc.perform(get("/api/shuttle-trips")
                        .param("date", "10/10/20")
                        .param("vehicle", "1")
                       ).andExpect(status().isOk());
    }

    @Test
    public void testPostTrip() throws Exception {
        mockMvc.perform(post("/api/shuttle-trips")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new TripRequest()))).andExpect(status().isOk());
    }

    @Test
    public void testSubmitDay() throws Exception {
        mockMvc.perform(post("/api/shuttle-days")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new DayRequest()))).andExpect(status().isOk());
    }

    @Test
    public void testSubmitNote() throws Exception {
        mockMvc.perform(post("/api/shuttle-notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new NoteRequest()))).andExpect(status().isOk());
    }

    @Test
    public void testAddDayRecord() throws Exception {
        Mockito.when(stagedRequestService.addDayRecord(Mockito.any())).thenReturn(URI.create(""));
        mockMvc.perform(post("/api/staged-requests/add-shuttle-days")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new StagedRequest()))).andExpect(status().isCreated());
    }

    @Test
    public void testAddVehicle() throws Exception {
        Mockito.when(stagedRequestService.addVehicle(Mockito.any())).thenReturn(URI.create(""));
        mockMvc.perform(post("/api/staged-requests/add-shuttle-vehicle")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new StagedRequest()))).andExpect(status().isCreated());
    }

    @Test
    public void testUpdateDateRecord() throws Exception {
        Mockito.when(stagedRequestService.updateDayRecord(Mockito.anyInt(), Mockito.anyString(), Mockito.any())).thenReturn(URI.create(""));
        mockMvc.perform(post("/api/staged-requests/shuttle-days")
                .param("date", "10/10/20")
                .param("vehicle", "3")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new StagedRequest()))).andExpect(status().isCreated());
    }

    @Test
    public void testUpdateVehicle() throws Exception {
        Mockito.when(stagedRequestService.updateVehicle(Mockito.anyInt(), Mockito.any())).thenReturn(URI.create(""));
        mockMvc.perform(post("/api/staged-requests/shuttle-vehicle/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new StagedRequest()))).andExpect(status().isCreated());
    }
}
