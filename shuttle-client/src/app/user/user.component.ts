import { Component, OnInit, Renderer2, ElementRef, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';
import { Subscription } from 'rxjs';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';
import { Vehicle } from '../models/vehicle.model';
import { ShuttleApiService } from '../services/shuttle-api.service';
import { MaximumLatitude, MinimumLatitude, MaximumLongitude, MinimumLongitude } from '../core/constants/coordinates.constant';

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ShuttleTrackingService , ShuttleService, GPSService]
  })

export class UserComponent implements OnInit, OnDestroy {

  
  private shuttleSubscription: Subscription;
  @ViewChild('markerContainer') markerContainer: ElementRef;
  currentShuttleMarkers: Map<number, ElementRef> = new Map();

  constructor(private shuttleTrackingService: ShuttleTrackingService, private renderer: Renderer2, private vcRef: ViewContainerRef, private shuttleApiService: ShuttleApiService, private shuttleService: ShuttleService, private gpsService: GPSService) {}

  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
    this.listenForShuttleMarkers();
  }

  
 

  ngOnDestroy() {
    if (this.shuttleSubscription) {
      this.shuttleSubscription.unsubscribe();
    }
    this.currentShuttleMarkers.clear();
  }


    
  private showVehicle(vehicle: Vehicle) {
    if (vehicle.status === "A") {
      return true;
    }
    else {
      return false;
    }
  }

  private isOutsideBounds(latitude: number, longitude: number) {
    const latitudeTooBig: boolean = (latitude > MaximumLatitude);
    const latitudeTooSmall: boolean = (latitude < MinimumLatitude);
    const longitudeTooBig: boolean = (longitude > MaximumLongitude);
    const longitudeTooSmall: boolean = (longitude < MinimumLongitude);
    if (latitudeTooBig || latitudeTooSmall || longitudeTooBig || longitudeTooSmall) {
      return true;
    } else {
      return false;
    }
  }

  private hide(shuttle: Shuttle) {
    if (this.currentShuttleMarkers.get(shuttle.vehicleID)) {
      const marker = this.currentShuttleMarkers.get(shuttle.vehicleID);
      this.renderer.removeChild(this.markerContainer.nativeElement, marker);
      this.currentShuttleMarkers.delete(shuttle.vehicleID);
    }
  }

  private removeInactiveShuttles(shuttleList: Shuttle[]) {
    const activeVehicleIds = shuttleList.map(shuttle => shuttle.vehicleID);
    for (let key of Array.from(this.currentShuttleMarkers.keys())) {
      if (!activeVehicleIds.includes(key)) {
        const marker = this.currentShuttleMarkers.get(key);
        this.renderer.removeChild(this.markerContainer.nativeElement, marker);
        this.currentShuttleMarkers.delete(key);
      }
    }
  }

  private listenForShuttleMarkers() {
    this.shuttleSubscription =  this.shuttleTrackingService.shuttles.subscribe(shuttleList => {
      if (this.markerContainer) {
        for (let shuttle of shuttleList) {
          if (!this.isOutsideBounds(shuttle.latitudeCoordinates, shuttle.longitudeCoordinates)) {
            this.addOrUpdateShuttleMarker(shuttle);
          } else {
            this.hide(shuttle);
          }
        }
        this.removeInactiveShuttles(shuttleList);
      }
    });
  }

  
  private addOrUpdateShuttleMarker(shuttle: Shuttle) {
    console.log(this.shuttleService.currentShuttleMarkers)
    if (this.shuttleService.currentShuttleMarkers.get(shuttle.vehicleID)) {
      const marker: ElementRef<any> = this.shuttleService.currentShuttleMarkers.get(shuttle.vehicleID);
      this.setPlacement(marker, shuttle);
    } else {
      const shuttleMarker = this.renderer.createElement('img');
      this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
      this.renderer.addClass(shuttleMarker, 'dot');
      this.setPlacement(shuttleMarker, shuttle);
      this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
      this.shuttleService.currentShuttleMarkers.set(shuttle.vehicleID, shuttleMarker);
    }
  }

  private setPlacement(marker: ElementRef<any>, shuttle:Shuttle) {
    this.renderer.setStyle(marker, 'top', `${shuttle.yPixelCoordinate - 25}px`);
    this.renderer.setStyle(marker, 'left', `${shuttle.xPixelCoordinate - 25}px`);
  }

  

 
}
