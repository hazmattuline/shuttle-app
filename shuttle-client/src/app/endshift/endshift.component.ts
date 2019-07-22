import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
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

constructor(private fb: FormBuilder, public shuttleService: ShuttleService, private gpsService: GPSService) {

  this.good = [
    {label: 'Good', value: 'GOOD'}

    ],

    this.fair = [
      {label: 'Fair', value: 'FAIR'}
    ],

    this.bad = [

      {label: 'Bad', value: 'BAD'}
    ];

  this.driverOptions = [
    {label: 'Select', value: null},
    {label: 'Nadia Almanza', value: {id: 1}},
    {label: 'Donna Caputo', value: {id: 2}},
    {label: 'Ariel Gauslow', value: {id: 3}},
    {label: 'Heather Iwinski', value: {id: 4}},
    {label: 'Melissa Zaugra', value: {id: 5}},
  ];
  
  this.conditionOptions = [
    {label: 'Select', value: null},
    {label: 'Good', value: {id: "GOOD"}},
    {label: 'Fair', value: {id: "FAIR"}},
    {label: 'Poor', value: {id: "POOR"}},
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

driver: number;
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

 getVehicles() {
  this.shuttleService.vehicleOptions();
  }

ngOnInit() {
  this.setupForm();
  this.getVehicles();
  this.getDate();
 }

private setupForm() {
  this.endShiftForm = this.fb.group({
    driver: '',
    vehicle: '',
    mileage: '',
    condition: '',
    quantity: '',
    cost: ''
  });
}

submitEndData() {
  const shiftValue = this.endShiftForm.value;
  this.shuttleService.createEndInfo(this.driver, this.vehicleId, this.mileage, this.condition, this.quantity, this.cost, this.date);
  this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.comment);
  this.showShift.emit(false);

}
}




