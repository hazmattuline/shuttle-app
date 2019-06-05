import { Component } from '@angular/core';

//these are my instance variable for my gps.js file

declare var getLocation: any;
declare var myMove: any;

@Component
({
  selector: 'app-driver',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent 
{
  title = 'Shuttle';

  f()
  {
    new getLocation();
  }
  move()
  {
    new myMove();
  }


}
