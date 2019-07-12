import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { Shuttles, Coordinates,  Start, Fuel, Passengers, ActiveShuttles, Status, Days } from '../core/constants/endpoints.constant';
import { StartInfo } from '../models/start-info.model';
import { FuelInfo } from '../models/fuel.model';
import { PassengerInfo } from '../models/record-passengers.model';
import { StatusInfo } from '../models/status-info.model';
import { Day } from '../models/day.model';

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

  sendShuttleCoordinates(coordinates: CoordinatesRequest): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Shuttles + '/' + Coordinates, coordinates);
  }

  sendStartInfo(startRequest: StartInfo): Observable<StartInfo> {
    return this.http.post<StartInfo>(Start, startRequest);
  }

  sendFuelInfo(fuelRequest: FuelInfo): Observable<FuelInfo> {
    return this.http.post<FuelInfo>(Fuel, fuelRequest);
  }

  sendPassengerInfo(passengerInfo: PassengerInfo): Observable<PassengerInfo> {
    return this.http.post<PassengerInfo>(Passengers, passengerInfo);
  }
  getActiveShuttles(): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(ActiveShuttles);
  }

  changeStatus(status: string, id: number): Observable<Shuttle> {
    const statusInfo: StatusInfo = {
      statusCode: status
    };
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Status, statusInfo);
  }

  submitDay(day: Day): Observable<Day> {
    return this.http.post<Day>(Days, day);
  }
}
