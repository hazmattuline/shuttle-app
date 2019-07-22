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
  count = 0;
  inputComment;
  timeToStart: boolean;
  isActive = false;
  showDriverShift = true;

  //info: DriverInfo[];
  passengerInputs: SelectItem[];
  curbInputs: SelectItem[];
  //passengerInput: DriverInput;
  //curbInput: DriverInput;
  date: string;
  dayDetailForm: FormGroup;
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, public gpsService: GPSService, private shuttleService: ShuttleService) {
    this.passengerInputs = [
      { label: 'Select', value: null },
      { label: '0', value: { id: 1 } },
      { label: '1', value: { id: 2 } },
      { label: '2', value: { id: 3 } },
      { label: '3', value: { id: 4 } },
      { label: '4', value: { id: 5 } },
      { label: '5', value: { id: 6 } },
      { label: '6', value: { id: 7 } },
      { label: '7', value: { id: 8 } },
      { label: '8', value: { id: 9 } },
      { label: '9', value: { id: 10 } },
      { label: '10', value: { id: 11 } },
      { label: '11', value: { id: 12 } },
      { label: '12', value: { id: 13 } },
      { label: '13', value: { id: 14 } },
      { label: '14', value: { id: 15 } },
    ];

    this.curbInputs = [
      { label: 'Select', value: null },
      { label: '0', value: { id: 1 } },
      { label: '1', value: { id: 2 } },
      { label: '2', value: { id: 3 } },
      { label: '3', value: { id: 4 } },
      { label: '4', value: { id: 5 } },
    ];
  }
  getDate() {
    this.date = this.shuttleService.getDate();
  }
ngOnInit() {
  this.getDate();
  this.setupForms();
  }

changeActive() {
    if (this.gpsService.getIsGPSActive()) {
      this.gpsService.stopGPSTracking();
    } else {
      this.gpsService.startGPSTracking();
    }
  }

private setupForms() {
  this.dayDetailForm = this.fb.group({
    passengerInputs: '',
    vehicle: '',
    curbInputs: '',
  });
  this.commentForm = this.fb.group({
    commentMessage: '',
  });
}


  submitComment() {
    const commentValue = this.commentForm.value;
    this.shuttleService.createCommentInfo(this.gpsService.getShuttleId(), this.date, commentValue.commentMessage);
  }

  getShowShift(showShift: boolean) {
    this.showDriverShift = showShift;
  }

  ngOnDestroy() {
    this.gpsService.stop();
  }

}
// export interface DriverInfo {
//   numPassengers;
// }

// interface DriverInput {
//   numPassengers: number;
// }
