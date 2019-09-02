import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StagedRequest } from '../models/staged-request.model';
import { Observable } from 'rxjs';
import { STAGED_REQUEST_SHUTTLE_DAYS, STAGED_REQUEST_SHUTTLE_VEHICLES } from '../core/constants/endpoints.constant';


@Injectable({
    providedIn: 'root'
})
export class StagedRequestService {
    constructor(private http: HttpClient) {}

    updateShuttleDay(stagedRequest: StagedRequest, shuttleDayId: number): Observable<{}> {
        return this.http.put(STAGED_REQUEST_SHUTTLE_DAYS + '/' + shuttleDayId, stagedRequest);
    }

    addShuttleDay(stagedRequest: StagedRequest): Observable<{}> {
        return this.http.post(STAGED_REQUEST_SHUTTLE_DAYS, stagedRequest);
    }

    updateShuttle(stagedRequest: StagedRequest, shuttleId: number): Observable<{}> {
        return this.http.put(STAGED_REQUEST_SHUTTLE_VEHICLES + '/' + shuttleId, stagedRequest);
    }

    addShuttle(stagedRequest: StagedRequest): Observable<{}> {
        return this.http.post(STAGED_REQUEST_SHUTTLE_VEHICLES, stagedRequest);
    }

}