import { Injectable } from '@angular/core';
import { ShuttleApiService } from './shuttle-api.service';
import { StartInfo } from '../models/start-info.model';

@Injectable()
export class ShuttleService {

  constructor(private shuttleApi: ShuttleApiService) { }

}
