import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: []

})


export class StartshiftComponent implements OnInit {


constructor(private messageService: MessageService, private fb: FormBuilder, private gpsService: GPSService, public shuttleService: ShuttleService) {

  this.good = [
    {label: 'Good', value: 'GOOD'}
    ],

    this.fair = [
      {label: 'Fair', value: 'FAIR'}
    ],

    this.poor = [
      {label: 'Poor', value: 'POOR'}
    ];
}

comments = '';

condition = 'GOOD';
good: SelectItem[];
fair: SelectItem[];
poor: SelectItem[];

date: string;

disabled = true;

mileage: number;

vehicleId: number;

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

  this.shuttleService.createStartInfo(this.vehicleId, this.mileage, this.condition, this.date, this.comments, this.disabled);
}
}
verify(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.disabled = false;
} else {
  this.disabled = true;
}
}


}






