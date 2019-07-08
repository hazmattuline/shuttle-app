import { Injectable, OnDestroy } from '@angular/core';
import { Shuttle } from '../models/shuttle.model';
import { Subject, Observable } from 'rxjs';
import { ShuttleApiService } from './shuttle-api.service';

@Injectable()
export class ShuttleTrackingService implements OnDestroy {

  private _shuttles: Subject<Shuttle> = new Subject();
  public shuttles: Observable<Shuttle> = this._shuttles.asObservable();

  private shuttleLocationTimer = null;

  constructor(private shuttleApi: ShuttleApiService) { }

  private startTimer() {
    this.showShuttle();
    this.shuttleLocationTimer = setInterval(() => {
      this.showShuttle();
    }, 2000);
  }

  private showShuttle() {
    this.shuttleApi.getShuttleCoordinates(1).subscribe(shuttle => {  // hardcoded 1 as the shuttle for now
      if (shuttle.latitudeCoordinates <= 42.524072 && shuttle.latitudeCoordinates >= 42.5130865
         && shuttle.longitudeCoordinates >= -87.962551 && shuttle.longitudeCoordinates ) {
          shuttle = this.calculateXYPixelCoordinates(shuttle);
          this._shuttles.next(shuttle);
      } else {
        console.log('off the map');
      }
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
      const topLeftLatitude = 42.524072; // biggest latitude in image
      const topLeftLongitude = -87.962551; // smallest longitude in image
      const bottomRightLatitude = 42.5130865; // smallest latitude in image
      const bottomRightLongitude = -87.951814;  // biggest longitude in image

      const shuttleLatitude = shuttle.latitudeCoordinates;
      const shuttleLongitude = shuttle.longitudeCoordinates;

      const imageHeight = 694;
      const imageWidth = 500;

      const longitudeDistanceFromTopLeft = (shuttleLongitude - topLeftLongitude) * Math.cos(Math.abs(shuttleLatitude));
        // latitude is relatively constant
      const latitudeDistanceFromTopLeft = (topLeftLatitude - shuttleLatitude);

      const maxLatitudeDistanceFromTopLeft = (topLeftLatitude - bottomRightLatitude);
      const maxLongitudeDistanceFromTopLeft = (bottomRightLongitude - topLeftLongitude) *
                                              (Math.cos(topLeftLatitude) + Math.cos(bottomRightLatitude)) / 2;

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
