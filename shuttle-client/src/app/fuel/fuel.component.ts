import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ShuttleService } from '../services/shuttle.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css'],
  providers: [ShuttleService]
})
export class FuelComponent implements OnInit {
  fuelForm: FormGroup;
  date: string;
  constructor( private fb: FormBuilder, private shuttleService: ShuttleService) { }

  ngOnInit() {
    this.setupForm();
    this.getDate();
   }

   getDate()
  {
    this.date = this.shuttleService.getDate();
  }

  private setupForm() {
    this.fuelForm = this.fb.group({
      quantity: '',
      cost: '',
      mileage: '',
      vehicle: ''
    });
  }

  submitFuelData(){
    const fuelValue = this.fuelForm.value;
    this.shuttleService.createFuelInfo(fuelValue.quantity, fuelValue.cost, this.date,  fuelValue.vehicle);
  }
}