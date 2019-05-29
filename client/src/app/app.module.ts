import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
/*import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
MatIconModule, MatListModule } from '@angular/material';*/


@NgModule({
   declarations: [
      AppComponent,
      TestComponent,
      SideNavComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      /*LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,*/
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
