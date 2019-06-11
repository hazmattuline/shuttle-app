import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: 'driver', component: DriverComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/request', component: RequestComponent }
 
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
