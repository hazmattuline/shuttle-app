import { AuthenticationGuard, UccLoginComponent } from 'common-component-lib';
import { Routes } from '@angular/router';
import { DriverComponent } from '../driver/driver.component';
import { UserComponent } from '../user/user.component';

export const routes: Routes = [
    // {
    //     path: 'login',
    //     component: UccLoginComponent
    // },
    // {
    //     path: '',
    //     // Authorization guard depends on token being in local storage so declare Authentication guard first
    //     canActivate: [AuthenticationGuard],
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: 'user',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: 'user',
    //             component: UserComponent,
    //         },
    //         {
    //             path: 'driver',
    //             component: DriverComponent,
    //         }
    //     ]
    // },
    // {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full'
    // }
];