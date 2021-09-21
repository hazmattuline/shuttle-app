import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TripsComponent } from './trips.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {MessageService} from "primeng/api";
import {GPSService} from "../services/gps.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ShuttleApiService} from "../services/shuttle-api.service";
import {TripService} from "../services/trip.service";
import {ShuttleService} from "../services/shuttle.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsComponent ],
      providers: [ MessageService, GPSService, HttpClient, ShuttleApiService, TripService, ShuttleService, HttpHandler ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should encode warehouse H1 and door "PARK" as P', () => {
    let response = component.encodeWarehouse('H1', 'PARK')
    expect(response).toEqual('P')
  })

  it('Should provide the correct route when given an ID', () => {
    component.routes = [{id:1,toWarehouse:"H2",fromWarehouse:"H1",toWarehouseDoor:"FRONT",fromWarehouseDoor:"FRONT"},{id:2,toWarehouse:"H1",fromWarehouse:"H2",toWarehouseDoor:"FRONT",fromWarehouseDoor:"FRONT"},{id:3,toWarehouse:"H1",fromWarehouse:"H1",toWarehouseDoor:"PARK",fromWarehouseDoor:"FRONT"},{id:4,toWarehouse:"H1",fromWarehouse:"H1",toWarehouseDoor:"FRONT",fromWarehouseDoor:"PARK"},{id:5,toWarehouse:"H1",fromWarehouse:"H2",toWarehouseDoor:"PARK",fromWarehouseDoor:"FRONT"},{id:6,toWarehouse:"H2",fromWarehouse:"H1",toWarehouseDoor:"FRONT",fromWarehouseDoor:"PARK"}]

    let route = component.getRouteFromID(3)

    expect(route).toEqual({id:3,toWarehouse:"H1",fromWarehouse:"H1",toWarehouseDoor:"PARK",fromWarehouseDoor:"FRONT"})
  })

  it('should take destination and current location and return a route', () => {
    component.routes = [{id: 4, fromWarehouseDoor:"FRONT", toWarehouseDoor:"FRONT", toWarehouse:'H2', fromWarehouse:'H1'}]
    component.currentLocation = {whse:'H1',door:'FRONT'}
    component.destination = {whse:'H2',door:'FRONT'}
    fixture.detectChanges()

    let routeID = component.findRoute().id

    expect(routeID).toEqual(4)
  })
});
