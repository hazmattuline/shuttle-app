import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { AuthModule, AuthHeaderInterceptor, AuthResponseInterceptor, AuthenticationGuard } from 'common-component-lib';
import { BannerDetailsComponent } from './banner-details/banner-details.component';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { CommonModule } from '@angular/common';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MessageComponent } from './message/message.component';
import { MenuModule, Menu } from 'primeng/menu';
import { UccLoginModule } from 'common-component-lib';
import { UccLoginComponent } from 'common-component-lib';
import {adminRoutesNames} from './admin/admin.routes.names';
import { CacheService} from "./services/cache.service";


const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true }
];

const appRoutes: Routes =
[
  { path: 'login', component: UccLoginComponent },
  { path: 'driver', component: DriverComponent, canActivate: [AuthenticationGuard] },
  { path: 'user', component: UserComponent },
  { path: adminRoutesNames.ADMIN, loadChildren: './admin#AdminModule'},
  { path: '',
  redirectTo: '/user',
  pathMatch: 'full'
}
];

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    UserComponent,
    StartshiftComponent,
    EndshiftComponent,
    TripsComponent,
    BannerDetailsComponent,
    MessageComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    AccordionModule,
    FormsModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    InputTextareaModule,
    SelectButtonModule,
    AuthModule.forRoot(),
    CheckboxModule,
    AutoCompleteModule,
    SplitButtonModule,
    ToastModule,
    CommonModule,
    MenuModule,
    UccLoginModule.forRoot({
      appTitle: 'Shuttle App',
      defaultRedirectPath: '/driver',
      serverContextRoot: '/shuttle-app'
    }),
  ],
  providers: [
    DatePipe,
    MessageService,
    httpInterceptorProviders,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
