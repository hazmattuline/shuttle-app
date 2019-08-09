import { Injectable, OnDestroy } from '@angular/core';
import { Shuttle } from '../models/shuttle.model';
import { Subject, Observable } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';
import { MinimumLongitude, MaximumLatitude, MinimumLatitude, MaximumLongitude } from '../core/constants/coordinates.constant';
import { MapImageWidth, MapImageHeight } from '../core/constants/image.constants';

@Injectable()
export class ShuttleTrackingService implements OnDestroy {

  private _shuttles: Subject<Shuttle[]> = new Subject();
  public shuttles: Observable<Shuttle[]> = this._shuttles.asObservable();

  private shuttleLocationTimer = null;

  constructor(private shuttleApi: ShuttleApiService) { }

  private startTimer() {

    this.getActiveShuttles();
    this.shuttleLocationTimer = setInterval(() => {
      if (!document.hidden) 
      {
        this.getActiveShuttles();
      }
    }, 2000);
  }

  private getActiveShuttles() {
    this.shuttleApi.getShuttlesStatus('A').subscribe(shuttleList => {
      const shuttles: Shuttle[] = [];
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

      const imageHeight = MapImageHeight;
      const imageWidth = MapImageWidth;

      const longitudeDistanceFromTopLeft = (shuttleLongitude - MinimumLongitude) * Math.cos(Math.abs(shuttleLatitude));

      const latitudeDistanceFromTopLeft = (MaximumLatitude - shuttleLatitude);

      const maxLatitudeDistanceFromTopLeft = (MaximumLatitude - MinimumLatitude);
      const maxLongitudeDistanceFromTopLeft = (MaximumLongitude - MinimumLongitude) *
                                              (Math.cos(MaximumLatitude) + Math.cos(MinimumLatitude)) / 2;

      const posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      const posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight;

      shuttle.xPixelCoordinate = posx;
      shuttle.yPixelCoordinate = posy;
      return shuttle;
    }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
