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

  this.holly = [
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
  holly: SelectItem[];
  dixie: SelectItem[];
  possibleVehicles: Shuttle[] = [];
  selectedVehicle: Shuttle;
  isAlreadyActive = false;

  changeActive() {

    if (this.isAlreadyActive) {
      
      this.gpsService.stopGPSTracking();
      this.selectedVehicle.status = 'I';
      this.isAlreadyActive = false;
    } else {
      this.gpsService.startGPSTracking();
      this.selectedVehicle.status = 'A';
      this.isAlreadyActive = true;
    }
  }


  submit() {
    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);
  }

  ngOnInit() {
    this.getDate();
    this.shuttleApi.getVehicleOptions().subscribe(vehicles => {this.possibleVehicles = vehicles;});
  }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

  append() {
    let name: string;
    if (this.checked === false) {
       name = this.selectedVehicle.name.replace(' RENTAL', '');
    } else {
     name = this.selectedVehicle.name + ' RENTAL';
    }
    this.selected(name);
  }

  selected(name: string) {
    if (this.checked === true && !name.includes('RENTAL')) {
      name = name + ' RENTAL';
    }


    this.shuttleApi.getVehicleOptions().subscribe(vehicles => {this.possibleVehicles = vehicles;});

    for (const vehicle of this.possibleVehicles) {
        if (vehicle.name === name) {
          this.selectedVehicle = vehicle;
        }
      }



    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);
   
    this.shuttleService.getDayInfo(this.date, this.selectedVehicle.vehicleID);
    this.verify();


  }

  verify() {
    this.shuttleService.disabled = false;

    if (this.selectedVehicle.status === 'A') {
      this.gpsService.handleAlreadyActive(this.selectedVehicle);
      this.isAlreadyActive = true;
      this.toShow = true;
    } else {
      this.isAlreadyActive = false;

      this.toShow = true;
    }


  }

}
