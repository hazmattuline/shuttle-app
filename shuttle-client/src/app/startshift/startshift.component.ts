import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ScriptService } from '../script.service';
import {SelectItem} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';


@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css']
})
export class StartshiftComponent implements OnInit {
  @Input()
  startShift: DriverComponent;

  driverOptions: SelectItem[];
  vehicleOptions: SelectItem[];
  milesOptions: SelectItem[];

  driverInfo: DriverInfo[];
  vehicleInfo: VehicleInfo[];
  milesInfo: MilesInfo[];
  inputMileage: number;

  @Output()
  showShift = new EventEmitter<boolean>();

constructor(private supportService: ScriptService) {
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

}
ngOnInit() { }

submitStartData(){
  console.log(this.driverInfo);
  console.log(this.vehicleInfo);
  console.log(this.inputMileage);
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

interface DriverInput {
  numPassengers: number;
  id: number;
}


