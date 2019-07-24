import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import {AccordionModule} from 'primeng/accordion';
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
import { TripsComponent } from './trips/trips.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AuthModule, AuthHeaderInterceptor, AuthResponseInterceptor, UccLoginModule } from 'common-component-lib';
import { routes } from './routes/routes';
import { BannerDetailsComponent } from './banner-details/banner-details.component';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { CommonModule } from '@angular/common';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { MessageComponent } from './message/message.component';
import { MenuModule, Menu } from 'primeng/menu';
import { UiSwitchModule } from 'ngx-toggle-switch';

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
    EndshiftComponent,
    TripsComponent,
    BannerDetailsComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    AccordionModule,
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
    RouterModule.forRoot(routes, { useHash: true }),
    CheckboxModule,
    AutoCompleteModule,
    SplitButtonModule,
    ToastModule,
    CommonModule,
    ToggleButtonModule,
    MenuModule,
    UiSwitchModule
  ],
  providers: [
    DatePipe,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
