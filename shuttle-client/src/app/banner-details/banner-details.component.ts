import { Component, OnInit } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Shuttle } from '../models/shuttle.model';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { Menu } from 'primeng/menu';
import { DriverComponent } from '../driver/driver.component';
import { AuthService } from 'common-component-lib';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: []
})
export class BannerDetailsComponent implements OnInit {

  constructor(public gpsService: GPSService, public shuttleService: ShuttleService, public shuttleApi: ShuttleApiService,
              private authService: AuthService) {}

  driverName = this.getCurrentUsername();

  date: string;
  name: string;
  toShow: boolean;
  toggleBoolean: boolean;
  selectedType: string;

  items: MenuItem[] = null;

  bailey: SelectItem[];
  riley: SelectItem[];
  baileyRental: SelectItem[];
  rileyRental: SelectItem[];

  possibleVehicles: Shuttle[] = [];
  selectedVehicle: Shuttle;
  baileyVehicle: Shuttle;
  baileyRentalVehicle: Shuttle;
  isAlreadyActive: boolean;

  getCurrentUsername() {
    return this.authService.getName();

  }

  changeActive() {
    if (!this.isAlreadyActive) {
      this.shuttleService.disabled = true;

      this.gpsService.stop();
      this.selectedVehicle.status = 'I';
    } else {
      this.shuttleService.disabled = false;
      this.gpsService.startGPSTracking();
      this.selectedVehicle.status = 'A';
    }
 }


  submit() {
          this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);
             this.changeActive();
          }


  

  ngOnInit() {
    this.toggleBoolean = true;
    this.getDate();
    this.isAlreadyActive = false;

    this.shuttleApi.getVehicleOptions().subscribe(vehicles => {
      this.possibleVehicles = vehicles;

      for (const vehicle of this.possibleVehicles) {
        if (vehicle.name === 'BAILEY') {
          this.baileyVehicle = vehicle;
        }
        if (vehicle.name === 'BAILEY RENTAL') {
          this.baileyRentalVehicle = vehicle;
        }
      }
      this.bailey = [
        { label: this.baileyVehicle.name, value: 'BAILEY' }
      ],

      this.baileyRental = [
        { label: this.baileyRentalVehicle.name, value: 'BAILEY RENTAL' }
      ];
    });

  }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

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

    this.toggleBoolean = false;
    this.gpsService.stopGPSTracking();
    
    if (name === 'BAILEY') {
      this.selectedVehicle = this.baileyVehicle;
    }
    if (name === 'BAILEY RENTAL') {
      this.selectedVehicle = this.baileyRentalVehicle;
    }


    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleID);

    this.shuttleService.getDayInfo(this.date, this.selectedVehicle.vehicleID);
    this.verify();


  }

  verify() {

    if (this.selectedVehicle.status === 'A') {
      this.shuttleService.disabled = false;

      this.gpsService.handleAlreadyActive(this.selectedVehicle);
      this.isAlreadyActive = true;
      this.toShow = true;
    } else {
      this.shuttleService.disabled = true;

      this.isAlreadyActive = false;

      this.toShow = true;
    }

   }

}
