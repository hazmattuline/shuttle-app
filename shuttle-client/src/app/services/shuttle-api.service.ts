import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { Enroute, Shuttles, Status, StatusShuttles } from '../core/constants/endpoints.constant';
import { StartInfo } from '../models/start-info.model';
import { StatusInfo } from '../models/status-info.model';

@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {
  vehicleId: number;

  constructor(private http: HttpClient) { }

  sendShuttleCoordinates(coordinates: CoordinatesRequest): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Enroute, coordinates);
  }

  getShuttlesStatus(status): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(StatusShuttles + status);
  }

  changeStatus(status: string, id: number): Observable<Shuttle> {
    const statusInfo: StatusInfo = {
      statusCode: status
    }
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Status, statusInfo);
  }
}
