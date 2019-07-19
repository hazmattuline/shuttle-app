import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Shuttle } from '../models/shuttle.model';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: [ShuttleService]
})
export class BannerDetailsComponent implements OnInit {

  constructor( public gpsService: GPSService, public shuttleService: ShuttleService) {
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
  driverName = 'Rob Kenlay';
  checked = false;

  rental = 'RENTAL';
  date: string;
  name: string;
  toShow: boolean; 

  selectedType: string;
  bailey: SelectItem[];
  holley: SelectItem[];
  dixie: SelectItem[];

  value: Shuttle;

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

  }

  ngOnInit() {
    this.getDate();
    this.shuttleService.vehicleOptions("ALL");

  }

  getDate() {
    this.date = this.shuttleService.getDate();
  }
  
  verify(vehicleName: string){
    this.value = this.shuttleService.getValue();

    

    if(vehicleName === this.value[0].name && this.value[0].status === "A"){
        this.toShow=false;
      } else if (vehicleName === this.value[1].name && this.value[1].status === "A"){
        this.toShow=false;
      } else  if (vehicleName === this.value[2].name && this.value[2].status === "A"){
        this.toShow=false;
      } else  if (vehicleName === this.value[3].name && this.value[3].status === "A" && this.checked === true){
        this.toShow=false;
      } else  if (vehicleName === this.value[4].name && this.value[4].status === "A" && this.checked === true){
        this.toShow=false;
      } else if(vehicleName === this.value[5].name && this.value[5].status === "A" && this.checked === true){
        this.toShow=false;
      } else { this.toShow = true;}
    
   
  
  }

}
