import { Component, OnInit, OnDestroy } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { ShuttleRoute } from '../models/shuttle-route.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {TripService} from "../services/trip.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, OnDestroy {
  passengerNumber = 0;
  curbNumber = 0;
  tripNumber = 1;
  previousTripNumber = 0;
  route = 'H1 > H2';
  isCurb = false;
  trips: TripDisplay[] = [] //[{tripNumber:1, route:'Test', passengers:0, curb:0}];
  isChangeLatest = false;
  loadedRowId: number;
  date: string;
  previousDriverSubscription: Subscription;

  lastTrip: {shuttleId:number, passengerNumber:number, curbNumber:number, routeId:number, date:string, activityTimestamp:string}

  routeH1ToH2: ShuttleRoute;
  routeH2ToH1: ShuttleRoute;
  isTowardsH1 = true;
  isTowardsH2 = false;
  isTowardsP = false;
  destination = 'H1';

  constructor(private messageService: MessageService, private gpsService: GPSService, private shuttleApiService: ShuttleApiService, public shuttleService: ShuttleService, private tripService:TripService) { }

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
    this.previousDriverSubscription = this.shuttleService.loadPreviousDriverInfo().subscribe(previousTrip => {
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

  async submitTripInfo() {
    let routeId = this.findRoute();
    this.toggleRoute();

    if (this.loadedRowId == null){
      this.loadedRowId = -1;
    }

    let tripInfo = this.getTripInfo(routeId)

    if (!this.isChangeLatest) { //new trip
      this.tripService.createTrip(tripInfo.shuttleId,
      tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId, tripInfo.date, tripInfo.activityTimestamp).subscribe

      ( success => { if (!this.tripService.nowCaching()) { this.processCache();}} ,

          err => {
          // stores trip in local storage, adds to trip cache list, and then maintains that in local storage
          this.tripService.saveToTripCache(tripInfo.activityTimestamp, tripInfo);
          })

      this.lastTrip = tripInfo;

    } else if (this.isChangeLatest) { //update trip
      tripInfo.isUpdate = true;
      if (this.lastTrip != null && this.tripService.exists(this.lastTrip.activityTimestamp) != null) { //checking for cached trip
        this.lastTrip.passengerNumber = tripInfo.passengerNumber;
        this.lastTrip.curbNumber = tripInfo.curbNumber;
        this.lastTrip.routeId = tripInfo.routeId;
        this.tripService.update(this.lastTrip.activityTimestamp, this.lastTrip);
      } else {
       this.tripService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber, routeId)
        .subscribe
        (success => {
            if (!this.tripService.nowCaching()) { this.processCache();}
          },
          err => {
            // stores update in local storage, adds to trip cache list, and then maintains that in local storage
            this.tripService.saveToTripCache(tripInfo.loadedRowId, tripInfo);
          })
    }
      this.isChangeLatest = false;
    }
    this.updateTripDisplay();
    this.reset();
  }

  getTripInfo(routeId){
    return { //pulls together all data needed for caching both trips and updates
      shuttleId : this.gpsService.getShuttleId(),
      passengerNumber : this.passengerNumber,
      curbNumber : this.curbNumber,
      routeId : routeId,
      date : this.date,
      activityTimestamp : Date.now().toString(),
      isUpdate : false,
      loadedRowId : this.loadedRowId.toString()
    }
  }

  async processCache() {
    await this.tripService.processCachedTrips()
  }

  changeRoute(route: string) {
    if (route == 'H1') {
      this.route = 'H1 < H2';
      this.isTowardsH1 = true;
      this.isTowardsH2 = false;
      this.isTowardsP = false;
    }
    if (route == 'H2') {
      this.route = 'H1 > H2';
      this.isTowardsH1 = false;
      this.isTowardsH2 = true;
      this.isTowardsP = false;
    }
    if (route == 'P'){
      this.isTowardsH1 = false;
      this.isTowardsH2 = false;
      this.isTowardsP = true;

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
        this.changeRoute('H1');
      } else {
        this.changeRoute('H2');
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

  public ngOnDestroy(): void {
    if (this.previousDriverSubscription) {
      this.previousDriverSubscription.unsubscribe();
    }
  }

}

export interface TripDisplay {
  tripNumber: number;
  route: string;
  passengers: number;
  curb: number;
}




