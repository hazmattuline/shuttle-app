import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class LocationService implements OnDestroy {

  private _coordinates: Subject<Coordinates> = new Subject();
  public coordinates: Observable<Coordinates> = this._coordinates.asObservable();

  private _isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isActive: Observable<boolean> = this._isActive.asObservable();

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  private watchId: number;

  private locationTimer: any = null;

  constructor() { }

  stopTracking() {
    navigator.geolocation.clearWatch(this.watchId);
    this._isActive.next(false);
    if (this.locationTimer) {
      clearInterval(this.locationTimer);
    }
  }

  startTracking() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((pos) => this.showPosition(pos), this.errorHandler, this.options);
      this._isActive.next(true);
    } else { 
      document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; 
    }
  }

  showPosition(position: Position) {
    this._coordinates.next(position.coords);
  }

  private startTimer() {
    this.locationTimer = setInterval(() => {
      // SEND DATA TO SERVICE
    }, 1000);
  }

  getIsActive(): boolean {
    return this._isActive.getValue();
  }

  errorHandler(err) {


    if (err.code === 1) {

      // access is denied
    }
  }

  ngOnDestroy() {
    this.stopTracking();
  }
}
