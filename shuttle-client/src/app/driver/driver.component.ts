import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
import { SelectItem } from 'primeng/api';
import { NgModule } from '@angular/core';



@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
  })

export class DriverComponent implements OnInit {
  count = 0;
  watchID;
  inputComment;
  x: number;
  y;
  timeToStart: boolean;
  showDriverShift = true;

  info: DriverInfo[];
  passengerInputs: SelectItem[];
  curbInputs: SelectItem[];
  passengerInput: DriverInput;
  curbInput: DriverInput;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private supportService: ScriptService) {
    this.passengerInputs = [
      { label: 'Select', value: null },
      { label: '0', value: { id: 1 } },
      { label: '1', value: { id: 2 } },
      { label: '2', value: { id: 3 } },
      { label: '3', value: { id: 4 } },
      { label: '4', value: { id: 5 } },
    ];

    this.curbInputs = [
      { label: 'Select', value: null },
      { label: '0', value: { id: 1 } },
      { label: '1', value: { id: 2 } },
      { label: '2', value: { id: 3 } },
      { label: '3', value: { id: 4 } },
      { label: '4', value: { id: 5 } },
    ];
  }

  ngOnInit() {
    this.x = 0;
    console.log('inside init' + this.x);
  }





  errorHandler(err) {

    if (err.code === 1) {

      // access is denied
    }
  }

  toggle1() {
    this.count++;
    console.log(this.count);
    if (this.count % 2 === 0) {
      document.getElementById('demo').innerHTML = 'OFF';
    } else { document.getElementById('demo').innerHTML = 'ON'; }
  }


  newtog() {
    this.count++;
    if (this.count % 2 === 0) {
      alert('You are now inactive.');
      document.getElementById('demo2').innerHTML = 'Inactive';
    } else {
      alert('You are now active.');
      document.getElementById('demo2').innerHTML = 'Active';
    }
  }


  newcell() {
    const r = confirm('Are you sure?');
    if (r === true) {
    } else { /*send nothing*/ }// find row to copy
    /* send something to database*/
  }

  promptMe() {
    if (this.count % 2 === 0) {
      const endMi = prompt('What is the vehicle ending mileage?');
      const endCond = prompt('What is the vehicle ending condition?');
      // const fuelAm = prompt('How much fuel went in today?');
      // const fuelCos = prompt('What was the cost of the fuel?');
    } else {
      const vehicleResp = prompt('Please enter the vehicle you will be using today.');
      const beginMi = prompt('What is the vehicle starting mileage?');
      const beginCond = prompt('What is the vehicle starting condition?');
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
      this.watchID = navigator.geolocation.watchPosition((pos) => this.showPosition(pos), this.errorHandler, this.options);
      //navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos));
    } else { document.getElementById('demo').innerHTML = 'Geolocation is not supported by this browser.'; }
  }

  showPosition(position) {
    document.getElementById('demo3').innerHTML = 'Latitude: ' + position.coords.latitude +
      '<br>Longitude: ' + position.coords.longitude;
    this.x = position.coords.latitude;
    console.log(this.x);
    console.log(position.coords.longitude);

  }

  fuel() {
    const fuelAm = prompt('How much fuel did you put in the vehicle?');
    const fuelCos = prompt('What was the cost of the fuel?');
  }

  getwords() {
    // send this response somewhere
  }

  getShowShift(showShift: boolean) {
    console.log(showShift);
    this.showDriverShift = showShift; 
  }

}
export interface DriverInfo {
  numPassengers;
}

interface DriverInput {
  numPassengers: number;
}



// export class DriverComponent {

//   cities1: SelectItem[];

//   cities2: City[];

//   selectedCity1: City;

//   selectedCity2: City;

//   constructor() {
//       //SelectItem API with label-value pairs
//       this.cities1 = [
//           {label:'Select City', value:null},
//           {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
//           {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
//           {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
//           {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
//           {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
//       ];

//       //An array of cities
//       this.cities2 = [
//           {name: 'New York', code: 'NY'},
//           {name: 'Rome', code: 'RM'},
//           {name: 'London', code: 'LDN'},
//           {name: 'Istanbul', code: 'IST'},
//           {name: 'Paris', code: 'PRS'}
//       ];
//   }

// }
// // interface City {
//   name: string;
//   code: string;
// }

// export class DriverComponent implements OnInit
// {
//   info: DriverInfo[];
//   driverInputs: SelectItem[];
//   selectedInput: DriverInput;

// constructor(private supportService: ScriptService) {
//   this.driverInputs = [
//     {label: 'Select Number', value: null},
//     {label: '0', value: {id: 1}},
//     {label: '1', value: {id: 2}},
//     {label: '2', value: {id: 3}},
//     {label: '3', value: {id: 4}},
//     {label: '4', value: {id: 5}},
//   ];
// }
// ngOnInit() { }

// }

// export interface DriverInfo {
//   numPassengers;
// }

// interface DriverInput {
//   numPassengers: number;
// }