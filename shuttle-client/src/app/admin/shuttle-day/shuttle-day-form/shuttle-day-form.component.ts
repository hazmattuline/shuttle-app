import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { BaseComponent } from 'src/app/core/base/base.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shuttle-day-form',
  templateUrl: './shuttle-day-form.component.html',
  styleUrls: ['./shuttle-day-form.component.css']
})
export class ShuttleDayFormComponent extends BaseComponent implements OnInit {

  shuttleDayFrom: FormGroup;
  
  constructor() { 

    super();

  }

  ngOnInit() {
  }

  initializeForm(shuttleDay?: Day): void {
    // Common initialization
    // this.appRoleForm.reset();
    // this.appRoleForm.enable();
    // this.members = [];
    // this.setSelectedMembers([]);
    // this.setPersonValidity(true);

    // // Initialize edit form based on existence of an app role
    // if (appRole) {
    //   this.initializeEditForm(appRole);
    // }
  }

}
