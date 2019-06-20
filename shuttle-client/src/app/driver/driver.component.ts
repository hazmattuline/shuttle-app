import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';



@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css']
  })
export class DriverComponent implements OnInit {

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  count = 0;
  watchID;
 

  constructor(private supportService: ScriptService) { }


  ngOnInit() { }



  errorHandler(err) {

    if (err.code === 1) {

      // access is denied
    }
  }

  toggle1() {
    this.count++;
    console.log(this.count);
    if (this.count % 2 === 0) { document.getElementById('demo').innerHTML = 'OFF';
  } else { document.getElementById('demo').innerHTML = 'ON'; }
  }


  newtog() {
    this.count++;
    if (this.count % 2 === 0) {
      alert('YOU ARE NOW INACTIVE');
      document.getElementById('demo2').innerHTML = 'Inactive';
    } else {
      alert('YOU ARE NOW ACTIVE');
      document.getElementById('demo2').innerHTML = 'Active';
    }
  }


  newcell() {
    const r = confirm('ARE YOU SURE!');
    if (r === true) {
    }  else { /*send nothing*/ }// find row to copy
    /* send something to database*/
  }

  promptMe() {
    if (this.count % 2 === 0) {
      const endMi = prompt('What is the ending Mileage pleaase?');
      const fuelAm = prompt('Home much Fuel went in today?');
      const fuelCos = prompt('What was the cost of the fuel?');
    } else {
      const vehicleResp = prompt('Please Enter The Vehicle you will be using today');
      const beginMi = prompt('What is the starting mileage please?');
    }
  }

  inactivate() {
    if (this.count % 2 === 0) {
      navigator.geolocation.clearWatch(this.watchID);
      console.log('disabled tracking');
    } else { this.getLocation(); }
  }


  getLocation() {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(this.showPosition, this.errorHandler, this.options);
    } else { document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; }
  }

  showPosition(position) {
    document.getElementById('demo3').innerHTML = 'Latitude: ' + position.coords.latitude +
      '<br>Longitude: ' + position.coords.longitude;
     let x = position.coords.latitude;
     let y = position.coords.longitude;
    console.log(x);
    console.log(y);
  }

  fuel() {
    const fuelAm = prompt('Home much Fuel went in?');
    const fuelCos = prompt('What was the cost of the fuel?');
  }

  getwords() {
    // send this response somewhere
  }
}
