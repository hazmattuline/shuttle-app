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
    this.shuttleLocationTimer = setInterval(() => {
      this.shuttleApi.getShuttles().subscribe(shuttle => {
        shuttle = this.calculateXYPixelCoordinates(shuttle);
        this._shuttles.next(shuttle);
      });
    }, 2000);
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

      const boundaryOfH2Latitude = 42.516;
      const doorOfH2Latitude = 42.514;
      const firstHighwayBoundaryLatitude = 42.5175;
      const secondHighwayBoundaryLatitude = 42.519;
      const boundaryOfH1Latitude = 42.52;
      const boundaryHighwayLongitude = -87.953;

      let posx: number;
      let posy: number;

      if (shuttleLatitude < boundaryOfH2Latitude && shuttleLongitude < boundaryHighwayLongitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      } else if ((shuttleLatitude < boundaryOfH2Latitude) && (shuttleLongitude > boundaryHighwayLongitude)) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      } else if ((shuttleLatitude >= boundaryOfH2Latitude) && (shuttleLatitude <= firstHighwayBoundaryLatitude)) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      } else if (shuttleLatitude > firstHighwayBoundaryLatitude && shuttleLatitude < secondHighwayBoundaryLatitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      } else if (shuttleLatitude > secondHighwayBoundaryLatitude && shuttleLongitude > boundaryHighwayLongitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      } else {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth;
      }
      if (shuttleLatitude > boundaryOfH1Latitude) {
        posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight;
      } else {
        posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight;
      }

      shuttle.xPixelCoordinate = posx;  // make new shuttle object or fine to just add to it?
      shuttle.yPixelCoordinate = posy;
      return shuttle;
    }

  showShuttles(shuttle: Shuttle) {
    const elem1 = document.getElementById('animate1');
    const shuttleLatitude = shuttle.latitudeCoordinates;
    const shuttleLongitude = shuttle.longitudeCoordinates;
    elem1.style.top = shuttleLatitude + 'px';
    elem1.style.left = shuttleLongitude + 'px';
  }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
