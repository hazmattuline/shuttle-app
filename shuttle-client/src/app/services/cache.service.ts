import {Injectable, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ShuttleService} from "./shuttle.service";

@Injectable({
  providedIn: 'root'
})
export class CacheService implements OnInit {
    ngOnInit(): void {
        this.initializeTripCache();
    }

    sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  tripCache: Array<string>
  tripCacheKey = "tripCache";
  isCaching = false;

  constructor(private messageService: MessageService, private shuttleService: ShuttleService) {
  }

  async processCache() {

    if (this.isCaching) {
      return;
    }

    this.isCaching = true; //used to prevent multiple of these from running at once.

    this.tripCache = this.getCache(this.tripCacheKey);

    if (this.tripCache.length) {
      this.messageService.add({
        severity: 'info',
        summary: 'Attn:',
        detail: 'Sending cached trips, please wait'
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Attn:',
        detail: 'No trips to sync'
      });
    }

    let conLost = false;
    let sentTrip = false;

    while (!conLost && this.tripCache.length) {

      let tripKey = this.tripCache.shift();
      this.tripCache.unshift(tripKey);

      let tripInfo = this.getCache(tripKey);

      //Submitting trips while processing cache can cause nulls, this recovers
      if (tripInfo == null) {
        this.tripCache.shift()
        await this.sleep(100);
        continue;
      }
      if (tripInfo.isUpdate()){
        this.shuttleService.createTrip(tripInfo.shuttleId,
          tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId, tripInfo.date, tripInfo.activityTimestamp).subscribe

        (success => {
            this.tripWorked(tripKey); //remove key from local storage only on success
            sentTrip = true;
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Connection Error Has Occurred - Send cached trip`
            });
            conLost = true;
          }
        )
      } else {
        this.shuttleService.modifyTrip(tripInfo.loadedRowId, tripInfo.passengerNumber, tripInfo.curbNumber, tripInfo.routeId)
          .subscribe
          (success => {
              this.tripWorked(tripKey); //remove key from local storage only on success
              sentTrip = true;
            },
            err => { this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Connection Error Has Occurred - Update cached trip`
            });
              conLost = true;
            })
      }
      if (conLost) {
        this.putCache(this.tripCacheKey, this.tripCache);
        this.isCaching = false;
        break;
      }
      await this.sleep(100);
    }
    this.putCache(this.tripCacheKey, this.tripCache);
    if (sentTrip && !conLost) {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Ready for next trip'
      });
    }
    this.isCaching = false;
  }

  private tripWorked(key){
    this.removeCache(key); //remove key from local storage only on success
    this.tripCache.shift();
  }

  putCache(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  removeCache(key: string): void {
    localStorage.removeItem(key);
  }

  nowCaching(): boolean {
    return this.isCaching;
  }

  getTripCacheKey(): string {
    return this.tripCacheKey;
  }

  initializeTripCache(): void{
    this.tripCache = this.getCache(this.tripCacheKey);

    if (this.tripCache == null){
      this.tripCache= new Array<string>();
      this.putCache(this.tripCacheKey, this.tripCache);
    }
  }
}
