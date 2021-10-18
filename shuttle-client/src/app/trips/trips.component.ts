import { Component, OnInit, OnDestroy } from '@angular/core';
import { GPSService } from '../services/gps.service';
import { ShuttleService } from '../services/shuttle.service';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { ShuttleRoute } from '../models/shuttle-route.model';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TripService } from "../services/trip.service";
import {Trip} from "../models/trip.model";
import {StartShiftService} from "../services/start-shift.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, OnDestroy {
  passengerNumber = 0;
  curbNumber = 0;
  tripNumber = 1;
  routeString = '';
  isCurb = false;
  trips: TripDisplay[] = []
  isChangeLatest = false;
  loadedRowId: number;
  date: string;
  previousDriverSubscription: Subscription;

  routes: ShuttleRoute[] = [];

  waitForRoutes = true;

  towardsH1 = false;
  towardsP = false;
  towardsH2 = false;


  lastTrip: {shuttleId:number, passengerNumber:number, curbNumber:number, route:ShuttleRoute, date:string, activityTimestamp:string, loadedRowId: string}

  destination: {whse:string, door:string} = null;
  currentLocation: {whse:string, door:string} = {whse: 'H1', door:'PARK'};

  constructor(private messageService: MessageService,
              private gpsService: GPSService,
              private shuttleApiService: ShuttleApiService,
              public shuttleService: ShuttleService,
              private tripService:TripService,
              private startShiftService:StartShiftService) { }

  getDate() {
    this.date = this.shuttleService.getDate();
  }

  changeTripDisplayed(tripDisplay: TripDisplay) {
    this.trips = [tripDisplay];
  }

  async makeRoutes(){
    return this.shuttleApiService.getRouteOptions().toPromise()
  }

  ngOnInit() {
    this.getDate();
    this.makeRoutes().then((routeList) => {
      this.routes = routeList;
      this.getPreviousTrip()
    });
  }

  getPreviousTrip(){
    this.previousDriverSubscription = this.shuttleService.loadPreviousDriverInfo().subscribe(previousTrip => {
      if (previousTrip != null && previousTrip.passengerCount != null) {
        let route:ShuttleRoute = this.getRouteFromID(previousTrip.routeId)
        const lastRouteString = this.getRouteString(route);
        const previousDriverTrip = {
          tripNumber: 1,
          route: lastRouteString,
          passengers: previousTrip.passengerCount,
          curb: previousTrip.curbCount,
        };
        this.currentLocation = {whse:route.toWarehouse, door:route.toWarehouseDoor}
        this.setPreviousTrip(previousTrip, route)  //Properly loads last trip
        this.changeTripDisplayed(previousDriverTrip);
      } else {
        this.trips = [];
      }
    })
  }

  setPreviousTrip(trip:Trip, route: ShuttleRoute){
    this.lastTrip = {
      shuttleId: trip.vehicleId,
      passengerNumber: trip.passengerCount,
      curbNumber: trip.curbCount,
      route: route,
      date: trip.date,
      activityTimestamp: trip.activityTimestamp,
      loadedRowId: trip.id.toString()
    }
  }

  getRouteFromID(routeID:number){
    for (let route of this.routes){
      if (route.id === routeID){
        return route;
      }
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
    this.clearTowards()
    this.destination = null;
  }

  updateTripDisplay() {
    const trip: TripDisplay = {
      tripNumber: this.tripNumber,
      route: this.routeString,
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
  }

  findRoute(){
    let cl = this.currentLocation
    let des = this.destination
    for (let route of this.routes){
      if (cl.whse === route.fromWarehouse && cl.door === route.fromWarehouseDoor
        && des.whse === route.toWarehouse && des.door === route.toWarehouseDoor){
        return route
      }
    }
  }

  async submitTripInfo() {

    // Trying to submit a trip without submitting start shift info
    if (!this.startShiftService.startShiftExistsToday(this.gpsService.getShuttleId())){
      this.messageService.add({key:'error', severity:'error', summary: 'Alert', detail:'Fill in Beginning of Day Information', life: 3500});
      this.shuttleService.activeIndex = 0;
      return;
    }

    // Null Destination check
    if (this.tripIsNull()){
      return;
    }

    // Destination equals current location check
    if (this.destinationIsCurrent()){
      return;
    }

    let route = this.findRoute();

    this.routeString = this.getRouteString(route);

    if (this.loadedRowId == null){
      this.loadedRowId = -1;
    }

    let tripInfo = this.getTripInfo(route)

    if (!this.isChangeLatest) { //new trip
      this.submitTrip(tripInfo)

    } else if (this.isChangeLatest) { //update trip
      this.updateTrip(tripInfo)
    }
    if (tripInfo.route.toWarehouse == 'H2') {
      this.tripNumber++
    }
    this.currentLocation = this.destination
    this.updateTripDisplay();
    this.reset();
  }

  submitTrip(tripInfo){
    this.lastTrip = tripInfo;
    this.tripService.createTrip(tripInfo.shuttleId,
      tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.route.id, tripInfo.date, tripInfo.activityTimestamp).subscribe

    ( success => { if (!this.tripService.nowCaching()) { this.processCache();
        this.lastTrip.loadedRowId = success.id.toString()}} ,

      err => {
        // stores trip in local storage, adds to trip cache list, and then maintains that in local storage
        this.tripService.saveToTripCache(tripInfo.activityTimestamp, tripInfo);
        this.lastTrip.loadedRowId = null;
      })
  }

  updateTrip(tripInfo){
    tripInfo.isUpdate = true;
    if (this.lastTrip != null && this.tripService.exists(this.lastTrip.activityTimestamp) != null) { //checking for cached trip
      this.lastTrip.passengerNumber = tripInfo.passengerNumber;
      this.lastTrip.curbNumber = tripInfo.curbNumber;
      this.lastTrip.route = tripInfo.route;
      this.tripService.update(this.lastTrip.activityTimestamp, this.lastTrip);
    } else {
      this.tripService.modifyTrip(this.loadedRowId, this.passengerNumber, this.curbNumber, tripInfo.route.id)
        .subscribe
        (success => {
            if (!this.tripService.nowCaching()) { this.processCache();}
          },
          err => {
            // stores update in local storage, adds to trip cache list, and then maintains that in local storage
            if (tripInfo.loadedRowId == -1){  //checks last trip on update if fails to load
              if (this.lastTrip != null && this.lastTrip.loadedRowId != null){
                tripInfo.loadedRowId = this.lastTrip.loadedRowId
                this.tripService.saveToTripCache(tripInfo.loadedRowId, tripInfo);
              } // Else discord the update because we have no valid rowID to update
            }
            else{
              this.tripService.saveToTripCache(tripInfo.loadedRowId, tripInfo);
            }

          })
    }
    this.isChangeLatest = false;
  }

  tripIsNull(){
    if (this.destination == null){
      this.messageService.add({key:'error', severity:'error', summary: 'Alert', detail:'Select a destination.', life: 3500})
      return true;
    }
  }

  destinationIsCurrent(){
    if (this.destination.whse == this.currentLocation.whse && this.destination.door == this.currentLocation.door){
      this.messageService.add({key:'error', severity:'error', summary:'Alert', detail:'Destination can not be the same as current location.', life: 3500})
      return true;
    }
  }

  getTripInfo(route){
    return { //pulls together all data needed for caching both trips and updates
      shuttleId : this.gpsService.getShuttleId(),
      passengerNumber : this.passengerNumber,
      curbNumber : this.curbNumber,
      route : route,
      date : this.date,
      activityTimestamp : Date.now().toString(),
      isUpdate : false,
      loadedRowId : this.loadedRowId.toString()
    }
  }

  async processCache() {
    await this.tripService.processCachedTrips()
  }

  changeRoute(label:string) {
    this.destination = this.decodeWarehouse(label);
    switch (label) {
      case 'P':
        this.clearTowards()
        this.towardsP = true;
        break;
      case 'H1':
        this.clearTowards()
        this.towardsH1 = true;
        break;
      case 'H2':
        this.clearTowards()
        this.towardsH2 = true;
        break;
    }
  }

  clearTowards(){
    this.towardsH1 = false;
    this.towardsH2 = false;
    this.towardsP = false;
  }

  getRouteString(route: ShuttleRoute){
    if (route == null) return JSON.stringify(this.routes)
    let start = this.encodeWarehouse(route.fromWarehouse, route.fromWarehouseDoor)
    let end = this.encodeWarehouse(route.toWarehouse, route.toWarehouseDoor)

    return `${start} > ${end}`
  }

  encodeWarehouse(whse:string, door:string){
    if (whse === 'H1' && door === 'PARK'){
      return 'P'
    }
    else{
      return whse;
    }
  }

  decodeWarehouse(label:string){
    if (label === 'P'){
      return {whse:'H1', door:'PARK'}
    }
    if (label === 'H1'){
      return {whse:label, door:'FRONT'}
    }
    if (label === 'H2'){
      return {whse:label, door:'FRONT'}
    }
  }

  reloadRow() {
    this.shuttleApiService.getTrip(this.date, this.gpsService.getShuttleId()).subscribe(loadedTrip => {
      this.curbNumber = loadedTrip.curbCount;
      this.passengerNumber = loadedTrip.passengerCount;
      this.isCurb = false;
      this.loadedRowId = loadedTrip.id;
      for (let route of this.routes) {
        if (loadedTrip.routeId === route.id){
          this.reloadRoute(route)
        }
      }
    }, error => { // For if offline, default to saved last trip if possible
      if (this.lastTrip != null) {
        this.curbNumber = this.lastTrip.curbNumber;
        this.passengerNumber = this.lastTrip.passengerNumber;
        this.isCurb = false;
        if (this.lastTrip.loadedRowId != null) {
          this.loadedRowId = Number(this.lastTrip.loadedRowId)
        }
        let route = this.lastTrip.route
        this.reloadRoute(route)
      }
    });
  }

  reloadRoute(route:ShuttleRoute){
    this.changeRoute(this.encodeWarehouse(route.toWarehouse, route.toWarehouseDoor))
    this.currentLocation = {whse: route.fromWarehouse, door: route.fromWarehouseDoor}
    if (this.towardsH2){
      this.tripNumber--
    }
  }

  loadRow() {
    if (!this.isChangeLatest) {
      this.isChangeLatest = true;
      this.reloadRow();
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






