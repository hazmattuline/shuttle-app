import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';


@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: [ShuttleService]
})
export class StartshiftComponent implements OnInit {
  @Input()
  startShift: DriverComponent;

  driverOptions: SelectItem[];
  vehicleOptions: SelectItem[];
  milesOptions: SelectItem[];
  conditionOptions: SelectItem[];
  inputMileage: number;

  startShiftForm: FormGroup;

  @Output()
  showShift = new EventEmitter<boolean>();

constructor(private fb: FormBuilder, private gpsService: GPSService, private shuttleService: ShuttleService) {
  this.driverOptions = [
    {label: 'Select', value: null},
    {label: 'Nadia Almanza', value: {id: 1}},
    {label: 'Donna Caputo', value: {id: 2}},
    {label: 'Ariel Gauslow', value: {id: 3}},
    {label: 'Heather Iwinski', value: {id: 4}},
    {label: 'Melissa Zaugra', value: {id: 5}},
  ];

  this.vehicleOptions = [
    {label: 'Select', value: null},
    {label: 'Bailey', value: {id: 1}},
    {label: 'Bailey Rental', value: {id: 2}},
    {label: 'Dixie', value: {id: 3}},
    {label: 'Dixie Rental', value: {id: 4}},
    {label: 'Holly', value: {id: 5}},
    {label: 'Holly Rental', value: {id: 6}},
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
    {label: 'Good', value: {id: 1}},
    {label: 'Fair', value: {id: 2}},
    {label: 'Poor', value: {id: 3}},
  ];

}
ngOnInit() {
  this.setupForm();
 }

private setupForm() {
  this.startShiftForm = this.fb.group({
    vehicleId: ''
  });
}

submitStartData(){
  const shiftValue = this.startShiftForm.value;
  this.gpsService.setTrackingVehicle(shiftValue.vehicleId);
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


