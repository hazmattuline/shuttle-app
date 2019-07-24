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

    this.bad = [
      {label: 'Bad', value: 'BAD'}
    ];
}

tempMileage: string = '';
comments: string = '';

condition: string;
good: SelectItem[];
fair: SelectItem[];
bad: SelectItem[];

date: string;

disabled = true;

driver = 1;

mileage: number;

vehicleId: number;


getDate() {
  this.date = this.shuttleService.getDate();
  }

ngOnInit() {
  this.getDate();
 }


submitComment() {
  this.shuttleService.createCommentInfo(this.gpsService.getShuttleId(), this.date, this.comments);
}

submitStartData(info: string) {
  

  this.vehicleId = this.gpsService.getShuttleId();

  this.messageService.add({severity: info, summary: 'Success', detail: 'Saved Successfully'});

  this.mileage = parseInt(this.tempMileage, 10);

  this.shuttleService.createStartInfo(this.driver, this.vehicleId, this.mileage, this.condition, this.date);

  // must submit comment after since need to access day
  this.submitComment();

}
verify(status:string){
  if (status === 'fair' || status === 'bad') {
  this.disabled = false;
} else {
  this.disabled = true;
}
}


}






