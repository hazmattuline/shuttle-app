import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';
import { Shuttle } from '../models/shuttle.model';
import {TripService} from "./trip.service";

@Injectable()
export class GPSService implements OnDestroy{
  private latestCoordinates: Coordinates = null;
  private shuttle: Shuttle = null;
  private shuttleId: number = null;

  private _isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isActive: Observable<boolean> = this._isActive.asObservable();

  private _shuttleId: BehaviorSubject<number> = new BehaviorSubject(null);
  public shuttleIdObservable: Observable<number> = this._shuttleId.asObservable();

  private subscription:Subscription

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  private watchId: number;
  private gpsLocationTimer: any = null;
  constructor(private shuttleApiService: ShuttleApiService, private tripService: TripService) { }

  setTrackingVehicle(vehicleId: number) {
      this.shuttleId = vehicleId;
      this._shuttleId.next(vehicleId);
  }

  getShuttleId() {
    return this.shuttleId;
  }

  stopGPSTracking() {
    navigator.geolocation.clearWatch(this.watchId);
    this._isActive.next(false);
    if (this.gpsLocationTimer) {
      clearInterval(this.gpsLocationTimer);
    }
  }

  handleAlreadyActive(shuttle: Shuttle) {
    this._isActive.next(true);
    this.shuttle = shuttle;
    this.startGPSTracking();
  }

  startGPSTracking() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((pos) => this.updateGPSPostion(pos), this.errorHandler, this.options);
      this.shuttleApiService.changeStatus('A', this.shuttleId).subscribe(newShuttle => {
        this.shuttle = newShuttle;
        this._isActive.next(true);
        this.startGPSUpdateTimer();
      });
    }
  }

  private updateGPSPostion(position: Position) {
    this.latestCoordinates = position.coords;
  }

  private startGPSUpdateTimer() {
    this.gpsLocationTimer = setInterval(() => {
      if (!document.hidden)
      {
        this.sendShuttleCoordinates();
      }
    }, 2000);
  }

  private sendShuttleCoordinates() {
    if (this.latestCoordinates) {
      const shuttle: Shuttle = {
        vehicleId: this.shuttle.vehicleId,
        latitudeCoordinates: this.latestCoordinates.latitude,
        longitudeCoordinates: this.latestCoordinates.longitude
      };
      this.subscription = this.shuttleApiService.sendShuttleCoordinates(shuttle).subscribe(success => this.tripService.processCachedTrips());
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  stop() {
    this.stopGPSTracking();
    if (this.shuttle === null) {
      return;
    } else {
    this.shuttleApiService.changeStatus('I', this.shuttle.vehicleId).subscribe(newShuttle => {
      this.shuttle = newShuttle;
    });
  }
  }
}
