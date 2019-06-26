import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';
import { EndInfo } from '../models/end-info';

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

    createEndInfo(enddriverId: number, endvehicleId: number, endmileage: number, endconditionId: number); {
    const endInfo: EndInfo = {
      endDriverId: enddriverId,
      endVehicleId: vehicleId,
      endMileage: mileage,
      endConditionId: conditionId
    };
  }
    console.log(driverId);
    console.log(vehicleId);
    console.log(mileage);
    console.log(conditionId);

    this.shuttleApi.sendStartInfo(startInfo).subscribe();
    this.shuttleApi.sendEndInfo(endInfo).subscribe();
  }
}
