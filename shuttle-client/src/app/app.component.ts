import { Component } from '@angular/core';

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