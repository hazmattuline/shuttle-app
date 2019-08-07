import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import {InputTextModule} from 'primeng/inputtext';
import { GPSService } from '../services/gps.service';


@Component({
  selector: 'app-endshift',
  templateUrl: './endshift.component.html',
  styleUrls: ['./endshift.component.css'],
  providers: []

})

export class EndshiftComponent implements OnInit {
  condition = 'GOOD';
  goodButton: SelectItem[];
  fairButton: SelectItem[];
  poorButton: SelectItem[];
  mileage: number;
  vehicleId: number;
  quantity: number;
  cost: number;
  comment: string;
  isCommentDisabled = true;
  date: string;

  wholeNumCount;
  decimalNumCount;
  wholeGalCount;
  decimalGalCount;
  wholeCostCount;
  decimalCostCount;

  constructor(private fb: FormBuilder, public shuttleService: ShuttleService,
              private gpsService: GPSService, private messageService: MessageService) {

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

submitEndData() {

let currentStrRep = '';

// digits allowed for decimal and whole number
const totalDigitBounds = [10, 10, 17];
const decimalDigitBounds = [3, 3, 4];
const fieldNames = ['Mileage', 'Gallons', 'Cost'];

// to use to display error message later
let isFieldTooManyDigits = false;

const stringReps = [this.mileage.toString(), this.quantity.toString(), this.cost.toString()];

// nested loop to iterate over the fields 
for (let i = 0; i < 3; i++) {
  let isBeforeDecimal = true;
  let numberBeforeDecimal = 0;
  let numberAfterDecimal = 0;
  currentStrRep = stringReps[i];

  for (const char of currentStrRep) {
    if (char === '.') {
      isBeforeDecimal = false;
    }
    else if (isBeforeDecimal) {
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
      } else if (fieldNames[i] === 'Gallons') {
          this.quantity = null;
      } else {
          this.cost = null;
      }
    }
}

if (!isFieldTooManyDigits) {
  this.vehicleId = this.gpsService.getShuttleId();
  this.shuttleService.createEndInfo(this.vehicleId, this.mileage, this.condition,
  this.quantity, this.cost, this.date, this.comment, this.isCommentDisabled).subscribe(comment => {
    if (!this.isCommentDisabled) {
    this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.comment);
    }

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Saved Successfully'});

  } , err => {this.messageService.add({severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred'});
} );
}
this.shuttleService.isShuttleActive = false;
this.gpsService.stop();


}




verifyCommentAvailability(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}



}

