import { Injectable, OnDestroy } from '@angular/core';
import { Shuttle } from '../models/shuttle.model';
import { Subject, Observable } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';
import { MinimumLongitude, MaximumLatitude, MinimumLatitude, MaximumLongitude } from '../core/constants/coordinates.constant';

@Injectable()
export class ShuttleTrackingService implements OnDestroy {

  private _shuttles: Subject<Shuttle[]> = new Subject();
  public shuttles: Observable<Shuttle[]> = this._shuttles.asObservable();

  private shuttleLocationTimer = null;

  constructor(private shuttleApi: ShuttleApiService) { }

  private startTimer() {
    this.showShuttle();
    this.shuttleLocationTimer = setInterval(() => {
      this.showShuttle();
    }, 2000);
  }

  private showShuttle() {
    this.shuttleApi.getActiveShuttles().subscribe(shuttleList => {
      let shuttles: Shuttle[] = [];
      for (let shuttle of shuttleList) {
        shuttle = this.calculateXYPixelCoordinates(shuttle);
        shuttles.push(shuttle);
      }
      this._shuttles.next(shuttles);
    });
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
      const shuttleLatitude = shuttle.latitudeCoordinates;
      const shuttleLongitude = shuttle.longitudeCoordinates;

      const imageHeight = 694;
      const imageWidth = 500;

      const longitudeDistanceFromTopLeft = (shuttleLongitude - MinimumLongitude) * Math.cos(Math.abs(shuttleLatitude));
        // latitude is relatively constant
      const latitudeDistanceFromTopLeft = (MaximumLatitude - shuttleLatitude);

      const maxLatitudeDistanceFromTopLeft = (MaximumLatitude - MinimumLatitude);
      const maxLongitudeDistanceFromTopLeft = (MaximumLongitude - MinimumLongitude) *
                                              (Math.cos(MaximumLatitude) + Math.cos(MinimumLatitude)) / 2;

      let posx: number;
      let posy: number;

      posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight;

      shuttle.xPixelCoordinate = posx;  // make new shuttle object or fine to just add to it?
      shuttle.yPixelCoordinate = posy;
      return shuttle;
    }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
