import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';
import { EndInfo } from '../models/end-info';
import { VehicleDropDown } from '../models/shuttleDropdownModel';
import { Vehicle } from '../models/vehicle.model';
import { stringify } from '@angular/core/src/render3/util';
import { Subject } from 'rxjs';
import { getVehicleOptions } from '../core/constants/endpoints.constant';
import { FuelInfo } from '../models/fuel.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }
  vehicles: Vehicle[] = [];
  private vehicleTimer = null;
  private _vehicleDropDown: Subject<VehicleDropDown> = new Subject();
  vehicleDropDown: VehicleDropDown = { vehicleID: [], vehicleName: []};

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

  
  vehicleOptionsC() {// (vehicleDropDown: VehicleDropDown) {

    this.shuttleApi.responseForVehicleOptions().subscribe(vehicleDropDown =>{
        this.getAllVehicles(vehicleDropDown);
    });
    this.getAllVehicles(this.vehicleDropDown);
    console.log(this.vehicles);

    return this.vehicles;

  }
  getAllVehicles(vehicleDropDown: VehicleDropDown) {
    this.vehicleDropDown.vehicleID.push(1, 2, 3);
    this.vehicleDropDown.vehicleName.push("emz", "pete", "trizzle");

    for (let i = 0 ; i < this.vehicleDropDown.vehicleName.length; i++ )
    {
      const vehicle: Vehicle =  {
        'name': this.vehicleDropDown.vehicleName[i],
        'id': this.vehicleDropDown.vehicleID[i]
      };
      this.vehicles.push(vehicle);
    }
    //return this.vehicles;
    //console.log(this.vehicles);
  }
  createFuelInfo(quantity: number, cost: number) {
    const fuelInfo: FuelInfo = {
      fuelCost: cost,
      fuelQuantity: quantity
    }
    this.shuttleApi.sendFuelInfo(fuelInfo).subscribe();
  }

}

