import { Injectable, OnDestroy } from '@angular/core';
import { Shuttle } from '../models/shuttle.model';
import { Subject, Observable } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';

@Injectable()
export class ShuttleTrackingService implements OnDestroy {

  private _shuttles: Subject<Shuttle[]> = new Subject();
  public shuttles: Observable<Shuttle[]> = this._shuttles.asObservable();

  private shuttleLocationTimer = null;

  constructor(private shuttleApi: ShuttleApiService) { }

  private startTimer() {
    this.shuttleLocationTimer = setInterval(() => {
      this.shuttleApi.getShuttles().subscribe(shuttles => {
        shuttles.forEach(shuttle => {
          shuttle = this.calculateXYPixelCoordinates(shuttle);
        });
        this._shuttles.next(shuttles);
      });
    }, 1000);
  }

  public startShuttleTracking() {
    this.startTimer();
  }

  private stopShuttleTracking() {
    if (this.shuttleLocationTimer) {
      clearInterval(this.shuttleLocationTimer);
    }
  }

  calculateXYPixelCoordinates(shuttle: Shuttle): Shuttle {
    return null;
  }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
