import { Component, OnInit } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Shuttle } from '../models/shuttle.model';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { Menu } from 'primeng/menu';
import { AuthService } from 'common-component-lib';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css'],
  providers: []
})
export class BannerDetailsComponent implements OnInit {

  driverName = this.getCurrentUsername();

  date: string;
  name: string;
  isToggleDisabled: boolean;
  selectedType: string;

  items: MenuItem[] = null;

  baileyButton: SelectItem[];
  rileyButton: SelectItem[];
  baileyRentalButton: SelectItem[];
  rileyRentalButton: SelectItem[];

  possibleVehicles: Shuttle[] = [];
  selectedVehicle: Shuttle;
  baileyVehicle: Shuttle;
  baileyRentalVehicle: Shuttle;
  isShuttleActive: boolean;

  constructor(public gpsService: GPSService, public shuttleService: ShuttleService, public shuttleApi: ShuttleApiService,
              private authService: AuthService) {}

  getCurrentUsername() {
    return this.authService.getName();
  }

  changeToggle() {
    if (!this.isShuttleActive) {
      this.shuttleService.isAccordionDisabled = true;
      this.gpsService.stop();
      this.selectedVehicle.status = 'I';
    } else {
      this.shuttleService.isAccordionDisabled = false;
      this.gpsService.startGPSTracking();
      this.selectedVehicle.status = 'A';
    }
 }


  pressToggle() {
    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleId);
    this.changeToggle();
  }

  ngOnInit() {
    this.isToggleDisabled = true;
    this.date = this.shuttleService.getDate();
    this.isShuttleActive = false;

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
      this.baileyButton = [
        { label: this.baileyVehicle.name, value: 'BAILEY' }
      ],
      this.baileyRentalButton = [
        { label: this.baileyRentalVehicle.name, value: 'BAILEY RENTAL' }
      ];
    });
  }

  openMenu(menu: Menu, event, ) {
    if (menu.visible) {
      menu.hide();
    } else {
      this.items = [
        { label: 'Logout', icon: 'pi pi-sign-out', routerLink: ['/login'] },
      ];
      menu.show(event);
    }
  }


  changeSelectedVehicle(name: string) {
    this.isToggleDisabled = false;
    this.gpsService.stopGPSTracking();

    if (name === 'BAILEY') {
      this.selectedVehicle = this.baileyVehicle;
    }
    if (name === 'BAILEY RENTAL') {
      this.selectedVehicle = this.baileyRentalVehicle;
    }
    this.gpsService.setTrackingVehicle(this.selectedVehicle.vehicleId);
    this.shuttleService.getDayInfo(this.date, this.selectedVehicle.vehicleId);
    this.handleShuttleStatus();
  }

  handleShuttleStatus() {
    if (this.selectedVehicle.status === 'A') {
      this.shuttleService.isAccordionDisabled = false;
      this.gpsService.handleAlreadyActive(this.selectedVehicle);
      this.isShuttleActive = true;
    } else {
      this.shuttleService.isAccordionDisabled = true;
      this.isShuttleActive = false;
    }
    this.shuttleService.endOfDay = false;
   }
}
