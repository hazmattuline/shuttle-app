import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  putCache(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  removeCache(key: string): void {
    localStorage.removeItem(key);
  }


}

