import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
// these are my instance variable for my gps.js file

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
  })

export class UserComponent implements OnInit {
  title = 'Shuttle';

  watchID;
  x;
  y;
  posx;
  posy;

  posxs = [];
  posys = [];

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  ngOnInit() {
  }

  constructor(private scriptService: ScriptService) { }


  errorHandler(err) {

    if (err.code === 1) {

      // access is denied
    }
  }


  getLocation() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(this.showPosition.bind(this), this.errorHandler, this.options);
    } else { document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; }
  }

  showPosition(position) {
    document.getElementById('demo3').innerHTML = 'Latitude:' + position.coords.latitude +
      '<br>Longitude: ' + position.coords.longitude;
    this.x = position.coords.latitude;
    this.y = position.coords.longitude;
    console.log(this.x);
    console.log(this.y);
    this.myMove();
  }
  myMove() {

    console.log('my move');
    const elem1 = document.getElementById('animate1');
    const lat1 = 42.523300; // biggest latitude in image
    const lon1 = -87.971642; // smallest longitude in image
    const lat3 = 42.5130865; // smallest latitude in image
    const lon3 = -87.951814;  // biggest longitude in image
    const lats = [];
    const lons = [];
    // need to retrieve this from database later

    let lat2 = this.x;
    let lon2 = this.y;
    lats.push(lat2);
    lons.push(lon2);

    const height = 600;
    const width = 900;
    const londists = [];
    const latdists = [];

    for (let i = 0; i < lats.length; i++) {
      const londist = (lons[i] - lon1) * Math.cos(Math.abs(lats[i]));
      // latitude is pretty constant
      const latdist = (lat1 - lats[i]);
      latdists.push(latdist);
      londists.push(londist);
    }

    const maxlatdist = (lat1 - lat3);
    const maxlondist = (lon3 - lon1) * (Math.cos(lat1) + Math.cos(lat3)) / 2; // (lat1+lat3)/2

    const H2boundary = 42.516;
    const H2door = 42.514;
    const hwyboundary1 = 42.5175;
    const hwyboundary2 = 42.519;
    const H1boundary = 42.52;
    const h2lonbound = -87.953;

    for (let i = 0; i < lats.length; i++) {
      // x coordinate
      if (lats[i] < H2boundary && lons[i] < h2lonbound) {
        this.posx = (londists[i]) / (maxlondist) * width + 3;
      } else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
        this.posx = (londists[i]) / (maxlondist) * width + 3;
      } else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
        this.posx = (londists[i]) / (maxlondist) * width - 6;
      } else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
        this.posx = (londists[i]) / (maxlondist) * width - 15;
      } else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
        this.posx = (londists[i]) / (maxlondist) * width - 30;
      } else {
        this.posx = (londists[i]) / (maxlondist) * width - 27;
      }
      if (lats[i] > H1boundary) {
        this.posy = (latdists[i]) / (maxlatdist) * height;
      } else {
        this.posy = (latdists[i]) / (maxlatdist) * height - 6;
      }
      this.posxs.push(this.posx);
      this.posys.push(this.posy);
    }
    elem1.style.top = this.posys[0] + 'px';
    elem1.style.left = this.posxs[0] + 'px';
  }
}
