import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsComponent } from './trips.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {MessageService} from "primeng/api";
import {GPSService} from "../services/gps.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ShuttleApiService} from "../services/shuttle-api.service";
import {TripService} from "../services/trip.service";
import {ShuttleService} from "../services/shuttle.service";

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

  it('should take destination and current location and return a route', () => {
    component.routes = [{id: 4, fromWarehouseDoor:"FRONT", toWarehouseDoor:"FRONT", toWarehouse:'H2', fromWarehouse:'H1'}]
    component.currentLocation = {whse:'H1',door:'FRONT'}
    component.destination = {whse:'H2',door:'FRONT'}
    fixture.detectChanges()

    let routeID = component.findRoute().id

    expect(routeID).toEqual(4)
  })
});
