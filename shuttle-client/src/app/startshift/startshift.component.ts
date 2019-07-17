import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { DriverComponent } from '../driver/driver.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';


@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: [ShuttleService]

})


export class StartshiftComponent implements OnInit {

constructor(private fb: FormBuilder, private gpsService: GPSService, public shuttleService: ShuttleService) {
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
  startShift: DriverComponent;
  driverOptions: SelectItem[];
  vehicleOptions: SelectItem[];
  conditionOptions: SelectItem[];

  startShiftForm: FormGroup;
  date: string;

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
  this.startShiftForm = this.fb.group({
    driver: '',
    vehicle: '',
    mileage: '',
    condition: ''
  });
}

submitStartData() {
  const shiftValue = this.startShiftForm.value;
  this.shuttleService.createStartInfo(shiftValue.driver.id, shiftValue.vehicle, shiftValue.mileage, shiftValue.condition.id, this.date);
  this.gpsService.setTrackingVehicle(shiftValue.vehicle);
  console.log("choosing vehicle " + shiftValue.vehicle);
  console.log(this.gpsService.getShuttleId());
  this.showShift.emit(false);
}


}






