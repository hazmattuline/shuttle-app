import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';
import { GPSService } from '../services/gps.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css'],
  providers: [ShuttleService, GPSService]
})
export class FuelComponent implements OnInit {
  fuelForm: FormGroup;
  date: string;
  constructor( private fb: FormBuilder, private shuttleService: ShuttleService, private gpsService: GPSService) { }

  ngOnInit() {
    this.setupForm();
    this.getDate();
   }

   getDate() {
    this.date = this.shuttleService.getDate();
  }

  private setupForm() {
    this.fuelForm = this.fb.group({
      quantity: '',
      cost: '',
    });
  }

  submitFuelData(){
    const fuelValue = this.fuelForm.value;
    console.log("fuel " + this.gpsService.getShuttleId());
    this.shuttleService.createFuelInfo(fuelValue.quantity, fuelValue.cost, this.date,  this.gpsService.getShuttleId());
  }
}