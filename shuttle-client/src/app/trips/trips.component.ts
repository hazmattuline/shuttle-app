import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  passengerNumber: number = 0;
  curbNumber: number = 0;
  tripNumber: number = 1;
  route: string = 'H1 < H2';
  isCurb: boolean = false;
  trips: TripDisplay[] = [];
  isChangeLatest: boolean = false;
  isChangeSecondmostLatest: boolean = false;
  isTowardsH2: boolean = true;

  constructor(private gpsService: GPSService, private shuttleService: ShuttleService) { }
  date: string;
  getDate() {
    this.date = this.shuttleService.getDate();
  }
  ngOnInit() {
    this.getDate();
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

  submitTripInfo() {
    if (!this.isChangeLatest && !this.isChangeSecondmostLatest) {
      this.shuttleService.createTrip(this.gpsService.getShuttleId(),
      this.passengerNumber, this.curbNumber, this.date);
      this.updateTripDisplay();
      this.reset();
    } else if (this.isChangeLatest) {
      this.isChangeLatest = false;
    } else {
      this.isChangeSecondmostLatest = false;
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

loadRow(rowNumber: number) {
  let trip: TripDisplay = this.trips[this.trips.length - rowNumber];
  if (rowNumber === 1) {
    this.isChangeLatest = true;
  } else {
    this.isChangeSecondmostLatest = true;
  }
  this.passengerNumber = trip.passengers;
  this.curbNumber = trip.curb;
  console.log(trip);
}

updateTripDisplay() {
  const trip: TripDisplay = {
    tripNumber: this.tripNumber,
    route: this.route,
    passengers: this.passengerNumber,
    curb: this.curbNumber,
    rowNumber: 1
  };
  this.tripNumber = this.tripNumber + 1;
  this.trips.push(trip);
  if (this.trips.length > 2) {
    this.trips.shift();
  }
  if (this.trips.length >= 2) {
    this.trips[0].rowNumber = 2;
  }
}
}

export interface TripDisplay {
  tripNumber: number;
  route: string;
  passengers: number;
  curb: number;
  rowNumber: number;
}


