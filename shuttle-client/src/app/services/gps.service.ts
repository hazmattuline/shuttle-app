import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class GPSService implements OnDestroy {

  private latestCoordinates = null;

  private _isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isActive: Observable<boolean> = this._isActive.asObservable();

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  private watchId: number;

  private gpsLocationTimer: any = null;

  constructor() { }

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
    } else { 
      document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; 
    }
  }

  updateGPSPostion(position: Position) {
    this.latestCoordinates = position.coords;
  }

  private startGPSUpdateTimer() {
    this.gpsLocationTimer = setInterval(() => {
      // SEND DATA TO SERVICE
    }, 1000);
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
