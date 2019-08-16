import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminRoutesNames } from './admin.routes.names';
import { ShuttleDayComponent } from './shuttle-day/shuttle-day.component';
import { CommonModule } from '@angular/common';
import { ShuttleDayDetailsComponent } from './shuttle-day-details/shuttle-day-details.component';
import { ShuttleVehiclesComponent } from './shuttle-vehicles/shuttle-vehicles.component';


const routes: Routes = [
    { path: '',
      children: [
        { path: '',
          component: AdminComponent,
          children: [
            { path: adminRoutesNames.Shuttle_Day, component: ShuttleDayComponent  },
            { path: adminRoutesNames.Shuttle_Day_Details, component: ShuttleDayDetailsComponent },
            { path: adminRoutesNames.Shuttle_Vehicles, component: ShuttleVehiclesComponent }

          ]
        }
      ]
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [RouterModule]
  })

  export class AdminRoutingModule {}