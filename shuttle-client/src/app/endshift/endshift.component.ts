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
  providers: [ShuttleService]

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


@Input()

date: string;

good: SelectItem[];
fair: SelectItem[];
poor: SelectItem[];

wholeNumCount;
decimalNumCount;
wholeGalCount;
decimalGalCount;
wholeCostCount;
decimalCostCount;

  @Output()
  showShift = new EventEmitter<boolean>();

  getDate() {
    this.date = this.shuttleService.getDate();
  }


ngOnInit() {
  this.getDate();
 }

submitEndData() {
  const stringRepMile = this.mileage.toString();
  const stringRepGal = this.quantity.toString();
  const stringRepCost = this.cost.toString();
  this.wholeNumCount = this.mileage.toString().length;
  this.wholeGalCount = this.quantity.toString().length;
  this.wholeCostCount = this.cost.toString().length;
  let confirmation = 0;
  for (const char of stringRepMile) {
    if (char === '.') {
      const splitMileage = this.mileage.toString().split('.');
      const mileageArray = splitMileage.map(Number);
      this.wholeNumCount = mileageArray[0].toString().length;
      this.decimalNumCount = mileageArray[1].toString().length;
    }
  }
  for (const char of stringRepGal) {
    if (char === '.') {
      const splitGal = this.quantity.toString().split('.');
      const gallonArray = splitGal.map(Number);
      this.wholeGalCount = gallonArray[0].toString().length;
      this.decimalGalCount = gallonArray[1].toString().length;
    }
  }
  for (const char of stringRepCost) {
    if (char === '.') {
      const splitCost = this.cost.toString().split('.');
      const costArray = splitCost.map(Number);
      this.wholeCostCount = costArray[0].toString().length;
      this.decimalCostCount = costArray[1].toString().length;
    }
  }

  if (this.wholeNumCount > 10 || this.decimalNumCount > 3) {
    confirmation++;
    this.messageService.add({severity: 'error', summary: 'Mileage', detail: 'Too many digits, Try again'});
    this.decimalNumCount = null;
  }
  if (this.wholeGalCount > 10 || this.decimalGalCount > 3) {
    confirmation++;
    this.messageService.add({severity: 'error', summary: 'Gallon', detail: 'Too many digits, Try again'});
    this.decimalGalCount = null;
  }
  if (this.wholeCostCount > 17 || this.decimalCostCount > 4) {
    confirmation++;
    this.messageService.add({severity: 'error', summary: 'Cost', detail: 'Too many digits, Try again'});
    this.decimalCostCount = null;
  } else if (confirmation === 0) {

  this.vehicleId = this.gpsService.getShuttleId();
  this.messageService.add({severity: 'success', summary: 'Success', detail: 'Saved Successfully'});

  this.shuttleService.createEndInfo(this.vehicleId, this.mileage, this.condition,
    this.quantity, this.cost, this.date, this.comment, this.isCommentDisabled);
}
}


  verify (status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}



}

