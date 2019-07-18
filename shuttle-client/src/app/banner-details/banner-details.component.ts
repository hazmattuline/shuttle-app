import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: [ShuttleService]
})
export class BannerDetailsComponent implements OnInit {
  driverName = 'Rob Kenlay';
  checked = false;

  rental = 'RENTAL';
  date: string;
  name: string;

  selectedType: string;
  bailey: SelectItem[];
  holley: SelectItem[];
  dixie: SelectItem[];

  constructor( public gpsService: GPSService, private shuttleService: ShuttleService) {
    this.bailey = [
  {label: 'BAILEY', value: 'BAILEY', }

  ],

  this.holley = [
    {label: 'HOLLY', value: 'HOLLY', icon: ''}
  ],

  this.dixie = [

    {label: 'DIXIE', value: 'DIXIE', icon: ''}
  ];

  }

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
      this.gpsService.setShuttleId(1);
    } else if (this.name === 'DIXIE' && this.checked === false) {
      this.gpsService.setShuttleId(2);
    } else if (this.name === 'HOLLY' && this.checked === false) {
      this.gpsService.setShuttleId(3);
    } else if (this.name === 'BAILEY' && this.checked === true) {
      this.gpsService.setShuttleId(4);
    } else if (this.name === 'DIXIE' && this.checked === true) {
      this.gpsService.setShuttleId(5);
    } else if (this.name === 'HOLLY' && this.checked === true) {
      this.gpsService.setShuttleId(6);
    } else {console.log("invalid");}

    console.log(this.name);
    console.log(this.checked);
  }
  ngOnInit() {
    this.getDate();

  }
  getDate() {
    this.date = this.shuttleService.getDate();
  }

}
