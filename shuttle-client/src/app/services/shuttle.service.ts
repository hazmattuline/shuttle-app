import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';
import { PassengerInfo } from '../models/record-passengers.model';
import { FuelInfo } from '../models/fuel.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

  createStartInfo(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const startInfo: StartInfo = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startConditionId: conditionId
    };
    this.shuttleApi.sendStartInfo(startInfo).subscribe();
  }

  createPassengerInfo(pvehicleId: number, pCount: number, cCount: number) {
    const passengerInfo: PassengerInfo = {
      vehicleId: pvehicleId,
      passengerCount: pCount,
      curbCount: cCount
    };
    this.shuttleApi.sendPassengerInfo(passengerInfo).subscribe();
  }

  createFuelInfo(quantity: number, cost: number) {
    const fuelInfo: FuelInfo = {
      fuelCost: cost,
      fuelQuantity: quantity
    };
    this.shuttleApi.sendFuelInfo(fuelInfo).subscribe();
  }

}
