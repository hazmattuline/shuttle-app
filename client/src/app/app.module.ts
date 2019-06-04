import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
//import { LayoutModule } from '@angular/cdk/layout';
//import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { AppComponent } from './app.component';


const appRoutes: Routes = 
[
  { path: 'driver', component: DriverComponent },
  { path: 'user', component: UserComponent },
  { path: '',
  redirectTo: '/user',
  pathMatch: 'full'
},
 

  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    DriverComponent,
    UserComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
   // LayoutModule,
   // MatToolbarModule,
   // MatButtonModule,
   // MatSidenavModule,
   // MatIconModule,
   // MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
