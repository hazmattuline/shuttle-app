import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { Vehicles } from '../core/constants/endpoints.constant';
import { GPSService } from '../services/gps.service';


@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: [ShuttleService]

})


export class StartshiftComponent implements OnInit {

constructor(private fb: FormBuilder, private gpsService: GPSService, public shuttleService: ShuttleService) {
  this.driverOptions = [
    {label: 'Select', value: null},
    {label: 'Nadia Almanza', value: {id: 1}},
    {label: 'Donna Caputo', value: {id: 2}},
    {label: 'Ariel Gauslow', value: {id: 3}},
    {label: 'Heather Iwinski', value: {id: 4}},
    {label: 'Melissa Zaugra', value: {id: 5}},
  ];

  this.milesOptions = [
    {label: 'Select', value: null},
    {label: '0', value: {id: 1}},
    {label: '1', value: {id: 2}},
    {label: '2', value: {id: 3}},
    {label: '3', value: {id: 4}},
    {label: '4', value: {id: 5}},
  ];

  this.conditionOptions = [
    {label: 'Select', value: null},
    {label: 'Good', value: {id: "GOOD"}}, 
    {label: 'Fair', value: {id: "FAIR"}},
    {label: 'Poor', value: {id: "POOR"}},
  ];

}
  @Input()
  startShift: DriverComponent;
  driverOptions: SelectItem[];
  vehicleOptions: SelectItem[];
  milesOptions: SelectItem[];
  conditionOptions: SelectItem[];
  inputMileage: number;

  startShiftForm: FormGroup;
  date: string;

  @Output()
  showShift = new EventEmitter<boolean>();

  getDate()
  {
    this.date = this.shuttleService.getDate();
  }
 


 getVehicles() {
  this.shuttleService.vehicleOptions();
  }

ngOnInit() {
  this.setupForm();
  this.getVehicles();
  this.getDate();
 }

private setupForm() {
  this.startShiftForm = this.fb.group({
    driver: '',
    vehicle: '',
    mileage: '',
    condition: ''
  });
}

submitStartData() {
  const shiftValue = this.startShiftForm.value;
  this.shuttleService.createStartInfo(shiftValue.driver.id, shiftValue.vehicle, shiftValue.mileage, shiftValue.condition.id, this.date);
  this.gpsService.setTrackingVehicle(shiftValue.vehicle);
  this.showShift.emit(false);
}


}



export interface DriverInfo {
  name: string;
  id: number;
}

export interface VehicleInfo {
  name: string;
  id: number;
}

export interface MilesInfo {
  mileage: number;
  id: number;
}

interface ConditionInfo {
  condition: string;
  id: number;
}

interface DriverInput {
  numPassengers: number;
  id: number;
}



