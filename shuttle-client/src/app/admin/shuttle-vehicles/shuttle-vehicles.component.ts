import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintenanceComponent } from 'src/app/core/base/maintenance.component';
import { MessageService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { StagedRequestService } from 'src/app/services/staged-request.service';
import { StagedEntity } from 'src/app/models/staged-entity';
import { StagedRequest } from 'src/app/models/staged-request.model';
import { ShuttleApiService } from 'src/app/services/shuttle-api.service';
import { takeUntil } from 'rxjs/operators';
import { ShuttleVehiclesFormComponent } from './shuttle-vehicles-form/shuttle-vehicles-form.component';
import { Shuttle } from 'src/app/models/shuttle.model';

@Component({
  selector: 'app-shuttle-vehicles',
  templateUrl: './shuttle-vehicles.component.html',
  styleUrls: ['./shuttle-vehicles.component.css']
})
export class ShuttleVehiclesComponent extends MaintenanceComponent implements OnInit {

  // value cannot be changed 
  readonly ADD_SHUTTLE_HEADER= 'Add Shuttle Record';
  readonly EDIT_SHUTTLE_HEADER = 'Update Shuttle Record';



  @ViewChild('shuttleVehiclesForm')
  shuttleVehiclesForm: ShuttleVehiclesFormComponent;

  shuttleVehicleList: Shuttle[] = [];
  isLoading: boolean;
  selectedShuttleVehicle: Shuttle;
  shuttleVehicleDialogHeader: string;
  displayShuttleVehicleDialog: boolean;
  menuItems: MenuItem[] = [];


  // private stagedRequestService: StagedRequestService
  constructor(private shuttleApiService: ShuttleApiService, messageService: MessageService, 
    private stagedRequestService: StagedRequestService) {

    super(messageService);

  }


  ngOnInit() {
    this.isLoading = true;
    this.shuttleApiService.getVehicleOptions().pipe(takeUntil(this.destroy$))
      .subscribe(
        shuttleVehicle => {
          console.log(shuttleVehicle);
          this.isLoading = false;
          this.shuttleVehicleList = shuttleVehicle;
        },
        error => {
          this.isLoading = false;
          // TODO: Implement standard table error message once determined
          console.log(error);
        }
      );
  }


  onAddShuttleClick() {
    // shows modal of shuttle-vehicle component
    this.shuttleVehiclesForm.initializeForm();
    this.selectedShuttleVehicle = null;

    // for showing the dialog in modal
    this.shuttleVehicleDialogHeader = this.ADD_SHUTTLE_HEADER;
    this.displayShuttleVehicleDialog = true;
  }

  openMenu(menu: Menu, event, shuttleVehicle: Shuttle) {
    if (menu.visible) {
      menu.hide();
    } else {
      this.selectedShuttleVehicle = shuttleVehicle;
      this.menuItems = [
        { label: 'Edit', icon: 'fa fa-pencil', command: () => { this.onEditRowClick(); } }
      ];
      menu.show(event);
    }
  }


  onEditRowClick() {
    this.shuttleVehiclesForm.initializeForm(this.selectedShuttleVehicle);
    this.shuttleVehicleDialogHeader = this.ADD_SHUTTLE_HEADER;
    this.displayShuttleVehicleDialog = true;
  }

  onShuttleVehicleCancelClick() {
    this.displayShuttleVehicleDialog = false;
  }


  onShuttleVehicleSaveClick(stagedReason: StagedEntity<Shuttle>) {
    const stagedRequest = new StagedRequest();
    stagedRequest.stagedRequestText = stagedReason.requestNotes;

    // implement rest call


    if (this.selectedShuttleVehicle) {
      stagedRequest.stagedJson = JSON.stringify(this.createShuttleVehicleRequest(stagedReason.entity));
      this.handleStagedRequestCreation(this.stagedRequestService.updateShuttle(stagedRequest, this.selectedShuttleVehicle.vehicleId),
        this.shuttleVehiclesDialogErrorHandler);
    } else {
      stagedRequest.stagedJson = JSON.stringify(this.createShuttleVehicleRequest(stagedReason.entity));
      this.handleStagedRequestCreation(this.stagedRequestService.addShuttle(stagedRequest), this.shuttleVehiclesDialogErrorHandler);
    }

    this.displayShuttleVehicleDialog = false;
  }


  private createShuttleVehicleRequest(shuttleVehicle: Shuttle): Shuttle {
    const shuttleVehicleRequest: Shuttle = {
      vehicleId : shuttleVehicle.vehicleId,
      latitudeCoordinates : shuttleVehicle.latitudeCoordinates,
      longitudeCoordinates : shuttleVehicle.longitudeCoordinates,
      status : shuttleVehicle.status,
      name : shuttleVehicle.name,
      shuttleType : shuttleVehicle.shuttleType,
      rentalIndicator : shuttleVehicle.rentalIndicator
      };
    return shuttleVehicleRequest;
  }

  private shuttleVehiclesDialogErrorHandler = () => {
    this.displayShuttleVehicleDialog = true;
  }

}
