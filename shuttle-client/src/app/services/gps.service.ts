import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import * as isEqual from 'lodash/isEqual';

@Injectable()
export class GPSService implements OnDestroy {

  private latestCoordinates: Coordinates = null;
  private previousCoordinates: Coordinates;
  private hasNotMoved = false;

  private _isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isActive: Observable<boolean> = this._isActive.asObservable();

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  private watchId: number;

  private gpsLocationTimer: any = null;

  constructor(private shuttleService: ShuttleApiService) { }

  stopGPSTracking() {
    navigator.geolocation.clearWatch(this.watchId);
    this._isActive.next(false);
    if (this.gpsLocationTimer) {
      clearInterval(this.gpsLocationTimer);
    }
  }

  startGPSTracking() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((pos) => this.updateGPSPostion(pos), this.errorHandler, this.options);
      this._isActive.next(true);
      this.startGPSUpdateTimer();
    }
  }

  private updateGPSPostion(position: Position) {
    this.previousCoordinates = this.latestCoordinates;
    this.latestCoordinates = position.coords;
  }

  private startGPSUpdateTimer() {
    this.gpsLocationTimer = setInterval(() => {
      this.sendShuttleCoordinates();
    }, 2000);
  }

  private sendShuttleCoordinates() {
    if (this.latestCoordinates && this.previousCoordinates) {
      this.hasNotMoved = (this.previousCoordinates.latitude === this.latestCoordinates.latitude) && 
      (this.previousCoordinates.longitude === this.latestCoordinates.longitude);
    }
    if (this.latestCoordinates && !this.hasNotMoved) {
      const coordinateRequest: CoordinatesRequest = {
        vehicleID: 1, // TODO - Hard coded for now - Get this from service
        latitudeCoordinates: this.latestCoordinates.latitude,
        longitudeCoordinates: this.latestCoordinates.longitude
      }
      this.shuttleService.sendShuttleCoordinates(coordinateRequest).subscribe();
    }
  }

  getIsGPSActive(): boolean {
    return this._isActive.getValue();
  }

  errorHandler(err) {


    if (err.code === 1) {

      // access is denied
    }
  }

  ngOnDestroy() {
    this.stopGPSTracking();
  }
}
