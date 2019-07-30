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

constructor(private fb: FormBuilder, public shuttleService: ShuttleService, private gpsService: GPSService, private messageService: MessageService) {

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


  @Input()
  endShift: DriverComponent;
  driverOptions: SelectItem[];
  conditionOptions: SelectItem[];
  endShiftForm: FormGroup;
  date: string;

  condition: string;
good: SelectItem[];
fair: SelectItem[];
bad: SelectItem[];

mileage: number;
vehicleId: number;
quantity: number;
cost: number;
comment: string;

  @Output()
  showShift = new EventEmitter<boolean>();

  getDate() {
    this.date = this.shuttleService.getDate();
  }

//  getVehicles() {
//   this.shuttleService.vehicleOptions();
//   }

ngOnInit() {
  this.setupForm();
 // this.getVehicles();
  this.getDate();
 }

private setupForm() {
  this.endShiftForm = this.fb.group({
    vehicle: '',
    mileage: '',
    condition: '',
    quantity: '',
    cost: ''
  });
}

submitEndData(info: string) {
  this.vehicleId = this.gpsService.getShuttleId();

  this.messageService.add({severity: info, summary: 'Success', detail: 'Saved Successfully'});

  this.shuttleService.createEndInfo(this.vehicleId, this.mileage, this.condition, this.quantity, this.cost, this.date);
  this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.comment);

}
}




