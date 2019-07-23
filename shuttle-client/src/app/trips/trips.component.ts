import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { ShuttleRoute } from '../models/shuttle-route.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  passengerNumber: number = 0;
  curbNumber: number = 0;
  tripNumber: number = 1;
  previousTripNumber: number = 0;
  route: string = 'H1 > H2';
  isCurb: boolean = false;
  trips: TripDisplay[] = [];
  isChangeLatest: boolean = false;
  isTowardsH2: boolean = true;
  loadedRowId: number;
  routeH1ToH2: ShuttleRoute;
  routeH2ToH1: ShuttleRoute;
  driverId: number = 27280; // TODO: get the ID from SSO

  constructor(private gpsService: GPSService, private shuttleApiService: ShuttleApiService, private shuttleService: ShuttleService) { }
  date: string;
  getDate() {
    this.date = this.shuttleService.getDate();
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
    })
  }

  ngOnInit() {
    this.getDate();
    this.makeRoutes();
  }

  submitNumber(inputNumber: number) {
    if (!this.isCurb) {
      this.passengerNumber = 10 * this.passengerNumber + inputNumber;
    } else {
      this.curbNumber = 10 * this.curbNumber + inputNumber;
    }
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
      console.log("going to H2");
      console.log(this.routeH1ToH2);
      return this.routeH1ToH2.id;
    } else {
      console.log("going to H1");
      console.log(this.routeH2ToH1);
      return this.routeH2ToH1.id;
    }
  }
  submitTripInfo() {
    let routeId = this.findRoute();
    this.toggleRoute();
    if (!this.isChangeLatest) {
      this.shuttleService.createTrip(this.gpsService.getShuttleId(),
      this.passengerNumber, this.curbNumber, routeId, this.driverId, this.date);
      this.updateTripDisplay();
    } else if (this.isChangeLatest) {
      this.updateTripDisplay();
      this.shuttleService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber, routeId, this.driverId);
      this.isChangeLatest = false;
    }
    this.reset();
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
    console.log("loaded trip");
    this.curbNumber = loadedTrip.curbCount;
    this.passengerNumber = 0;
    this.isCurb = false;
    this.loadedRowId = loadedTrip.id;
    console.log(loadedTrip);
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


