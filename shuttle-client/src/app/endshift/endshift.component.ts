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
  condition: string = 'GOOD';
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
  endShift: DriverComponent;
  driverOptions: SelectItem[];
  conditionOptions: SelectItem[];
  endShiftForm: FormGroup;
  date: string;

  @Output()
  showShift = new EventEmitter<boolean>();

  getDate() {
    this.date = this.shuttleService.getDate();
  }


ngOnInit() {
  this.setupForm();
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

  this.shuttleService.createEndInfo(this.vehicleId, this.mileage, this.condition, 
    this.quantity, this.cost, this.date, this.comment, this.isCommentDisabled);
}

verify(status: string) {
  if (status === 'fair' || status === 'poor') {
  this.isCommentDisabled = false;
} else {
  this.isCommentDisabled = true;
}
}
}




