import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Shuttle } from '../models/shuttle.model';
import { ShuttleApiService } from '../services/shuttle-api.service';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: []
})
export class BannerDetailsComponent implements OnInit {

  constructor( public gpsService: GPSService, public shuttleService: ShuttleService, public shuttleApi: ShuttleApiService) {
    
    this.bailey = [
  {label: 'BAILEY', value: 'BAILEY'}
  ],

  this.holley = [
    {label: 'HOLLY', value: 'HOLLY'}
  ],

  this.dixie = [
    {label: 'DIXIE', value: 'DIXIE'}
  ];

  }


  driverName = 'Rob Kenlay';
  checked = false;

  date: string;
  name: string;
  toShow: boolean;

  selectedType: string;


  bailey: SelectItem[];
  holley: SelectItem[];
  dixie: SelectItem[];
  possibleVehicles:Shuttle[] = [];
  selectedVehicle: Shuttle;

  changeActive() {

    if (this.gpsService.getIsGPSActive()) {
      this.gpsService.stopGPSTracking();
    } else {
      this.gpsService.startGPSTracking();
    }
  }


  submit() {

    this.name = this.selectedType.toString();
    if (this.name === 'BAILEY' && this.checked === false) {
      this.gpsService.setTrackingVehicle(1);
    } else if (this.name === 'DIXIE' && this.checked === false) {
      this.gpsService.setTrackingVehicle(2);
    } else if (this.name === 'HOLLY' && this.checked === false) {
      this.gpsService.setTrackingVehicle(3);
    } else if (this.name === 'BAILEY' && this.checked === true) {
      this.gpsService.setTrackingVehicle(4);
    } else if (this.name === 'DIXIE' && this.checked === true) {
      this.gpsService.setTrackingVehicle(5);
    } else if (this.name === 'HOLLY' && this.checked === true) {
      this.gpsService.setTrackingVehicle(6);
    } else { }
    
  }

  ngOnInit() {
    this.getDate();
    this.shuttleApi.getVehicleOptions("ALL").subscribe(vehicles => {this.possibleVehicles = vehicles; console.log(this.possibleVehicles)});
  }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

  append() {
    let name: string = this.selectedVehicle.name + " RENTAL";
    this.selected(name);
  }

  selected(name: string) {
      for (let vehicle of this.possibleVehicles){
        if(vehicle.name === name){
          this.selectedVehicle = vehicle;
        }
      }
      this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);
      this.shuttleService.getDayInfo(this.date, this.selectedVehicle.vehicleID);
      this.verify();

  }

  verify() {
    this.shuttleService.disabled = false;

    if(this.selectedVehicle.status === 'A') {
      this.toShow = false;
    } else {
      this.toShow = true;
    }


  }

}
