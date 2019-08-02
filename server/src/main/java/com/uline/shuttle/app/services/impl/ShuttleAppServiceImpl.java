package com.uline.shuttle.app.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;

import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.TripRequest;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.RouteResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.TripResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

	private ShuttleAppClient shuttleAppClient;

	@Autowired
	public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
		this.shuttleAppClient = shuttleAppClient;
	}

	@Override
	public ShuttleResponse changeStatus(ShuttleRequest shuttleRequest, Integer id) {
		return shuttleAppClient.changeStatus(shuttleRequest, id);
	}

	@Override
	public ShuttleResponse enRoute(Integer id, ShuttleRequest shuttleRequest) {
		return shuttleAppClient.enRoute(id, shuttleRequest);
	}

	@Override
	public DayResponse getDay(String date, Integer vehicleId) {
		return shuttleAppClient.getDay(date, vehicleId);
	}

	@Override
	public List<RouteResponse> getRoutes() {
		return shuttleAppClient.getRoutes();
	}

	@Override
	public List<ShuttleResponse> getShuttlesStatus(String status) {
		return shuttleAppClient.getShuttlesStatus(status);
	}

	@Override
	public TripResponse getTrip(String date, Integer vehicleId) {
		return shuttleAppClient.getTrip(date, vehicleId);
	}

	@Override
	public TripResponse postTrip(TripRequest shuttleDayRequest) {
		return shuttleAppClient.postTrip(shuttleDayRequest);
	}

	@Override
	public DayResponse submitDay(DayRequest dayRequest) {
		return shuttleAppClient.submitDay(dayRequest);
	}

	@Override
	public NoteResponse submitNote(NoteRequest noteRequest) {
		return shuttleAppClient.submitNote(noteRequest);
	}
}
