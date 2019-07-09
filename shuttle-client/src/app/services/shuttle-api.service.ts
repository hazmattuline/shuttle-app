import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { Enroute, ReceiveCoords, storeStartInfo, ActiveShuttles, Shuttles, Status } from '../core/constants/endpoints.constant';
import { StartInfo } from '../models/start-info.model';
import { StatusInfo } from '../models/status-info.model';

@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {
  vehicleId: number;

  constructor(private http: HttpClient) { }

  getShuttles(): Observable<Shuttle> {
    return this.http.get<Shuttle>(ReceiveCoords + '/' + 1); // TODO - remove hard coding id
  }

  sendShuttleCoordinates(coordinates: CoordinatesRequest): Observable<Shuttle> {
    return this.http.patch<Shuttle>(Enroute, coordinates);
  }

  getActiveShuttles(): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>(ActiveShuttles);
  }

  changeStatus(status: string, id: number): Observable<Shuttle> {
    const statusInfo: StatusInfo = {
      statusCode: status
    }
    return this.http.patch<Shuttle>(Shuttles + '/' + id + Status, statusInfo);
  }
}
