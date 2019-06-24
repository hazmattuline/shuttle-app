import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
 selector: 'app-request',
 templateUrl: './request.component.html',
 styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
 originInputs: SelectItem[];
 destinationInputs: SelectItem[];
 passengerInputs: SelectItem[];
 doorInputs: SelectItem[];

 passengerInput: PassengerInput;
 originInput: OriginInput;
 doorInput: DoorInput;
 destinationInput: DestinationInput;

 constructor() {
   this.passengerInputs = [
     { label: 'Select', value: null },
     { label: '0', value: { id: 1 } },
     { label: '1', value: { id: 2 } },
     { label: '2', value: { id: 3 } },
     { label: '3', value: { id: 4 } },
     { label: '4', value: { id: 5 } },
     { label: '5', value: { id: 6 } },
     { label: '6', value: { id: 7 } },
     { label: '7', value: { id: 8 } },
     { label: '8', value: { id: 9 } },
     { label: '9', value: { id: 10 } },
     { label: '10', value: { id: 11 } },
     { label: '11', value: { id: 12 } },
     { label: '12', value: { id: 13 } },
     { label: '13', value: { id: 14 } },
     { label: '14', value: { id: 15 } },
   ];
   this.originInputs = [
     { label: 'Select', value: null },
     { label: 'H1', value: { id: 1 } },
     { label: 'H2', value: { id: 2 } },
     { label: 'H3', value: { id: 3 } },
     { label: 'W1', value: { id: 4 } },
     { label: 'W2', value: { id: 5 } },
   ];

   this.doorInputs = [
     { label: 'Select', value: null },
     { label: '1', value: { id: 1 } },
     { label: '2', value: { id: 2 } },
     { label: '3', value: { id: 3 } },
     { label: '4', value: { id: 4 } },
     { label: '5', value: { id: 5 } },
   ];
   this.destinationInputs = [
     { label: 'Select', value: null },
     { label: 'H1', value: { id: 1 } },
     { label: 'H2', value: { id: 2 } },
     { label: 'H3', value: { id: 3 } },
     { label: 'W1', value: { id: 4 } },
     { label: 'W2', value: { id: 5 } },
   ];
 }

 ngOnInit() {
 }

 submitRequest() {
   // handle request
 }

}

interface PassengerInput {
 numPassengers: number;
}

interface OriginInput {
 building: string;
}

interface DoorInput {
 door: string;
}

interface DestinationInput {
 building: string;
}