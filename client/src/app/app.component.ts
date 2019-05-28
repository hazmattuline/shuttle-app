import { Component } from '@angular/core';

//these are my instance variable for my gps.js file

declare var getLocation: any;
declare var myMove: any;

@Component
({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
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
