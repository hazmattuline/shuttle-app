import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import * as isEqual from 'lodash/isEqual';
import { Shuttle } from '../models/shuttle.model';

@Injectable()
export class GPSService implements OnDestroy {

  private latestCoordinates: Coordinates = null;
  private previousCoordinates: Coordinates;
  private hasNotMoved = false;
  private shuttle: Shuttle;
  private shuttleId: number = 0;

  private _isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isActive: Observable<boolean> = this._isActive.asObservable();

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  private watchId: number;

  private gpsLocationTimer: any = null;

  constructor(private shuttleApiService: ShuttleApiService) { }

  setTrackingVehicle(vehicleId: number) {
    if (vehicleId > 0 && vehicleId < 6) {
      this.shuttleId = vehicleId;
    } else {
      this.shuttleId = 1;
    }
  }

  stopGPSTracking() {
    navigator.geolocation.clearWatch(this.watchId);
    this._isActive.next(false);
    if (this.gpsLocationTimer) {
      clearInterval(this.gpsLocationTimer);
    }
    this.shuttleApiService.changeStatus("I", this.shuttle.vehicleID).subscribe(newShuttle => {
      this.shuttle = newShuttle;
    });
  }

  startGPSTracking() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((pos) => this.updateGPSPostion(pos), this.errorHandler, this.options);
      this.shuttleApiService.changeStatus("A", this.shuttleId).subscribe(newShuttle => {
        this.shuttle = newShuttle;
        this._isActive.next(true);
        this.startGPSUpdateTimer();
      });
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
    // if (this.latestCoordinates && this.previousCoordinates) {
    //   this.hasNotMoved = (this.previousCoordinates.latitude === this.latestCoordinates.latitude) && 
    //   (this.previousCoordinates.longitude === this.latestCoordinates.longitude);
    // }
    this.hasNotMoved = false;
    if (this.latestCoordinates && !this.hasNotMoved) {
      const coordinateRequest: CoordinatesRequest = {
        vehicleID: this.shuttle.vehicleID, // TODO - Hard coded for now - Get this from service
        latitudeCoordinates: this.latestCoordinates.latitude,
        longitudeCoordinates: this.latestCoordinates.longitude
      }
      this.shuttleApiService.sendShuttleCoordinates(coordinateRequest).subscribe();
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

  stop() {
    this.stopGPSTracking();
    this.shuttleApiService.changeStatus("I", this.shuttle.vehicleID).subscribe(newShuttle => {
      this.shuttle = newShuttle;
    });
  }

  ngOnDestroy() {
    this.stop();
  }
}
