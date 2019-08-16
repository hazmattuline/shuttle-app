import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { StatusShuttles, Shuttles, Coordinates, Status, Trips, Days, Notes, AllShuttles, 
  Vehicle, ShuttleDate, Routes, EveryDay} from '../core/constants/endpoints.constant';
import { Trip } from '../models/trip.model';
import { Day } from '../models/day.model';
import { DayComment } from '../models/day-comment.model';
import { ShuttleRoute } from '../models/shuttle-route.model';



@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {
  constructor(private http: HttpClient) { }

  sendShuttleCoordinates(shuttle: Shuttle): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Shuttles + '/' + shuttle.vehicleId + Coordinates, shuttle);
  }

  getTrip(date: string, vehicle: number): Observable<Trip> {
    return this.http.get<Trip>(Trips+ShuttleDate+date+Vehicle+vehicle);
  }

  sendComment(comment: DayComment): Observable<DayComment> {
    return this.http.post<DayComment>(Notes, comment);
  }

  getVehicleOptions(): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(AllShuttles);
  }

  getRouteOptions(): Observable<ShuttleRoute[]> {
    return this.http.get<ShuttleRoute[]>(Routes);
  }

  submitTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(Trips, trip);
  }

  getShuttlesStatus(status: string): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(StatusShuttles + status);
  }

  changeStatus(statusCode: string, id: number): Observable<Shuttle> {
    const shuttle: Shuttle = {
      vehicleId: id,
      status: statusCode
    };
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Status, shuttle);
  }

  submitDay(day: Day): Observable<Day> {
    return this.http.post<Day>(Days, day);
  }

  getDayInfo(date: string, vehicle: number){
    return this.http.get<Day>(Days + ShuttleDate + date + Vehicle + vehicle);
  }
  
  getAllDayInfo(): Observable<Day[]> {
    return this.http.get<Day[]>(EveryDay);
  }
}
