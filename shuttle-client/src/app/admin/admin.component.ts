import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { adminRoutesNames } from './admin.routes.names';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnDestroy {

  dataContexts: SelectItem[];
  selectedDataContext: SelectItem;
  routerSubscription: Subscription;

  constructor(private router: Router) {
    this.dataContexts = [
      { label: 'Shuttle Day', value: { path: `/${adminRoutesNames.ADMIN}/${adminRoutesNames.Shuttle_Day}` } },
      { label: 'Shuttle Day Details', value: { path: `/${adminRoutesNames.ADMIN}/${adminRoutesNames.Shuttle_Day_Details}`} },
      { label: 'Shuttle Vehicles', value: { path: `/${adminRoutesNames.ADMIN}/${adminRoutesNames.Shuttle_Vehicles}`} }


    ];
    this.routerSubscription = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          let routedDataContext = null;
          this.dataContexts.forEach(dataContext => {
            if (event.url.includes(dataContext.value.path)) {
              routedDataContext = dataContext.value;
            }
          });
          this.selectedDataContext = routedDataContext;
        }
      }
    );

   }

   ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onDataContextChange(selectedDataContext): void {
    this.router.navigate([selectedDataContext.path]);
  }
}
