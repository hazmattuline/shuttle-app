import { Injectable, OnDestroy } from '@angular/core';
import { Shuttle } from '../models/shuttle.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShuttleTrackingService implements OnDestroy {

  private _shuttles: Subject<Shuttle[]> = new Subject();
  public shuttles: Observable<Shuttle[]> = this._shuttles.asObservable();

  private shuttleLocationTimer = null;

  constructor() { }

  private startTimer() {
    this.shuttleLocationTimer = setInterval(() => {
      // GET DATA FROM SERVICE
    }, 1000);
  }

  public startShuttleTracking() {

  }

  private stopShuttleTracking() {
    if (this.shuttleLocationTimer) {
      clearInterval(this.shuttleLocationTimer);
    }
  }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
