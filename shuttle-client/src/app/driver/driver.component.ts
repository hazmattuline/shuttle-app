import { Component, OnInit, OnDestroy } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'common-component-lib';

@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [GPSService, ShuttleService]
    })
export class DriverComponent implements OnInit, OnDestroy {
  showDriverShift = true;
  currentUsername: string;
  routerSubscription: Subscription;
  constructor(public gpsService: GPSService, public shuttleService: ShuttleService, private authService: AuthService) { }

ngOnInit() {
}

getCurrentUsername() {
  return this.authService.getName();
}

changeActive() {
    if (this.gpsService.getIsGPSActive()) {
      this.gpsService.stopGPSTracking();
    } else {
      this.gpsService.startGPSTracking();
    }
  }

  getShowShift(showShift: boolean) {
    this.showDriverShift = showShift;
  }

  ngOnDestroy() {
    if(this.gpsService.getShuttleId() === null) {
      return;
    }else {
    this.gpsService.stop();
    }
  }

}
