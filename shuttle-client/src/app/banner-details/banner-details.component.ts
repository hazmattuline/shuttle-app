import { Component, OnInit } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Shuttle } from '../models/shuttle.model';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { Menu } from 'primeng/menu';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: []
})
export class BannerDetailsComponent implements OnInit {

  constructor(public gpsService: GPSService, public shuttleService: ShuttleService, public shuttleApi: ShuttleApiService) {}

  driverName = 'Rob Kenlay';
  // toggle: FormGroup;

  date: string;
  name: string;
  toShow: boolean;

  selectedType: string;

  items: MenuItem[] = null;

  bailey: SelectItem[];
  riley: SelectItem[];
  baileyRental: SelectItem[];
  rileyRental: SelectItem[];

  possibleVehicles: Shuttle[] = [];
  selectedVehicle: Shuttle;
  isAlreadyActive: boolean;

  changeActive() {
    console.log("change active");

    if (!this.isAlreadyActive) {
      console.log("change to inactive " + this.isAlreadyActive);
      this.gpsService.stopGPSTracking();
      this.selectedVehicle.status = 'I';
      //this.isAlreadyActive = false;
    } else {
      console.log("change to active " + this.isAlreadyActive);
      this.gpsService.startGPSTracking();
      this.selectedVehicle.status = 'A';
      //this.isAlreadyActive = true;
    }
    console.log(this.isAlreadyActive);
  }


  submit() {
    console.log("submit");
    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);
  }

  ngOnInit() {
    this.getDate();
    this.isAlreadyActive = false;
    //this.setupForm();

    this.shuttleApi.getVehicleOptions().subscribe(vehicles => {
      this.possibleVehicles = vehicles;
      console.log(this.possibleVehicles);

      this.bailey = [
        { label: this.possibleVehicles[0].name, value: 'BAILEY' }
      ],

      this.baileyRental = [
        { label: this.possibleVehicles[3].name, value: 'BAILEY RENTAL' }
      ]; 
    });

  }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

  // private setupForm() {
  //   this.toggle = this.fb.group({
  //     isAlreadyActive: '',
  //   });
  // }



  openMenu(menu: Menu, event, ) {
    if (menu.visible) {
      menu.hide();
    } else {
      this.items = [
        { label: 'Logout', icon: 'pi pi-sign-out', routerLink: [''] },
      ];
      menu.show(event);
    }
  }


  selected(name: string) {

    this.shuttleApi.getVehicleOptions().subscribe(vehicles => { this.possibleVehicles = vehicles; });

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

    console.log("verify  " + this.isAlreadyActive);


  }

}
