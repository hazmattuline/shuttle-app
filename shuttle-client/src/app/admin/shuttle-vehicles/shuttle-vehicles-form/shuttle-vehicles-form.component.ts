import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Shuttle } from 'src/app/models/shuttle.model';
import { StagedEntity } from 'src/app/models/staged-entity';

@Component({
  selector: 'app-shuttle-vehicles-form',
  templateUrl: './shuttle-vehicles-form.component.html',
  styleUrls: ['./shuttle-vehicles-form.component.css']
})
export class ShuttleVehiclesFormComponent extends BaseComponent implements OnInit {

  shuttleVehiclesForm: FormGroup;
  

  @Output() saveClick = new EventEmitter<StagedEntity<Shuttle>>();
  @Output() cancelClick = new EventEmitter();

  constructor(private fb: FormBuilder) { 

    super();

    this.shuttleVehiclesForm = this.fb.group({
      vehicleId: ['', Validators.required],
      latitudeCoordinates: [''],
      longitudeCoordinates: [''],
      status: ['', Validators.required],
      name: ['', Validators.required],
      shuttleType: ['', Validators.required],
      rentalIndicator: ['', Validators.required],
      requestNotes: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  initializeForm(shuttleVehicle?: Shuttle): void {
    //Common initialization
    this.shuttleVehiclesForm.reset();
    this.shuttleVehiclesForm.enable();

    if (shuttleVehicle) {
      this.initializeEditForm(shuttleVehicle);
    }
  }

  private initializeEditForm(shuttleVehicle: Shuttle) {
    this.shuttleVehiclesForm.patchValue({
      vehicleId : shuttleVehicle.vehicleId,
      latitudeCoordinates : shuttleVehicle.latitudeCoordinates,
      longitudeCoordinates : shuttleVehicle.longitudeCoordinates,
      status : shuttleVehicle.status,
      name : shuttleVehicle.name,
      shuttleType : shuttleVehicle.shuttleType,
      rentalIndicator : shuttleVehicle.rentalIndicator
    });


    this.shuttleVehiclesForm.controls.vehicleId.disable();

  }

  onCancelClick() {
    this.cancelClick.emit('');
  }

  onSaveClick() {
    const shuttleVehicles = this.createShuttleVehiclesFromForm();
    this.saveClick.emit(shuttleVehicles);
  }


  private createShuttleVehiclesFromForm(): StagedEntity<Shuttle> {
    const shuttleVehicle: Shuttle = {
      vehicleId : this.shuttleVehiclesForm.controls.vehicleId.value,
      latitudeCoordinates : this.shuttleVehiclesForm.controls.latitudeCoordinates.value,
      longitudeCoordinates : this.shuttleVehiclesForm.controls.longitudeCoordinates.value,
      status : this.shuttleVehiclesForm.controls.status.value,
      name : this.shuttleVehiclesForm.controls.name.value,
      shuttleType : this.shuttleVehiclesForm.controls.shuttleType.value,
      rentalIndicator : this.shuttleVehiclesForm.controls.rentalIndicator.value
    };

    const stagedEntity = new StagedEntity<Shuttle>();
    stagedEntity.entity = shuttleVehicle;
    stagedEntity.requestNotes = this.shuttleVehiclesForm.controls.requestNotes.value;
    return stagedEntity;
  }
}
