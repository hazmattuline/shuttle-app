import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

  createStartInfo(driverId: number, vehicleId: number, mileage: number, conditionId: number) {
    const startInfo: StartInfo = {
      startDriverId: driverId,
      startVehicleId: vehicleId,
      startMileage: mileage,
      startConditionId: conditionId
    }
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(conditionId);
    this.shuttleApi.sendStartInfo(startInfo).subscribe();
  }
}
