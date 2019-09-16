import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Shuttle } from 'src/app/models/shuttle.model';
import { StagedEntity } from 'src/app/models/staged-entity';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shuttle-vehicles-form',
  templateUrl: './shuttle-vehicles-form.component.html',
  styleUrls: ['./shuttle-vehicles-form.component.css']
})
export class ShuttleVehiclesFormComponent extends BaseComponent implements OnInit {

  shuttleVehiclesForm: FormGroup;
  

  @Output() saveClick = new EventEmitter<StagedEntity<Shuttle>>();
  @Output() cancelClick = new EventEmitter();

  constructor(private fb: FormBuilder, private message: MessageService) { 

    super();

    this.shuttleVehiclesForm = this.fb.group({
      status: ['', [Validators.required, Validators.max(2)]],
      name: ['', Validators.required],
      shuttleType: ['', Validators.required],
      rentalIndicator: ['', Validators.required],
      requestNotes: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  initializeForm(shuttleVehicle?: Shuttle): void {
    this.shuttleVehiclesForm.reset();
    this.shuttleVehiclesForm.enable();

    if (shuttleVehicle) {
      this.initializeEditForm(shuttleVehicle);
    }
   
  }

  private initializeEditForm(shuttleVehicle: Shuttle) {
    this.shuttleVehiclesForm.patchValue({
      status : shuttleVehicle.status,
      name : shuttleVehicle.name,
      shuttleType : shuttleVehicle.shuttleType,
      rentalIndicator : shuttleVehicle.rentalIndicator
    });


  
    this.shuttleVehiclesForm.controls.name.disable();
    this.shuttleVehiclesForm.controls.shuttleType.disable();
    this.shuttleVehiclesForm.controls.rentalIndicator.disable();




  }

  onCancelClick() {
    this.cancelClick.emit('');
  }

  onSaveClick() {
    const status = this.shuttleVehiclesForm.controls.status.value;
    const type = this.shuttleVehiclesForm.controls.shuttleType.value;
    const indicator = this.shuttleVehiclesForm.controls.rentalIndicator.value;

    if ( status !== 'A' && status !== 'I' || type !== 'VAN' && type !== 'CAR' || indicator !== 'N' && indicator !== 'Y') {

      this.message.add({key: 'adminToast', severity: 'error', detail: 'Please Check Fields', sticky: false});

    }

    else {  
      const shuttleVehicles = this.createShuttleVehiclesFromForm();
      this.saveClick.emit(shuttleVehicles);
    }
 
  }


  private createShuttleVehiclesFromForm(): StagedEntity<Shuttle> {

    const shuttleVehicle: Shuttle = {
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
