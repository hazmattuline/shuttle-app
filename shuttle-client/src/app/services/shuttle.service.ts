import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

  createStartRequest(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const startRequest: StartInfo = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startConditionId: conditionId
    }
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(conditionId);
    this.shuttleApi.sendStartInfo(startRequest);
  }
}
