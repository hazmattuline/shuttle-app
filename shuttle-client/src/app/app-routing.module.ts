import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { StartshiftComponent } from './startshift/startshift.component';

const appRoutes: Routes =
[
  { path: 'driver', component: DriverComponent },
  { path: 'driver', component: StartshiftComponent },
  { path: 'user', component: UserComponent },
  { path: '',
  redirectTo: '/user',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
