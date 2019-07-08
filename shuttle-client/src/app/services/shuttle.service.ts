import { Injectable, ElementRef } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';
import { EndInfo } from '../models/end-info';
import { Subject, Observable, Subscription } from 'rxjs';
import { FuelInfo } from '../models/fuel.model';
import { PassengerInfo } from '../models/record-passengers.model';
import { SelectItem } from 'primeng/api';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

  private _vehicleDropDown: Subject<SelectItem[]> = new Subject();
  public vehicleDropDown: Observable<SelectItem[]> = this._vehicleDropDown.asObservable();

   static buildSelectItemsForDropdown(data: any[], labelFieldName: string, valueFieldName?: string): SelectItem[] {
    let selectItems = [];
      console.log(data);
    if (data && data.length > 0) {
      selectItems = data.map(dataItem => {
        return {label: dataItem[labelFieldName], value: valueFieldName ? dataItem[valueFieldName] : dataItem};
      });
  
      selectItems.unshift({label: '', value: null});
    }
    return selectItems;
  }
  
  createStartInfo(driverId: number, vehicleId: number, mileage: number, condition: string) {
    const startInfo: StartInfo = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startCondition: condition
    };
    console.log(driverId);
    console.log(vehicleId);


    console.log(mileage);
    console.log(condition);

    this.shuttleApi.sendStartInfo(startInfo).subscribe();
  }

    createEndInfo(driverId: number, vehicleId: number, mileage: number, condition: string) {
    const endInfo: EndInfo = {
      endDriverId: driverId,
      endVehicleId: vehicleId,
      endMileage: mileage,
      endCondition: condition
    };
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(condition);

    this.shuttleApi.sendEndInfo(endInfo).subscribe();
  }
    vehicleOptions() {
    this.shuttleApi.responseForVehicleOptions().subscribe(vehicleDropDown =>{
      this._vehicleDropDown.next(ShuttleService.buildSelectItemsForDropdown(vehicleDropDown, 'vehicleName', 'id'));
    });
  }

  createFuelInfo(quantity: number, cost: number) {
    const fuelInfo: FuelInfo = {
      fuelCost: cost,
      fuelQuantity: quantity
    }
    this.shuttleApi.sendFuelInfo(fuelInfo).subscribe();
  }

  createPassengerInfo(pvehicleId: number, pCount: number, cCount: number) {
    const passengerInfo: PassengerInfo = {
      vehicleId: pvehicleId,
      passengerCount: pCount,
      curbCount: cCount
    };
    this.shuttleApi.sendPassengerInfo(passengerInfo).subscribe();
  }
  currentShuttleMarkers: Map<number, ElementRef> = new Map();

  deleteMarker() {
    this.currentShuttleMarkers.clear();
  }

  
   stopListenForShuttleMarkers(sub: Subscription) {
    if (sub) {
      sub.unsubscribe();
    }
  }

  }



