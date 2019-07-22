import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';

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

  constructor(private gpsService: GPSService, private shuttleApiService: ShuttleApiService, private shuttleService: ShuttleService) { }
  date: string;
  getDate() {
    this.date = this.shuttleService.getDate();
  }
  ngOnInit() {
    this.getDate();
  }

  changeColor(element) {
    if (element.style.backgroundColor === 'yellow') {
      element.style.backgroundColor = 'gray';
    } else {
      element.style.backgroundColor = 'yellow';
    }
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
    console.log("after increment");
    console.log(this.tripNumber);
    console.log(this.previousTripNumber);
  }
  submitTripInfo() {
    this.toggleRoute();
    if (!this.isChangeLatest) {  // && !this.isChangeSecondmostLatest
      this.shuttleService.createTrip(this.gpsService.getShuttleId(),
      this.passengerNumber, this.curbNumber, this.date);
      this.updateTripDisplay();
    } else if (this.isChangeLatest) {
      this.updateTripDisplay();
      this.shuttleService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber);
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


