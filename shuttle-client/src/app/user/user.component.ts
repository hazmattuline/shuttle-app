import { Component } from '@angular/core';

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