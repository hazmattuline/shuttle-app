import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';
import { EndInfo } from '../models/end-info';
import { VehicleDropDown } from '../models/shuttleDropdownModel';
import { Vehicle } from '../models/vehicle.model';
import { stringify } from '@angular/core/src/render3/util';
import { Subject, Observable } from 'rxjs';
import { Vehicles } from '../core/constants/endpoints.constant';
import { FuelInfo } from '../models/fuel.model';
import { PassengerInfo } from '../models/record-passengers.model';
import { SelectItem } from 'primeng/api';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

 
  vehicles: Vehicle[] = [];
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
  
  createStartInfo(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const startInfo: StartInfo = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startConditionId: conditionId
    };
    console.log(driverId);
    console.log(vehicleId);


    console.log(mileage);
    console.log(conditionId);

    this.shuttleApi.sendStartInfo(startInfo).subscribe();
  }

    createEndInfo(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const endInfo: EndInfo = {
      endDriverId: driverId,
      endVehicleId: vehicleId,
      endMileage: mileage,
      endConditionId: conditionId
    };
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(conditionId);

    this.shuttleApi.sendEndInfo(endInfo).subscribe();
  }

  
  vehicleOptionsC() {
    this.shuttleApi.responseForVehicleOptions().subscribe(vehicleDropDown =>{
      this._vehicleDropDown.next(ShuttleService.buildSelectItemsForDropdown(vehicleDropDown, 'vehicleName', 'id'));
    });
  }

  getAllVehicles(vehicleDropDown: VehicleDropDown) {

    for (let i = 0 ; i < vehicleDropDown.vehicleNames.length; i++)
    {

      const vehicle: Vehicle =  {

        'name': vehicleDropDown.vehicleNames[i],
        'id': vehicleDropDown.ids[i]
      };
      this.vehicles.push(vehicle);
    }
    
    return this.vehicles;
  
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
    this.shuttleApi.sendPassengerInfo().subscribe();
  }
  }



