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
  comments = '';
  condition = 'GOOD';
  goodButton: SelectItem[];
  fairButton: SelectItem[];
  poorButton: SelectItem[];
  date: string;
  isCommentDisabled = true;
  mileage: number;
  vehicleId: number;
  wholeNumCount;
  decimalNumCount;

  constructor(private messageService: MessageService, private gpsService: GPSService, public shuttleService: ShuttleService) {

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



ngOnInit() {
  this.date = this.shuttleService.getDate();
 }

submitStartData() {

  let currentStrRep = '';

  // digits allowed for decimal and whole number
  const totalDigitBounds = [10];
  const decimalDigitBounds = [3];
  const fieldNames = ['Mileage'];

  // to use to display error message later
  let isFieldTooManyDigits = false;

  const stringReps = [this.mileage.toString()];

  // nested loop to iterate over the fields
  for (let i = 0; i < 1; i++) {
  let isBeforeDecimal = true;
  let numberBeforeDecimal = 0;
  let numberAfterDecimal = 0;
  currentStrRep = stringReps[i];

  for (const char of currentStrRep) {
    if (char === '.') {
      isBeforeDecimal = false;
    } else if (isBeforeDecimal) {
        numberBeforeDecimal++;
    } else {
        numberAfterDecimal++;
    }
  }
  if (numberBeforeDecimal + numberAfterDecimal > totalDigitBounds[i] || numberAfterDecimal > decimalDigitBounds[i] || numberBeforeDecimal > 7) {
      isFieldTooManyDigits = true;
      this.messageService.add({severity: 'error', summary: fieldNames[i], detail: 'Too many digits, Try again'});
      if (fieldNames[i] === 'Mileage') {
          this.mileage = null;
      }
      }
    }


  if (!isFieldTooManyDigits) {
  this.vehicleId = this.gpsService.getShuttleId();
  this.shuttleService.createStartInfo(this.vehicleId, this.mileage, this.condition, this.date, this.comments, this.isCommentDisabled);
  this.messageService.add({severity: 'success', summary: 'Success', detail: 'Saved Successfully'});
}
}


verifyCommentAvailability(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}


}






