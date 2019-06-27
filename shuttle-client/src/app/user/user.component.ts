import { Component, OnInit, Renderer2, ElementRef, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ScriptService } from '../script.service';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';
import { Subscription } from 'rxjs';

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ShuttleTrackingService]
  })

export class UserComponent implements OnInit, OnDestroy {

  shuttles: Shuttle[] = [];
  currentShuttleMarkers: Map<number, ElementRef[]> = new Map();
  private shuttleSubscription: Subscription;
  @ViewChild('markerContainer') markerContainer: ElementRef;

  constructor(private shuttleTrackingService: ShuttleTrackingService, private renderer: Renderer2, private vcRef: ViewContainerRef) {}

  // have the location be displayed on page load
  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
    this.listenForShuttleMarkers();
  }

  private listenForShuttleMarkers() {
    this.shuttleSubscription =  this.shuttleTrackingService.shuttles.subscribe(shuttle => {
      if (this.markerContainer) {
        this.addOrUpdateShuttleMarker(shuttle);
      }
    });
  }

  // private addShuttleMarker(shuttle: Shuttle) {
  //   const shuttleMarker = this.renderer.createElement('img');
  //   this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
  //   this.renderer.addClass(shuttleMarker, 'dot');
  //   this.renderer.setStyle(shuttleMarker, 'top', `${shuttle.yPixelCoordinate - 25}px`)
  //   this.renderer.setStyle(shuttleMarker, 'left', `${shuttle.xPixelCoordinate - 25}px`)
  //   this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
  //   this.currentShuttleMarkers.push(shuttleMarker);
  // }

  private addOrUpdateShuttleMarker(shuttle: Shuttle) {
    let marker;
    if ((marker === this.currentShuttleMarkers.get(shuttle.vehicleID))) {
      this.renderer.setStyle(marker, 'top', `${shuttle.yPixelCoordinate - 25}px`);
      this.renderer.setStyle(marker, 'left', `${shuttle.xPixelCoordinate - 25}px`);
    } else {
      const shuttleMarker = this.renderer.createElement('img');
      this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
      this.renderer.addClass(shuttleMarker, 'dot');
      this.renderer.setStyle(shuttleMarker, 'top', `${shuttle.yPixelCoordinate - 25}px`);
      this.renderer.setStyle(shuttleMarker, 'left', `${shuttle.xPixelCoordinate - 25}px`);
      this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
      this.currentShuttleMarkers.set(shuttle.vehicleID, shuttleMarker);
    }
  }

  private removeAllMarkers(markers: ElementRef[]): ElementRef[] {
    markers.forEach(marker => {
      this.renderer.removeChild(this.markerContainer, marker);
    })
    return [];
  }

  ngOnDestroy() {
    if (this.shuttleSubscription) {
      this.shuttleSubscription.unsubscribe();
    }
  }

}


