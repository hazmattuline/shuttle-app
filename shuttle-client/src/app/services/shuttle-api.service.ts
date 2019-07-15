import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { StatusShuttles, Shuttles, Coordinates, Status, ShuttleVehicles, ShuttleDay, SubmitDays, Comments} from '../core/constants/endpoints.constant';
import { ShuttleDayDetails } from '../models/record-passengers.model';
import { Vehicle } from '../models/vehicle.model';
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

  submitComment(comment: DayComment): Observable<DayComment> {
    console.log(comment.message);
    return this.http.post<DayComment>(Comments, comment);
  }

  responseForVehicleOptions(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(ShuttleVehicles);
  }

  sendShuttleDayDetails(shuttleDayDetails: ShuttleDayDetails): Observable<ShuttleDayDetails> {
    return this.http.post<ShuttleDayDetails>(ShuttleDay, shuttleDayDetails);
  }

  getShuttlesStatus(status): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(StatusShuttles + status);
  }

  changeStatus(status: string, id: number): Observable<Shuttle> {
    const statusInfo: StatusInfo = {
      statusCode: status
    };
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Status, statusInfo);
  }

  submitDay(day: Day): Observable<Day> {
    return this.http.post<Day>(SubmitDays, day);
  }
}
