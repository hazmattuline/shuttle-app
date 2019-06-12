import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
}
)
export class ScriptService {

  xy: number;

  constructor() { }

  print1(x)
  {    
    this.xy = x;
    console.log(this.xy); 
  }
  printx(): number
  {
    return this.xy; 
  }
  


}

