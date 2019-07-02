import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ScriptService } from '../script.service';
import {SelectItem} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { Vehicles } from '../core/constants/endpoints.constant';
import { VehicleDropDown } from '../models/shuttleDropdownModel';


@Component({
  selector: 'app-endshift',
  templateUrl: './endshift.component.html',
  styleUrls: ['./endshift.component.css'],
  providers: [ShuttleService]

})


export class EndshiftComponent implements OnInit {

constructor(private supportService: ScriptService, private fb: FormBuilder, public shuttleService: ShuttleService) {
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
    {label: 'Good', value: {id: 1}},
    {label: 'Fair', value: {id: 2}},
    {label: 'Poor', value: {id: 3}},
  ];

}
  @Input()
  endShift: DriverComponent;
  vehicleDrop: VehicleDropDown;
  driverOptions: SelectItem[];
  vehicleOptions: SelectItem[];
  milesOptions: SelectItem[];
  conditionOptions: SelectItem[];
  inputMileage: number;

  endShiftForm: FormGroup;

  @Output()
  showShift = new EventEmitter<boolean>();

 


 getVehicles() {
  this.shuttleService.vehicleOptionsC();
  }

ngOnInit() {
  this.setupForm();
 this.getVehicles();
 }

private setupForm() {
  this.endShiftForm = this.fb.group({
    driver: '',
    vehicle: '',
    mileage: '',
    condition: ''
  });
}

submitEndData() {
  const shiftValue = this.endShiftForm.value;
  this.shuttleService.createEndInfo(shiftValue.driver.id, shiftValue.vehicle.id, shiftValue.mileage, shiftValue.condition.id);
  this.showShift.emit(false);
}


test(f)
{
console.log(f);
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



