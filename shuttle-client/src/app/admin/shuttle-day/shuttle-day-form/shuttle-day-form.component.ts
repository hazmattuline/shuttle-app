import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { BaseComponent } from 'src/app/core/base/base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StagedEntity } from 'src/app/models/staged-entity';

@Component({
  selector: 'app-shuttle-day-form',
  templateUrl: './shuttle-day-form.component.html',
  styleUrls: ['./shuttle-day-form.component.css']
})
export class ShuttleDayFormComponent extends BaseComponent implements OnInit {

  shuttleDayForm: FormGroup;
  

  @Output() saveClick = new EventEmitter<StagedEntity<Day>>();
  @Output() cancelClick = new EventEmitter();

  constructor(private fb: FormBuilder) { 

    super();

    this.shuttleDayForm = this.fb.group({
      vehicleId: [''],
      date: [''],
      cost: [''],
      gallons: [''],
      startMileage: [''],
      endMileage: [''],
      requestNotes: ['']
    });

  }

  ngOnInit() {
  }

  initializeForm(shuttleDay?: Day): void {
    //Common initialization
    this.shuttleDayForm.reset();
    this.shuttleDayForm.enable();

    // Initialize edit form based on existence of an app role
    if (shuttleDay) {
      this.initializeEditForm(shuttleDay);
    }
  }

  private initializeEditForm(shuttleDay: Day) {
    this.shuttleDayForm.patchValue({
      vehicleId: shuttleDay.vehicleId,
      date: shuttleDay.date,
      cost: shuttleDay.fuelCost,
      gallons: shuttleDay.fuelQuantity,
      startMileage: shuttleDay.startMileage,
      endMileage: shuttleDay.endMileage
    });


    this.shuttleDayForm.controls.vehicleId.disable();
    this.shuttleDayForm.controls.date.disable();

  }

  onCancelClick() {
    this.cancelClick.emit('');
  }

  onSaveClick() {
    const shuttleDay = this.createShuttleDayFromForm();
    this.saveClick.emit(shuttleDay);
  }


  private createShuttleDayFromForm(): StagedEntity<Day> {
    const shuttleDay: Day = {
    vehicleId : this.shuttleDayForm.controls.vehicleId.value,
    date : this.shuttleDayForm.controls.date.value,
    fuelCost : this.shuttleDayForm.controls.cost.value,
    fuelQuantity : this.shuttleDayForm.controls.gallons.value,
    startMileage : this.shuttleDayForm.controls.startMileage.value,
    endMileage : this.shuttleDayForm.controls.endMileage.value
    };

    const stagedEntity = new StagedEntity<Day>();
    stagedEntity.entity = shuttleDay;
    stagedEntity.requestNotes = this.shuttleDayForm.controls.requestNotes.value;
    return stagedEntity;
  }

}
