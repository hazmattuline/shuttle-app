package com.uline.shuttle.app.client.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;

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
public class ShuttleAppClientImpl implements ShuttleAppClient {

	@Value("${shuttle.service.url.get.status.shuttles}")
	private String statusShuttlesURL;

	@Value("${shuttle.service.base.url}")
	private String baseUrl;

	private UlineRestTemplate restTemplate;

	@Value("${shuttle.service.url.post.coordinates}")
	private String shuttlePostCoordinates;

	@Value("${shuttle.service.url.post.trips.data}")
	private String shuttleServiceForDayDetails;

	@Value("${shuttle.service.url.change.status}")
	private String changeStatusURL;

	@Value("${shuttle.service.url.submit.day}")
	private String submitDayURL;

	@Value("${shuttle.service.url.submit.note}")
	private String submitNoteURL;

	@Value("${shuttle.service.url.get.trip}")
	private String getTripURL;

	@Value("${shuttle.service.url.get.routes}")
	private String getRoutesURL;

	@Value("${shuttle.service.url.get.day}")
	private String getDayURL;

	@Autowired
	public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@Override
	public ShuttleResponse changeStatus(ShuttleRequest shuttleRequest, Integer id) {

		Map<String, Integer> params = new HashMap<>();
		params.put("id", id);

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + changeStatusURL);

		return restTemplate
				.exchange(
						builder.buildAndExpand(params).toUriString(),
						HttpMethod.PATCH,
						new HttpEntity<>(shuttleRequest),
						new ParameterizedTypeReference<ShuttleResponse>() {})
				.getBody();
	}

	@Override
	public ShuttleResponse enRoute(Integer vehicleID, ShuttleRequest shuttleRequest) {

		Map<String, Integer> params = new HashMap<>();
		params.put("id", vehicleID);

		UriComponentsBuilder builder =
				UriComponentsBuilder.fromUriString(baseUrl + shuttlePostCoordinates);

		return restTemplate
				.exchange(
						builder.buildAndExpand(params).toUriString(),
						HttpMethod.PATCH,
						new HttpEntity<>(shuttleRequest),
						new ParameterizedTypeReference<ShuttleResponse>() {})
				.getBody();
	}

	@Override
	public DayResponse getDay(String date, Integer vehicleId) {
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + getDayURL);

		String vehicle = Integer.toString(vehicleId);

		Map<String, String> params = new HashMap<>();

		params.put("date", date);
		params.put("vehicle", vehicle);

		return restTemplate
				.exchange(
						builder.buildAndExpand(params).toUriString(),
						HttpMethod.GET,
						new HttpEntity<>(null, null),
						new ParameterizedTypeReference<DayResponse>() {})
				.getBody();
	}

	@Override
	public List<RouteResponse> getRoutes() {
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + getRoutesURL);

		return restTemplate
				.exchange(
						builder.build().toUriString(),
						HttpMethod.GET,
						new HttpEntity<>(null, null),
						new ParameterizedTypeReference<List<RouteResponse>>() {})
				.getBody();
	}

	@Override
	public List<ShuttleResponse> getShuttlesStatus(String status) {
		Map<String, String> params = new HashMap<>();
		params.put("status", status);

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + statusShuttlesURL);
		return restTemplate
				.exchange(
						builder.buildAndExpand(params).toUriString(),
						HttpMethod.GET,
						new HttpEntity<>(null, null),
						new ParameterizedTypeReference<List<ShuttleResponse>>() {})
				.getBody();
	}

	@Override
	public TripResponse getTrip(String date, Integer vehicleId) {
		String vehicle = Integer.toString(vehicleId);
		Map<String, String> params = new HashMap<>();
		params.put("date", date);
		params.put("vehicle", vehicle);

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + getTripURL);

		return restTemplate
				.exchange(
						builder.buildAndExpand(params).toUriString(),
						HttpMethod.GET,
						new HttpEntity<>(null, null),
						new ParameterizedTypeReference<TripResponse>() {})
				.getBody();
	}

	@Override
	public TripResponse postTrip(TripRequest shuttleDayRequest) {

		UriComponentsBuilder builder =
				UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForDayDetails);

		return restTemplate
				.exchange(
						builder.build().toUriString(),
						HttpMethod.POST,
						new HttpEntity<>(shuttleDayRequest),
						new ParameterizedTypeReference<TripResponse>() {})
				.getBody();
	}

	@Override
	public DayResponse submitDay(DayRequest dayRequest) {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + submitDayURL);

		return restTemplate
				.exchange(
						builder.build().toUriString(),
						HttpMethod.POST,
						new HttpEntity<>(dayRequest),
						new ParameterizedTypeReference<DayResponse>() {})
				.getBody();
	}

	@Override
	public NoteResponse submitNote(NoteRequest noteRequest) {

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + submitNoteURL);

		return restTemplate
				.exchange(
						builder.build().toUriString(),
						HttpMethod.POST,
						new HttpEntity<>(noteRequest),
						new ParameterizedTypeReference<NoteResponse>() {})
				.getBody();
	}
}
