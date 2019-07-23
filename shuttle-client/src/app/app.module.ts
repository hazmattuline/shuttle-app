import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StartshiftComponent } from './startshift/startshift.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './core/http/api-prefix.interceptor';
import { EndshiftComponent } from './endshift/endshift.component';
import { DatePipe } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import { AuthModule, AuthHeaderInterceptor, AuthResponseInterceptor, UccLoginModule } from 'common-component-lib';
import { routes } from './routes/routes';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true }
]

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    UserComponent,
    StartshiftComponent,
    EndshiftComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    InputTextareaModule,
    SelectButtonModule,
    AuthModule.forRoot(),
    UccLoginModule.forRoot({
      appTitle: 'SAM: Shuttle Activity Monitor',
      defaultRedirectPath: '/user',
      serverContextRoot: '/shuttle-app'
    }),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
