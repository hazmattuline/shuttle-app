import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';

@Component
  ({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [GPSService, ShuttleService]
    })
export class DriverComponent implements OnInit, OnDestroy {
  showDriverShift = true;

  constructor(public gpsService: GPSService, public shuttleService: ShuttleService) { }

ngOnInit() {}

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
    this.gpsService.stop();
  }


}
