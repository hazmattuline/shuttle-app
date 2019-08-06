import { Component, OnInit} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';

@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: []

})


export class StartshiftComponent implements OnInit {
  comments: string = '';
  condition: string = 'GOOD';
  goodButton: SelectItem[];
  fairButton: SelectItem[];
  poorButton: SelectItem[];
  date: string;
  isCommentDisabled = true;
  mileage: number;
  vehicleId: number;

  constructor(private messageService: MessageService,
    private fb: FormBuilder, private gpsService: GPSService, public shuttleService: ShuttleService) {

  this.goodButton = [
    {label: 'Good', value: 'GOOD'}
    ],

    this.fairButton = [
      {label: 'Fair', value: 'FAIR'}
    ],

    this.poorButton = [
      {label: 'Poor', value: 'POOR'}
    ];
}

good: SelectItem[];
fair: SelectItem[];
poor: SelectItem[];


wholeNumCount;
decimalNumCount;

getDate() {
  this.date = this.shuttleService.getDate();
  }

ngOnInit() {
  this.getDate();

 }

submitStartData() {

  const stringRepMile = this.mileage.toString();
  this.wholeNumCount = this.mileage.toString().length;
  

  for (const char of stringRepMile) {
    if (char === '.') {
      const splitMileage = this.mileage.toString().split('.');
      const mileageArray = splitMileage.map(Number);
      this.wholeNumCount = mileageArray[0].toString().length;
      this.decimalNumCount = mileageArray[1].toString().length;
    }
  }
  if (this.wholeNumCount > 10 || this.decimalNumCount > 3) {
    this.messageService.add({severity: 'error', summary: 'Mileage', detail: 'Too many digits, Try again'});
    this.decimalNumCount = null;
  } else {
  this.vehicleId = this.gpsService.getShuttleId();

  this.messageService.add({severity: 'success', summary: 'Success', detail: 'Saved Successfully'});

  this.shuttleService.createStartInfo(this.vehicleId, this.mileage, this.condition, this.date, this.comments, this.isCommentDisabled);
}
}
verify(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}


}






