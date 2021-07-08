import { Component, OnInit, OnDestroy } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { ShuttleRoute } from '../models/shuttle-route.model';
import { MessageService} from 'primeng/api';
import { Subscription } from 'rxjs';

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
  trips: TripDisplay[] = [];
  isChangeLatest = false;
  loadedRowId: number;
  date: string;
  previousDriverSubscription: Subscription;

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  tripCache: Array<string>
  lastTrip: {shuttleId:number, passengerNumber:number, curbNumber:number, routeId:number, date:string, activityTimestamp:string}
  isCaching = false;

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

    this.tripCache = JSON.parse(localStorage.getItem("tripCache"))

    if (this.tripCache == null){
      this.tripCache= new Array<string>();
      localStorage.setItem("tripCache", JSON.stringify(this.tripCache))
    }

    let tripInfo = {
      shuttleId : this.gpsService.getShuttleId(),
      passengerNumber : this.passengerNumber,
      curbNumber : this.curbNumber,
      routeId : routeId,
      date : this.date,
      activityTimestamp : Date.now().toString()
    }

    if (!this.isChangeLatest) {
      this.shuttleService.createTrip(tripInfo.shuttleId,
      tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId, tripInfo.date, tripInfo.activityTimestamp).subscribe

      ( success => { if (!this.isCaching) { this.processCache();}} ,

          err => { //this.messageService.add({severity: 'error', summary: 'Error', detail: 'Connection Error Has Occurred - Store trip'});
          // stores trip in local storage, adds to trip cache list, and then maintains that in local storage
          localStorage.setItem(tripInfo.activityTimestamp, JSON.stringify(tripInfo));
          this.tripCache.push(tripInfo.activityTimestamp)
          localStorage.setItem("tripCache", JSON.stringify(this.tripCache))

          })

      this.lastTrip = tripInfo;
      this.updateTripDisplay();
      this.reset();

    } else if (this.isChangeLatest) {
      if (localStorage.getItem(this.lastTrip.activityTimestamp) != null) {
        this.lastTrip.passengerNumber = tripInfo.passengerNumber;
        this.lastTrip.curbNumber = tripInfo.curbNumber;
        this.lastTrip.routeId = tripInfo.routeId;
        localStorage.setItem(this.lastTrip.activityTimestamp, JSON.stringify(this.lastTrip));
      } else {
       this.shuttleService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber, routeId)
        .subscribe
        (success => {
            if (!this.isCaching) { this.processCache();}
          },
          err => { this.messageService.add({severity: 'error', summary: 'Error', detail: 'Modification error - not in cache and no connection'});
          })
    }
      this.updateTripDisplay();
      this.isChangeLatest = false;
      this.reset();
    }
}

async processCache() {

  if (this.isCaching){
    return;
  }



  this.isCaching = true; //used to prevent multiple of these from running at once.

  this.tripCache = JSON.parse(localStorage.getItem("tripCache"))

  if (this.tripCache == null){
    this.tripCache= new Array<string>();
    localStorage.setItem("tripCache", JSON.stringify(this.tripCache))
  }

  if (this.tripCache.length){
    this.messageService.add({
      severity: 'info',
      summary: 'Attn:',
      detail: 'Sending cached trips, please wait'
    });
  }

  let conLost = false;
  let sentTrip = false;

  while (!conLost && this.tripCache.length) {


    this.messageService.add({
      severity: 'info',
      summary: 'Attn:',
      detail: `TripCache is ${this.tripCache}, conlost : ${conLost}`
    });

    let tripKey = this.tripCache.shift();
    this.tripCache.unshift(tripKey);

    let tripInfo = JSON.parse(localStorage.getItem(tripKey));


    this.shuttleService.createTrip(tripInfo.shuttleId,
      tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId, tripInfo.date, tripInfo.activityTimestamp).subscribe

    (success => {
        localStorage.removeItem(tripKey); //remove key from local storage
        this.reset();
        sentTrip = true;
        this.tripCache.shift();
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Connection Error Has Occurred - cannot sync`
        });
        conLost = true;
      }
    )
    if (conLost){
      localStorage.setItem("tripCache", JSON.stringify(this.tripCache))
      this.isCaching = false;
      break;
    }
    await this.sleep(75);
  }
  localStorage.setItem("tripCache", JSON.stringify(this.tripCache))
  if (sentTrip) {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Ready for next trip'
    });
  }
  this.isCaching = false;
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




