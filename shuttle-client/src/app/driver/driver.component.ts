import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
import {SelectItem} from 'primeng/api';
import { NgModule } from '@angular/core';



@Component
({
selector: 'app-driver',
templateUrl: './driver.component.html',
styleUrls: ['./driver.component.css'],
})

export class DriverComponent implements OnInit
{
  info: DriverInfo[];
  passengerInputs: SelectItem[];
  curbInputs: SelectItem[];
  passengerInput: DriverInput;
  curbInput: DriverInput;

constructor(private supportService: ScriptService) {
  this.passengerInputs = [
    {label: 'Select', value: null},
    {label: '0', value: {id: 1}},
    {label: '1', value: {id: 2}},
    {label: '2', value: {id: 3}},
    {label: '3', value: {id: 4}},
    {label: '4', value: {id: 5}},
  ];

  this.curbInputs = [
    {label: 'Select', value: null},
    {label: '0', value: {id: 1}},
    {label: '1', value: {id: 2}},
    {label: '2', value: {id: 3}},
    {label: '3', value: {id: 4}},
    {label: '4', value: {id: 5}},
  ];
}
ngOnInit() { }

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