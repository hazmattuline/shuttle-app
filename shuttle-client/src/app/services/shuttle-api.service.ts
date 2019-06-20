import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shuttle } from '../models/shuttle.model';

@Injectable({
  providedIn: 'root'
})
export class ShuttleApiService {

  constructor(private http: HttpClient) { }

  getShuttles(): Observable<Shuttle[]> {
    return this.http.get<Shuttle[]>('URL');
  }
}
