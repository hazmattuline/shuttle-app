import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';
import { StartshiftComponent } from './startshift/startshift.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes =
[
  { path: 'driver', component: DriverComponent },
  { path: 'driver', component: StartshiftComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user/request', component: RequestComponent },
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
