import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
import { SelectItem } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CoordsRequest } from '../models/coords-request.model';
import { LocationService } from '../services/location.service';



@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [LocationService]
    })
export class DriverComponent implements OnInit {
  count = 0;
  inputComment;
  timeToStart: boolean;
  isActive = false;
  showDriverShift = true;

  info: DriverInfo[];
  passengerInputs: SelectItem[];
  curbInputs: SelectItem[];
  passengerInput: DriverInput;
  curbInput: DriverInput;

  constructor(private supportService: ScriptService, private locationService: LocationService) {
    this.passengerInputs = [
      { label: 'Select', value: null },
      { label: '0', value: { id: 1 } },
      { label: '1', value: { id: 2 } },
      { label: '2', value: { id: 3 } },
      { label: '3', value: { id: 4 } },
      { label: '4', value: { id: 5 } },
      { label: '5', value: { id: 6 } },
      { label: '6', value: { id: 7 } },
      { label: '7', value: { id: 8 } },
      { label: '8', value: { id: 9 } },
      { label: '9', value: { id: 10 } },
      { label: '10', value: { id: 11 } },
      { label: '11', value: { id: 12 } },
      { label: '12', value: { id: 13 } },
      { label: '13', value: { id: 14 } },
      { label: '14', value: { id: 15 } },
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
  }

  changeActive() {
    if (this.locationService.getIsActive()) {
      this.locationService.stopTracking();
    } else {
      this.locationService.startTracking();
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

  fuel() {
    const fuelAm = prompt('How much fuel did you put in the vehicle?');
    const fuelCos = prompt('What was the cost of the fuel?');
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