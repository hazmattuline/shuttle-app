import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartRequest } from '../models/start-request.model';

@Injectable()
export class RecordStartService {

  constructor(private shuttleApi: ShuttleApiService) { }

  createStartRequest(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const startRequest: StartRequest = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startConditionId: conditionId
    }
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(conditionId);
    this.shuttleApi.sendStartingInfo(startRequest);
  }
}
