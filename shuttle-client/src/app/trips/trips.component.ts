import { Component, OnInit } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  passengerNumber: number = 0;
  curbNumber: number = 0;
  tripNumber: number = 1;
  isCurb: boolean = false;
  trips: TripDisplay[] = [];
  isTableVisible = false;

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
    this.shuttleService.createTrip(this.gpsService.getShuttleId(),
    this.passengerNumber, this.curbNumber, this.date);
    this.updateTripDisplay();
    this.reset();
}

changeRoute() {

}

updateTripDisplay() {
  const trip: TripDisplay = {
    tripNumber: this.tripNumber,
    route: "H1 > H2",
    passengers: this.passengerNumber,
    curb: this.curbNumber
  };
  this.tripNumber = this.tripNumber + 1;
  this.trips.push(trip);
  this.isTableVisible = true;
  console.log(this.trips);
  // if (this.trips.length > 2) {
  //   delete this.trips[0];
  // }
}

}

export interface TripDisplay {
  tripNumber: number;
  route: string;
  passengers: number;
  curb: number;
}


