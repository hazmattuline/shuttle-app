import { Component, OnInit, OnDestroy} from '@angular/core';
import {SelectItem, MessageService} from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-endshift',
  templateUrl: './endshift.component.html',
  styleUrls: ['./endshift.component.css'],
  providers: []

})

export class EndshiftComponent implements OnInit, OnDestroy {
  condition = 'GOOD';
  vehicleId: number;
  date: string;
  endOfDayForm: FormGroup;
  conditions: SelectItem[];
  conditionSubscription: Subscription;

  constructor(private fb: FormBuilder, public shuttleService: ShuttleService,
              private gpsService: GPSService, private messageService: MessageService) {

      this.conditions = [
        {label: 'Good', value: 'GOOD'},
        {label: 'Fair', value: 'FAIR'},
        {label: 'Poor', value: 'POOR'}
        ];
}

private setupConditionListener() {
  if (this.endOfDayForm) {
    this.conditionSubscription = this.endOfDayForm.get('condition').valueChanges.subscribe(value => {
      if (value === 'GOOD') {
        this.endOfDayForm.get('comments').disable();
      } else {
        this.endOfDayForm.get('comments').enable();
      }
    });
  }
}

ngOnInit() {
  this.date = this.shuttleService.getDate();
  this.endOfDayForm = this.fb.group({
    gallons: ['', [Validators.required, Validators.max(2147483640)]],
    cost: ['', [Validators.required, Validators.max(2147483640)]],
    mileage: ['', [Validators.required, Validators.max(2147483640)]],
    condition: [this.condition, Validators.required],
    comments: [{value: '', disabled: true}, [Validators.maxLength(2000)]]
  });
  this.setupConditionListener();
 }

  submitEndData() {

    if (this.endOfDayForm.errors) {
      this.messageService.add({ severity: 'error', summary: 'There are errors with the form, please review', detail: 'Too many digits, Try again' });
    } else {
      this.vehicleId = this.gpsService.getShuttleId();
      this.shuttleService.createEndInfo(this.vehicleId,
        this.endOfDayForm.get('mileage').value,
        this.endOfDayForm.get('condition').value,
        this.endOfDayForm.get('gallons').value,
        this.endOfDayForm.get('cost').value,
        this.date,
        this.endOfDayForm.get('comments').value,
        this.endOfDayForm.get('comments').disabled).subscribe(comment => {
          if (!this.endOfDayForm.get('comments').disabled) {
            this.shuttleService.createCommentInfo(this.vehicleId, this.date, this.endOfDayForm.get('comments').value);
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully' });
        }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred' }));
    }
    if(this.shuttleService.isShuttleActive) {
      this.shuttleService.isShuttleActive = false;
      this.gpsService.stop();
    }
  }

 public ngOnDestroy(): void {
  if (this.conditionSubscription) {
    this.conditionSubscription.unsubscribe();
  }
 }


}


