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
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shuttle-day',
  templateUrl: './shuttle-day.component.html',
  styleUrls: ['./shuttle-day.component.css'],
  providers: [ShuttleService]

})
export class ShuttleDayComponent extends MaintenanceComponent implements OnInit {

  // value cannot be changed 
  readonly ADD_SHUTTLE_DAY_HEADER= 'Add Shuttle Day Record';
  readonly UPDATE_SHUTTLE_DAY_HEADER = 'Update Shuttle Day Record';



  @ViewChild('shuttleDayForm')
  shuttleDayForm: ShuttleDayFormComponent;

  shuttleDayList: Day[] = [];
  isLoading: boolean;
  selectedShuttleDay: Day;
  shuttleDayDialogHeader: string;
  displayShuttleDayDialog: boolean;
  menuItems: MenuItem[] = [];
  date: string;

  constructor( private shuttleService: ShuttleService, private shuttleApiService: ShuttleApiService, messageService: MessageService, 
    private stagedRequestService: StagedRequestService ) {

    super(messageService);

  }


  ngOnInit() {
    this.isLoading = true;
    this.shuttleApiService.getDayInfo('none', 0).pipe(takeUntil(this.destroy$))
      .subscribe(
        shuttleDay => {
          console.log(shuttleDay);
          this.isLoading = false;
          this.shuttleDayList = shuttleDay;
        },
        // this.shuttleDayList.forEach(shuttleDay => {
        //   shuttleDay. = appRole.persons ? appRole.persons.map(person => person.windowsId).join(', ') : '';
        // });
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

    if (this.selectedShuttleDay) {
      stagedRequest.stagedJson = JSON.stringify(this.createShuttleDayRequest(stagedReason.entity));
      this.handleStagedRequestCreation(this.stagedRequestService.updateShuttleDay(stagedRequest, this.selectedShuttleDay.vehicleId, this.selectedShuttleDay.date),
        this.shuttleDayDialogErrorHandler);
    } else {
      stagedRequest.stagedJson = JSON.stringify(this.createShuttleDayRequest(stagedReason.entity));
      this.handleStagedRequestCreation(this.stagedRequestService.addShuttleDay(stagedRequest), this.shuttleDayDialogErrorHandler);
    }

    this.displayShuttleDayDialog = false;
  }


  private createShuttleDayRequest(shuttleDay: Day): Day {
    const shuttleDayRequest: Day = {
      vehicleId : shuttleDay.vehicleId,
      date : shuttleDay.date,
      fuelCost : shuttleDay.fuelCost,
      fuelQuantity : shuttleDay.fuelQuantity,
      startMileage : shuttleDay.startMileage,
      endMileage : shuttleDay.endMileage
      };
    return shuttleDayRequest;
  }

  private shuttleDayDialogErrorHandler = () => {
    this.displayShuttleDayDialog = true;
  }

}
