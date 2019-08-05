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

getDate() {
  this.date = this.shuttleService.getDate();
  }

ngOnInit() {
  this.getDate();
 }

submitStartData(info: string) {
  this.vehicleId = this.gpsService.getShuttleId();
  this.messageService.add({severity: info, summary: 'Success', detail: 'Saved Successfully'});
  this.shuttleService.createStartInfo(this.vehicleId, this.mileage, this.condition, this.date, this.comments, this.isCommentDisabled);
}
verify(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}


}






