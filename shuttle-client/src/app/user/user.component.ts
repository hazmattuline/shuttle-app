import { Component, OnInit, Renderer2, ElementRef, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ScriptService } from '../script.service';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';
import { Subscription } from 'rxjs';
import { MaximumLatitude, MinimumLatitude, MaximumLongitude, MinimumLongitude } from '../core/constants/coordinates.constant';

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ShuttleTrackingService]
  })

export class UserComponent implements OnInit, OnDestroy {

  currentShuttleMarkers: Map<number, ElementRef> = new Map();
  private shuttleSubscription: Subscription;
  @ViewChild('markerContainer') markerContainer: ElementRef;


  constructor(private shuttleTrackingService: ShuttleTrackingService, private renderer: Renderer2, private vcRef: ViewContainerRef) {}

  // have the location be displayed on page load
  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
    this.listenForShuttleMarkers();
  }

 

  private isOutsideBounds(latitude: number, longitude: number) {
    const latitudeTooBig: boolean = (latitude > MaximumLatitude);
    const latitudeTooSmall: boolean = (latitude > MinimumLatitude);
    const longitudeTooBig: boolean = (longitude > MaximumLongitude);
    const longitudeTooSmall: boolean = (longitude > MinimumLongitude);
    if (latitudeTooBig || latitudeTooSmall || longitudeTooBig || longitudeTooSmall) {
      return true;
    } else {
      return false;
    }
  }

  private listenForShuttleMarkers() {
    this.shuttleSubscription =  this.shuttleTrackingService.shuttles.subscribe(shuttle => {
      if (this.markerContainer) { //&& !this.isOutsideBounds(shuttle.latitudeCoordinates, shuttle.longitudeCoordinates)) {
        console.log(shuttle);
        this.addOrUpdateShuttleMarker(shuttle);
      }
    });
  }
  private addOrUpdateShuttleMarker(shuttle: Shuttle) {
    if (this.currentShuttleMarkers.get(shuttle.vehicleID)) {
      const marker: ElementRef<any> = this.currentShuttleMarkers.get(shuttle.vehicleID);
      this.setPlacement(marker, shuttle);
    } else {
      const shuttleMarker = this.renderer.createElement('img');
      this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
      this.renderer.addClass(shuttleMarker, 'dot');
      this.setPlacement(shuttleMarker, shuttle);
      this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
      this.currentShuttleMarkers.set(shuttle.vehicleID, shuttleMarker);
    }
  }

  private setPlacement(marker: ElementRef<any>, shuttle:Shuttle) {
    this.renderer.setStyle(marker, 'top', `${shuttle.yPixelCoordinate - 25}px`);
    this.renderer.setStyle(marker, 'left', `${shuttle.xPixelCoordinate - 25}px`);
  }

  // private removeAllMarkers(markers: ElementRef[]): ElementRef[] {
  //   markers.forEach(marker => {
  //     this.renderer.removeChild(this.markerContainer, marker);
  //   })
  //   return [];
  // }

  ngOnDestroy() {
    if (this.shuttleSubscription) {
      this.shuttleSubscription.unsubscribe();
    }
    this.currentShuttleMarkers.clear();
  }

}


