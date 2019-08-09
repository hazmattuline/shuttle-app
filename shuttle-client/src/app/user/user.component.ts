import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';
import { Subscription } from 'rxjs';
import { MaximumLatitude, MinimumLatitude, MaximumLongitude, MinimumLongitude } from '../core/constants/coordinates.constant';
import { ShuttleIconHeight, ShuttleIconWidth } from '../core/constants/image.constants';

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ShuttleTrackingService]
  })

export class UserComponent implements OnInit, OnDestroy {

  constructor(private shuttleTrackingService: ShuttleTrackingService, private renderer: Renderer2) {}

  currentTime: number;

  private shuttleSubscription: Subscription;
  @ViewChild('markerContainer') markerContainer: ElementRef;
  currentShuttleMarkers: Map<number, ElementRef> = new Map();

  isAnyActiveShuttle: boolean;

  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
    this.listenForShuttleMarkers();

    // For seeing total number of users on our page.
    const fhs = document.createElement('script');
    let fhs_id = '5618489';
    const pn =  window.location;
    let w_h = window.screen.width + ' x ' + window.screen.height;
    fhs.src = '//freehostedscripts.net/ocounter.php?site=' +
    fhs_id + '&e1=Online User&e2=Online Users&r=' +
    '&m=0&wh=' + w_h + '&a=1&pn=' + pn + '';
    document.head.appendChild(fhs);
    document.write('<span style="font-size: 0px;" id=\'o_' + fhs_id + '\'></span>');
  }

  ngOnDestroy() {
    if (this.shuttleSubscription) {
      this.shuttleSubscription.unsubscribe();
    }
    this.currentShuttleMarkers.clear();
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
    if (this.currentShuttleMarkers.get(shuttle.vehicleId)) {
      const marker = this.currentShuttleMarkers.get(shuttle.vehicleId);
      this.renderer.removeChild(this.markerContainer.nativeElement, marker);
      this.currentShuttleMarkers.delete(shuttle.vehicleId);
    }
  }

  private removeInactiveShuttles(shuttleList: Shuttle[]) {
    const activeVehicleIds = shuttleList.map(shuttle => shuttle.vehicleId);
    for (const key of Array.from(this.currentShuttleMarkers.keys())) {
      if (!activeVehicleIds.includes(key)) {
        const marker = this.currentShuttleMarkers.get(key);
        this.renderer.removeChild(this.markerContainer.nativeElement, marker);
        this.currentShuttleMarkers.delete(key);
      }
    }
  }

  private listenForShuttleMarkers() {
    this.shuttleSubscription =  this.shuttleTrackingService.shuttles.subscribe(shuttleList => { if (shuttleList.length === 0) {
      this.isAnyActiveShuttle = false;
    } else { this.isAnyActiveShuttle = true; }
                                                                                                if (this.markerContainer) {
        for (const shuttle of shuttleList) {
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
    if (this.currentShuttleMarkers.get(shuttle.vehicleId)) {
      const marker: ElementRef<any> = this.currentShuttleMarkers.get(shuttle.vehicleId);
      this.setPlacement(marker, shuttle);
    } else {
      const shuttleMarker = this.renderer.createElement('img');
      this.renderer.setProperty(shuttleMarker, 'src', 'assets/shuttle_icon.png');
      this.renderer.addClass(shuttleMarker, 'dot');
      this.setPlacement(shuttleMarker, shuttle);
      this.renderer.appendChild(this.markerContainer.nativeElement, shuttleMarker);
      this.currentShuttleMarkers.set(shuttle.vehicleId, shuttleMarker);
    }
  }

  private setPlacement(marker: ElementRef<any>, shuttle: Shuttle) {
    this.renderer.setStyle(marker, 'top', `${shuttle.yPixelCoordinate - (ShuttleIconHeight / 2)}px`);
    this.renderer.setStyle(marker, 'left', `${shuttle.xPixelCoordinate - (ShuttleIconWidth / 2)}px`);
  }




}
