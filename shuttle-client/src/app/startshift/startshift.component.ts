import { Component, OnInit, OnDestroy} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';
import { Subscription } from 'rxjs';

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

  constructor(private fb: FormBuilder, private messageService: MessageService, private gpsService: GPSService, public shuttleService: ShuttleService) {

    this.conditions = [
      {label: 'Good', value: 'GOOD'},
      {label: 'Fair', value: 'FAIR'},
      {label: 'Poor', value: 'POOR'}
      ];
}

private setupConditionListener() {
  console.log("listener");
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
    this.messageService.add({ severity: 'error', summary: 'There are errors with the form, please review', detail: 'Too many digits, Try again' });
  } else {
  this.vehicleId = this.gpsService.getShuttleId();
  this.shuttleService.createStartInfo(this.vehicleId, this.beginningOfDayForm.get('mileage').value, 
  this.beginningOfDayForm.get('condition').value, this.date, this.beginningOfDayForm.get('comments').value, 
  this.beginningOfDayForm.get('comments').disabled)
  .subscribe(comment => {
    if (!this.beginningOfDayForm.get('comments').disabled) {
      this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.beginningOfDayForm.get('comments').value);
    }
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Saved Successfully'});

  } , err => {this.messageService.add({severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred'});
} );
}
}

public ngOnDestroy(): void {
  if (this.conditionSubscription) {
    this.conditionSubscription.unsubscribe();
  }
 }


}






