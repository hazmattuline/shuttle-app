import { Component, OnInit } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { ShuttleRoute } from '../models/shuttle-route.model';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  passengerNumber = 0;
  curbNumber = 0;
  tripNumber = 1;
  previousTripNumber = 0;
  route = 'H1 > H2';
  isCurb = false;
  trips: TripDisplay[] = [];
  isChangeLatest = false;
  loadedRowId: number;
  date: string;

  routeH1ToH2: ShuttleRoute;
  routeH2ToH1: ShuttleRoute;
  isTowardsH2 = true;

  constructor(private messageService: MessageService, private gpsService: GPSService, private shuttleApiService: ShuttleApiService, public shuttleService: ShuttleService) { }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

  changeTripDisplayed(tripDisplay: TripDisplay) {
    this.trips = [tripDisplay];
  }

  makeRoutes() {
    this.shuttleApiService.getRouteOptions().subscribe(routeList => {
      for (let route of routeList) {
        if ( route.fromWarehouse === 'H2' && route.toWarehouse === 'H1') {
          this.routeH2ToH1 = route;
        } else if (route.fromWarehouse === 'H1' && route.toWarehouse === 'H2') {
          this.routeH1ToH2 = route;
        }
      }
    });
  }

  ngOnInit() {
    this.getDate();
    this.makeRoutes();
    this.shuttleService.loadPreviousDriverInfo().subscribe(previousTrip => {
      if (previousTrip != null && previousTrip.passengerCount != null) {
              const lastRoute = (this.isTowardsH2) ? 'H1 > H2' : 'H1 < H2';
              const previousDriverTrip = {
                tripNumber: 0,
                route: lastRoute,
                passengers: previousTrip.passengerCount,
                curb: previousTrip.curbCount,
              };
              this.changeTripDisplayed(previousDriverTrip);
    } else {
      this.trips = [];
    }
  });
  }

  submitNumber(inputNumber: number) {
    if (!this.isCurb) {
      this.passengerNumber = 10 * this.passengerNumber + inputNumber;
    } else {
      this.curbNumber = 10 * this.curbNumber + inputNumber;
    }
    console.log(this.shuttleService.previousDriverTrip);
  }

  clearNumbers() {
    if (!this.isCurb) {
      this.passengerNumber = 0;
    } else {
      this.curbNumber = 0;
    }
  }

  setIsCurb(newIsCurb: boolean) {
    this.isCurb = newIsCurb;
  }

  reset() {
    this.passengerNumber = 0;
    this.curbNumber = 0;
    this.isCurb = false;
  }

  updateTripDisplay() {
    const trip: TripDisplay = {
      tripNumber: this.tripNumber,
      route: this.route,
      passengers: this.passengerNumber,
      curb: this.curbNumber,
    };
    if (this.isChangeLatest) {
      this.trips[this.trips.length - 1] = trip;
    } else {
      this.trips.push(trip);
      if (this.trips.length > 1) {
        this.trips.shift();
      }
    }
    if (this.tripNumber === this.previousTripNumber) {
      this.tripNumber++;
    } else {
      this.tripNumber++;
      this.previousTripNumber++;
    }
  }

  findRoute() {
    if (this.isTowardsH2) {
      return this.routeH1ToH2.id;
    } else {
      return this.routeH2ToH1.id;
    }
  }
  submitTripInfo() {
    let routeId = this.findRoute();
    this.toggleRoute();
    if (!this.isChangeLatest) {
      this.shuttleService.createTrip(this.gpsService.getShuttleId(),
      this.passengerNumber, this.curbNumber, routeId, this.date)
      .subscribe
      ( success => { console.log("in here"); this.updateTripDisplay();  this.reset(); } ,
        err => { this.messageService.add({severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred'});})


    } else if (this.isChangeLatest) {
      this.shuttleService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber, routeId)
      .subscribe
      ( success => {this.updateTripDisplay(); this.isChangeLatest = false; this.reset(); } ,
      err => { this.messageService.add({severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred'});})
    }
}

changeRoute(isH1toH2: boolean) {
  if (isH1toH2) {
    this.route = 'H1 > H2';
    this.isTowardsH2 = true;
  } else {
    this.route = 'H1 < H2';
    this.isTowardsH2 = false;
  }
}

toggleRoute() {
  if (!this.isTowardsH2) {
    this.route = 'H1 < H2';
    this.isTowardsH2 = true;
  } else {
    this.route = 'H1 > H2';
    this.isTowardsH2 = false;
  }
}

reloadRow() {
  this.shuttleApiService.getTrip(this.date, this.gpsService.getShuttleId()).subscribe(loadedTrip => {
    this.curbNumber = loadedTrip.curbCount;
    this.passengerNumber = loadedTrip.passengerCount;
    this.isCurb = false;
    this.loadedRowId = loadedTrip.id;
    if (loadedTrip.routeId === this.routeH1ToH2.id) {
      this.changeRoute(true);
    } else {
      this.changeRoute(false);
    }
  });

}

loadRow() {
  if (!this.isChangeLatest) {
    this.isChangeLatest = true;
    this.reloadRow();
    this.toggleRoute();
    this.tripNumber = this.previousTripNumber;
  }
}


}

export interface TripDisplay {
  tripNumber: number;
  route: string;
  passengers: number;
  curb: number;
}


