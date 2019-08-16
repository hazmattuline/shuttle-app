import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StagedRequest } from '../models/staged-request.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class StagedRequestService {
    constructor(private http: HttpClient) {}



}