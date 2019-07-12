import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CoordinatesRequest } from '../models/coordinates-request.model';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { UserComponent } from '../user/user.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [GPSService , ShuttleService]
    })
export class DriverComponent implements OnInit, OnDestroy {
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
  use: UserComponent;
  date: string;
  dayDetailForm: FormGroup;

  constructor(private fb: FormBuilder, public gpsService: GPSService, private shuttleService: ShuttleService) {
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
  getDate() {
    this.date = this.shuttleService.getDate();
  }
ngOnInit() {
  this.getDate();
  this.setupForm();
  }

changeActive() {
    if (this.gpsService.getIsGPSActive()) {
      this.gpsService.stopGPSTracking();
      this.shuttleService.deleteMarker();
     // this.shuttleService.stopListenForShuttleMarkers(this.use.shuttleSubscription);
    } else {

      this.gpsService.startGPSTracking();
    }
  }

changeBreak() {
    // add code to change between On Break and Off Break
    return null;
  }
  
private setupForm() {
  this.dayDetailForm = this.fb.group({
    passengerInputs: '',
    vehicle: '',
    curbInputs: '',
  });
}

submitPassengerInfo() {
    // TODO - submit info from new UI
    const shiftValue = this.dayDetailForm.value;

    this.shuttleService.createShuttleDayDetails(1, shiftValue.passengerInputs.id-1, shiftValue.curbInputs.id-1, this.date);

  }

makeNewRow() {
    // allow drivers to submit number of passengers in shuttle and left at curb again
   return null;
  }

recordFuel() {
    const fuelAmo = prompt('How much fuel did you put in the vehicle?');
    const fuelCost = prompt('What was the cost of the fuel?');
    const vehicleId = prompt('What is the vehicle Id');
    let fuelAm = parseInt(fuelAmo, 10);
    let fuelCos = parseInt(fuelCost, 10);
    let vehicleID = parseInt(vehicleId, 10);
    this.shuttleService.createFuelInfo(fuelAm, fuelCos, this.date, vehicleID);
  }

recordComments() {
    // keep track of comments entered
    return null;
  }

  getShowShift(showShift: boolean) {
    this.showDriverShift = showShift;
  }

  ngOnDestroy() {
    this.gpsService.stop();
  }

}
export interface DriverInfo {
  numPassengers;
}

interface DriverInput {
  numPassengers: number;
}
