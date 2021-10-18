import { Component, OnInit, OnDestroy} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';
import { Subscription } from 'rxjs';
import {StartShiftService} from "../services/start-shift.service";

@Component({
  selector: 'app-startshift',
  templateUrl: './startshift.component.html',
  styleUrls: ['./startshift.component.css'],
  providers: []

})


export class StartshiftComponent implements OnInit, OnDestroy {
  condition = 'GOOD';
  conditions: SelectItem[];
  date: string;
  vehicleId: number;
  beginningOfDayForm: FormGroup;
  conditionSubscription: Subscription;

  constructor(private fb: FormBuilder, private messageService: MessageService, private gpsService: GPSService, private startShiftService: StartShiftService, public shuttleService: ShuttleService) {

    this.conditions = [
      {label: 'Good', value: 'GOOD'},
      {label: 'Fair', value: 'FAIR'},
      {label: 'Poor', value: 'POOR'}
      ];
}

private setupConditionListener() {
  if (this.beginningOfDayForm) {
    this.conditionSubscription = this.beginningOfDayForm.get('condition').valueChanges.subscribe(value => {
      if (value === 'GOOD') {
        this.beginningOfDayForm.get('comments').disable();
      } else {
        this.beginningOfDayForm.get('comments').enable();
      }
    });
  }
}

ngOnInit() {
  this.date = this.shuttleService.getDate();
  this.beginningOfDayForm = this.fb.group({
    mileage: ['', [Validators.required, Validators.max(2147483640)]],
    condition: [this.condition, Validators.required],
    comments: [{value: '', disabled: true}, [Validators.maxLength(2000)]]
  });
  this.setupConditionListener();
 }

submitStartData() {
  if (this.beginningOfDayForm.errors) {
    this.messageService.add({ key:'error', severity: 'error', summary: 'There are errors with the form, please review.', detail: 'Too many digits, Try again.' });
  } else {
  this.vehicleId = this.gpsService.getShuttleId();
  this.shuttleService.createStartInfo(this.vehicleId, this.beginningOfDayForm.get('mileage').value,
  this.beginningOfDayForm.get('condition').value, this.date, this.beginningOfDayForm.get('comments').value,
  this.beginningOfDayForm.get('comments').disabled)
  .subscribe(comment => {
    if (!this.beginningOfDayForm.get('comments').disabled) {
      this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.beginningOfDayForm.get('comments').value);
    }
    this.messageService.add({ key:'success', severity: 'success', summary: 'Success', detail: 'Saved Successfully.'});
    this.startShiftService.saveStartShiftDate(this.vehicleId)
    this.shuttleService.setActiveIndex(1);
  });
}
}

public ngOnDestroy(): void {
  if (this.conditionSubscription) {
    this.conditionSubscription.unsubscribe();
  }
 }


}






