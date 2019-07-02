import { Component, OnInit, Renderer2, ElementRef, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ScriptService } from '../script.service';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';
import { Subscription } from 'rxjs';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';

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

  constructor(private shuttleTrackingService: ShuttleTrackingService, private renderer: Renderer2, private vcRef: ViewContainerRef, private shuttleService: ShuttleService, private gpsService: GPSService) {}

  // have the location be displayed on page load
  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
    this.listenForShuttleMarkers();
  }

  private listenForShuttleMarkers() {
    this.shuttleSubscription =  this.shuttleTrackingService.shuttles.subscribe(shuttle => {
      //console.log(this.gpsService.getIsGPSActive());
      
      if (this.markerContainer) {
    
        this.addOrUpdateShuttleMarker(shuttle);
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



  ngOnDestroy() {
    if (this.shuttleSubscription) {
      this.shuttleSubscription.unsubscribe();
    }
  }

}


