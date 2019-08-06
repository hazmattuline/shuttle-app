import { Component, OnInit } from '@angular/core';
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
export class DriverComponent implements OnInit {
  routerSubscription: Subscription;
  constructor(public gpsService: GPSService, public shuttleService: ShuttleService, private authService: AuthService) { }

ngOnInit() {
}

getCurrentUsername() {
  return this.authService.getName();
}

}
