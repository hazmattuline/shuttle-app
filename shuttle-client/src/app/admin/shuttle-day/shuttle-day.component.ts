import { Component, OnInit, ViewChild } from '@angular/core';
import { ShuttleDayFormComponent } from './shuttle-day-form/shuttle-day-form.component';
import { Day } from 'src/app/models/day.model';
import { MaintenanceComponent } from 'src/app/core/base/maintenance.component';
import { MessageService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { StagedRequestService } from 'src/app/services/staged-request.service';
import { StagedEntity } from 'src/app/models/staged-entity';
import { StagedRequest } from 'src/app/models/staged-request.model';
import { ShuttleService } from 'src/app/services/shuttle.service';
import { ShuttleApiService } from 'src/app/services/shuttle-api.service';

@Component({
  selector: 'app-shuttle-day',
  templateUrl: './shuttle-day.component.html',
  styleUrls: ['./shuttle-day.component.css']
})
export class ShuttleDayComponent extends MaintenanceComponent implements OnInit {

  // value cannot be changed 
  readonly ADD_SHUTTLE_DAY_HEADER= 'Add App Role';
  readonly UPDATE_SHUTTLE_DAY_HEADER = 'Update App Role';



  @ViewChild('shuttleDayForm')
  shuttleDayForm: ShuttleDayFormComponent;

  shuttleDayList: Day[] = [];
  isLoading: boolean;
  selectedShuttleDay: Day;
  shuttleDayDialogHeader: string;
  displayShuttleDayDialog: boolean;
  menuItems: MenuItem[] = [];


  // private stagedRequestService: StagedRequestService
  constructor(private shuttleApiService: ShuttleApiService,messageService: MessageService) {
    super(messageService);
  }


  ngOnInit() {
    this.isLoading = true;
    this.shuttleApiService.getAllAppRoles().pipe(takeUntil(this.destroy$))
      .subscribe(
        appRoles => {
          this.isLoading = false;
          this.appRoles = appRoles;
          this.appRoles.forEach(appRole => {
            appRole.personWindowsIds = appRole.persons ? appRole.persons.map(person => person.windowsId).join(', ') : '';
          });
        },
        error => {
          this.isLoading = false;
          // TODO: Implement standard table error message once determined
          console.log(error);
        }
      );
  }


  onAddShuttleDayClick() {
    // shows modal of shuttle-day component
    this.shuttleDayForm.initializeForm();
    this.selectedShuttleDay = null;

    // for showing the dialog in modal
    this.shuttleDayDialogHeader = this.ADD_SHUTTLE_DAY_HEADER;
    this.displayShuttleDayDialog = true;
  }

  openMenu(menu: Menu, event, shuttleDay: Day) {
    if (menu.visible) {
      menu.hide();
    } else {
      this.selectedShuttleDay = shuttleDay;
      this.menuItems = [
        { label: 'Edit', icon: 'fa fa-pencil', command: () => { this.onEditRowClick(); } }
      ];
      menu.show(event);
    }
  }


  onEditRowClick() {
    this.shuttleDayForm.initializeForm(this.selectedShuttleDay);
    this.shuttleDayDialogHeader = this.ADD_SHUTTLE_DAY_HEADER;
    this.displayShuttleDayDialog = true;
  }

  onShuttleDayCancelClick() {
    this.displayShuttleDayDialog = false;
  }


  onShuttleDaySaveClick(stagedReason: StagedEntity<Day>) {
    const stagedRequest = new StagedRequest();
    stagedRequest.stagedRequestText = stagedReason.requestNotes;

    //implement rest call


    // if (this.selectedShuttleDay) {
    //   stagedRequest.stagedJson = JSON.stringify(this.createShuttleDayRequest(stagedReason.entity));
    //   this.handleStagedRequestCreation(this.stagedRequestService.updateAppRole(stagedRequest, this.selectedAppRole.id),
    //     this.appRoleDialogErrorHandler);
    // } else {
    //   stagedRequest.stagedJson = JSON.stringify(this.createAppRoleRequest(stagedReason.entity));
    //   this.handleStagedRequestCreation(this.stagedRequestService.addAppRole(stagedRequest), this.appRoleDialogErrorHandler);
    // }

    this.displayShuttleDayDialog = false;
  }


}
