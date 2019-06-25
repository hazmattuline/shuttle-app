package com.uline.shuttle.app.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.ShiftResponse;
import rest.models.response.VehicleOptionsResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

	private ShuttleAppClient shuttleAppClient;

	@Autowired
	public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
		this.shuttleAppClient = shuttleAppClient;
	}

	@Override
	public CoordinateResponse enRoute(CoordinateRequest coordinateRequest) {
		return shuttleAppClient.enRoute(coordinateRequest);
	}

	@Override
	public CoordinateResponse getCoordinates(Integer vehicleID) {
		return shuttleAppClient.getCoordinates(vehicleID);
	}

	@Override
	public VehicleOptionsResponse getVehicleOptions() {
		return shuttleAppClient.getVehicleOptions();
	}

	@Override
	public ShiftResponse startShift(ShiftRequest shiftRequest) {
		return shuttleAppClient.startShift(shiftRequest);
	}
}
