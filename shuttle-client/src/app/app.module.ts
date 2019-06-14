import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { StartshiftComponent } from './startshift/startshift.component';


const appRoutes: Routes = 
[
  { path: 'driver', component: DriverComponent },
  { path: 'driver', component: StartshiftComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/request', component: RequestComponent },
  { path: '',
  redirectTo: '/user',
  pathMatch: 'full'
},
 
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    UserComponent,
    RequestComponent,
    StartshiftComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
