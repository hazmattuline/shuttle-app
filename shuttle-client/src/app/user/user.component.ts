import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';
import { ShuttleTrackingService } from '../services/shuttle-tracking.service';
import { Shuttle } from '../models/shuttle.model';

@Component
  ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ShuttleTrackingService]
  })

export class UserComponent implements OnInit {
  //title = 'Shuttle';

  shuttles: Shuttle[] = [];

  constructor(private shuttleTrackingService: ShuttleTrackingService) {}

  // have the location be displayed on page load
  ngOnInit() {
    this.shuttleTrackingService.startShuttleTracking();
  }

  // // this function will actually save those coords
  // showPosition(position) {
  //   for (let shuttle of this.shuttles) {
  //     let shuttleXYCoordinates = this.shuttleTrackingService.calculateXYPixelCoordinates(shuttle);
  //     this.shuttleTrackingService.showShuttle(shuttleXYCoordinates);
  //   }
  // }

  // // this method animates the dots for us to see 

}


