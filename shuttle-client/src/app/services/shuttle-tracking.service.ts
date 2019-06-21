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
      const topLeftLatitude = 42.524072; // biggest latitude in image
      const topLeftLongitude = -87.962551; // smallest longitude in image
      const bottomRightLatitude = 42.5130865; // smallest latitude in image
      const bottomRightLongitude = -87.951814;  // biggest longitude in image

      const shuttleLatitude = shuttle.latitudeCoordinates;
      const shuttleLongitude = shuttle.longitudeCoordinates;

      let imageHeight = 694;
      let imageWidth = 500;

      let longitudeDistanceFromTopLeft = (shuttleLongitude - topLeftLongitude) * Math.cos(Math.abs(shuttleLatitude));
        // latitude is relatively constant
      let latitudeDistanceFromTopLeft = (topLeftLatitude - shuttleLatitude);

      let maxLatitudeDistanceFromTopLeft = (topLeftLatitude - bottomRightLatitude);
      let maxLongitudeDistanceFromTopLeft = (bottomRightLongitude - topLeftLongitude) * (Math.cos(topLeftLatitude) + Math.cos(bottomRightLatitude)) / 2;

      let boundaryOfH2Latitude = 42.516;
      let doorOfH2Latitude = 42.514;
      let firstHighwayBoundaryLatitude = 42.5175;
      let secondHighwayBoundaryLatitude = 42.519;
      let boundaryOfH1Latitude = 42.52;
      let boundaryHighwayLongitude = -87.953;

      let posx: number;
      let posy: number;

      if (shuttleLatitude < boundaryOfH2Latitude && shuttleLongitude < boundaryHighwayLongitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 204;
      } else if ((shuttleLatitude < boundaryOfH2Latitude) && (shuttleLongitude > boundaryHighwayLongitude)) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 206.25;
      } else if ((shuttleLatitude >= boundaryOfH2Latitude) && (shuttleLatitude <= firstHighwayBoundaryLatitude)) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 202.5;
      } else if (shuttleLatitude > firstHighwayBoundaryLatitude && shuttleLatitude < secondHighwayBoundaryLatitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 193.75;
      } else if (shuttleLatitude > secondHighwayBoundaryLatitude && shuttleLongitude > boundaryHighwayLongitude) {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 188;
      } else {
        posx = (longitudeDistanceFromTopLeft) / (maxLongitudeDistanceFromTopLeft) * imageWidth + 187;
      }
      if (shuttleLatitude > boundaryOfH1Latitude) {
        posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight - 5.5;
      } else {
        posy = (latitudeDistanceFromTopLeft) / (maxLatitudeDistanceFromTopLeft) * imageHeight - 8.25;
      }



      // let lats = [];
      // let lons = [];
     
  
      //  // need to retrieve lat2 and lon2 from database later
      // lats.push(lat2);
      // lons.push(lon2);
  
      // let height = 694;
      // let width = 500;
      // let londists = [];
      // let latdists = [];
  
      // for (let i = 0; i < lats.length; i++) {
      //   let londist = (lons[i] - lon1) * Math.cos(Math.abs(lats[i]));
      //   // latitude is relatively constant
      //   let latdist = (lat1 - lats[i]);
      //   latdists.push(latdist);
      //   londists.push(londist);
      // }
  
      // //these here are for testing the offsets of the image 
      // let maxlatdist = (lat1 - lat3);
      // let maxlondist = (lon3 - lon1) * (Math.cos(lat1) + Math.cos(lat3)) / 2; // (lat1+lat3)/2
  
      // let posxs = [];
      // let posys = [];
      // let H2boundary = 42.516;
      // let H2door = 42.514;
      // let hwyboundary1 = 42.5175;
      // let hwyboundary2 = 42.519;
      // let H1boundary = 42.52;
      // let h2lonbound = -87.953;
  
  
      // // this for loop will account for the offsets of the image
      // for (let i = 0; i < lats.length; i++) {
      //   if (lats[i] < H2boundary && lons[i] < h2lonbound) {
      //     this.posx = (londists[i]) / (maxlondist) * width + 204;
      //   } else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
      //     this.posx = (londists[i]) / (maxlondist) * width + 206.25;
      //   } else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
      //     this.posx = (londists[i]) / (maxlondist) * width + 202.5;
      //   } else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
      //     this.posx = (londists[i]) / (maxlondist) * width + 193.75;
      //   } else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
      //     this.posx = (londists[i]) / (maxlondist) * width + 188;
      //   } else {
      //     this.posx = (londists[i]) / (maxlondist) * width + 187;
      //   }
      //   if (lats[i] > H1boundary) {
      //     this.posy = (latdists[i]) / (maxlatdist) * height - 5.5;
      //   } else {
      //     this.posy = (latdists[i]) / (maxlatdist) * height - 8.25;
      //   }
      //   posxs.push(this.posx);
      //   posys.push(this.posy);
      // }
    }

  showShuttles(shuttle: Shuttle) {
    let elem1 = document.getElementById('animate1');
    elem1.style.top = posys[0] + 'px';
    elem1.style.left = posxs[0] + 'px';
  }

  ngOnDestroy() {
    this.stopShuttleTracking();
  }

}
