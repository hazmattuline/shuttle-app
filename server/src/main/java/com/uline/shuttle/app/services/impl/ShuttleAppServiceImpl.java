package com.uline.shuttle.app.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

	private ShuttleAppClient shuttleAppClient;

	@Autowired
	public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
		this.shuttleAppClient = shuttleAppClient;
	}

	@Override
	public ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id) {
		return shuttleAppClient.changeStatus(statusRequest, id);
	}

	@Override
	public CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest) {
		return shuttleAppClient.enRoute(vehicleID, coordinateRequest);
	}

	@Override
	public ShuttleDayDetailsResponse getShuttleDayDetails(
			ShuttleDayDetailsRequest shuttleDayRequest) {
		return shuttleAppClient.getShuttleDayDetails(shuttleDayRequest);
	}

	@Override
	public List<ShuttleResponse> getShuttlesStatus(String status) {
		return shuttleAppClient.getShuttlesStatus(status);
	}

	@Override
	public ShuttleDayDetailsResponse getTrip(String date, Integer vehicleId) {
		return shuttleAppClient.getTrip(date, vehicleId);
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
