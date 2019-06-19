import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { ScriptService } from './script.service';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';


const appRoutes: Routes = 
[
  { path: 'driver', component: DriverComponent },
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
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    ButtonModule,
  ],
  providers: [ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
