import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { StatusShuttles, Shuttles, Coordinates, Status, Trips, Days, Notes, ShuttleDate, Vehicle} from '../core/constants/endpoints.constant';
import { Trip } from '../models/trip.model';
import { StatusInfo } from '../models/status-info.model';
import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';


@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {
  constructor(private http: HttpClient) { }

  sendShuttleCoordinates(coordinates: CoordinatesRequest): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Shuttles + '/' + coordinates.vehicleID + Coordinates, coordinates);
  }

  sendComment(comment: DayComment): Observable<DayComment> {
    return this.http.post<DayComment>(Notes, comment);
  }

  getVehicleOptions(value): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(StatusShuttles + value);
  }

  submitTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(Trips, trip);
  }

  getShuttlesStatus(status: string): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(StatusShuttles + status);
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

  getDayInfo(date: string, vehicle: number){
    return this.http.get<Day>(Days + ShuttleDate + date + Vehicle + vehicle);
  }
}
