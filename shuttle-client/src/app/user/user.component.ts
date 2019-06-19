import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
import {ButtonModule} from 'primeng/button';
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
  x=0;
  y;
  posx;
  posy;

 

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  // have the location be displayed on page load
  ngOnInit() {
    this.getLocation();
  }


  errorHandler(err) {

    if (err.code === 1) {

      // access is denied
    }
  }

  // this method will initially grab our location and call showPosition
  getLocation() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(this.showPosition.bind(this), this.errorHandler, this.options);
    } else { document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; }
  }

  // this function will actually save those coords
  showPosition(position) {
    document.getElementById('demo3').innerHTML = 'Latitude:' + position.coords.latitude +
      '<br>Longitude: ' + position.coords.longitude;

    this.myMove(position.coords.latitude, position.coords.longitude);


  }

  // this method animates the dots for us to see 
   myMove(lat2, lon2) {



    let elem1 = document.getElementById('animate1');
    let lat1 = 42.524072; // biggest latitude in image
    let lon1 = -87.962551; // smallest longitude in image
    let lat3 = 42.5130865; // smallest latitude in image
    let lon3 = -87.951814;  // biggest longitude in image
    let lats = [];
    let lons = [];
    // need to retrieve this from database later

    
    lats.push(lat2);
    lons.push(lon2);

    console.log(lat2);

    let height = 694;
    let width = 500;
    let londists = [];
    let latdists = [];

    for (let i = 0; i < lats.length; i++) {
      let londist = (lons[i] - lon1) * Math.cos(Math.abs(lats[i]));
      // latitude is relatively constant
      let latdist = (lat1 - lats[i]);
      latdists.push(latdist);
      londists.push(londist);
    }

    let maxlatdist = (lat1 - lat3);
    let maxlondist = (lon3 - lon1) * (Math.cos(lat1) + Math.cos(lat3)) / 2; // (lat1+lat3)/2

    let posxs = [];
    let posys = [];
    let H2boundary = 42.516;
    let H2door = 42.514;
    let hwyboundary1 = 42.5175;
    let hwyboundary2 = 42.519;
    let H1boundary = 42.52;
    let h2lonbound = -87.953;

    for (let i = 0; i < lats.length; i++) {
      // x coordinate
      if (lats[i] < H2boundary && lons[i] < h2lonbound) {
        this.posx = (londists[i]) / (maxlondist) * width + 204;
      } else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
        this.posx = (londists[i]) / (maxlondist) * width + 206.25;
      } else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
        this.posx = (londists[i]) / (maxlondist) * width + 202.5;
      } else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
        this.posx = (londists[i]) / (maxlondist) * width + 193.75;
      } else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
        this.posx = (londists[i]) / (maxlondist) * width + 188;
      } else {
        this.posx = (londists[i]) / (maxlondist) * width + 187;
      }
      if (lats[i] > H1boundary) {
        this.posy = (latdists[i]) / (maxlatdist) * height - 5.5;
      } else {
        this.posy = (latdists[i]) / (maxlatdist) * height - 8.25;
      }
      posxs.push(this.posx);
      posys.push(this.posy);
    }
    elem1.style.top = posys[0] + 'px';
    elem1.style.left = posxs[0] + 'px';

  } 
}


