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
  currentShuttleMarkers: ElementRef[] = [];
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
        this.currentShuttleMarkers = this.removeAllMarkers(this.currentShuttleMarkers);
        this.addShuttleMarker(shuttle);
      }
    });
  }

  private addShuttleMarker(shuttle: Shuttle) {
    const shuttleMarker = this.renderer.createElement('img');
    this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
    this.renderer.addClass(shuttleMarker, 'dot');
    this.renderer.setStyle(shuttleMarker, 'top', `${shuttle.yPixelCoordinate}px`)
    this.renderer.setStyle(shuttleMarker, 'left', `${shuttle.xPixelCoordinate}px`)
    this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
    this.currentShuttleMarkers.push(shuttleMarker);
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


