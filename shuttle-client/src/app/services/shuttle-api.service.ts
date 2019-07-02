import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { Shuttles, Coordinates,  Start } from '../core/constants/endpoints.constant';
import { StartInfo } from '../models/start-info.model';
import { EndInfo } from '../models/end-info';
import { VehicleDropDown } from '../models/shuttleDropdownModel';
import { FuelInfo } from '../models/fuel.model';
import { PassengerInfo } from '../models/record-passengers.model';

@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {
  vehicleId: number;

  constructor(private http: HttpClient) { }

  getShuttleCoordinates(id: number): Observable<Shuttle> {
    return this.http.get<Shuttle>(Shuttles + '/' +  id + Coordinates); // TODO - remove hard coding id
  }

  getShuttles(): Observable<Shuttle> {
    return this.http.get<Shuttle>(Shuttles);
  }
  
  getShuttle(id: number) {
    return this.http.get<Shuttle>(Shuttles + '/' + id);
  }

  sendShuttleCoordinates(coordinates: CoordinatesRequest, id: number): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Coordinates, coordinates);
  }
  sendStartInfo(startRequest: StartInfo): Observable<StartInfo> {
    return this.http.post<StartInfo>(Start, startRequest);
  }
  sendEndInfo(endRequest: EndInfo): Observable<EndInfo> {
    return this.http.post<EndInfo>(storeEndInfo, endRequest);
  }
  responseForVehicleOptions(): Observable<VehicleDropDown[]> {
    return this.http.get<VehicleDropDown[]>(getVehicleOptions);
  }
  sendFuelInfo(fuelRequest: FuelInfo): Observable<FuelInfo> {
    return this.http.post<FuelInfo>(storeFuelInfo, fuelRequest);
  }
  sendPassengerInfo(): Observable<PassengerInfo> {
    return this.http.get<PassengerInfo>(storePassengers);
  }
  }
