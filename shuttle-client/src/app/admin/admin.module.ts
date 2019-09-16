import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShuttleDayComponent } from './shuttle-day/shuttle-day.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShuttleDayDetailsComponent } from './shuttle-day-details/shuttle-day-details.component';
import { ShuttleVehiclesComponent } from './shuttle-vehicles/shuttle-vehicles.component';
import { ShuttleDayFormComponent } from './shuttle-day/shuttle-day-form/shuttle-day-form.component';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UccHeaderModule, UccSettingsMenuModule } from 'common-component-lib';
import { ShuttleVehiclesFormComponent } from './shuttle-vehicles/shuttle-vehicles-form/shuttle-vehicles-form.component';
import { ShuttleService } from '../services/shuttle.service';




@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MenuModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    UccHeaderModule,
    UccSettingsMenuModule

    ],
    providers: [
      DatePipe,
    ],
  declarations: [
    ShuttleDayComponent,
    AdminComponent,
    ShuttleDayDetailsComponent,
    ShuttleVehiclesComponent,
    ShuttleDayFormComponent,
    ShuttleVehiclesFormComponent
    ],
})
export class AdminModule { }
