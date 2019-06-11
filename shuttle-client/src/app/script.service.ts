import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  constructor() { }
  x;
  print1()
  {
    this.x=7;
    console.log(this.x) ;
  }


}
