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
// declare var myObj;
// declare var myJSON;
// declare var x;
// declare var y;
// declare var watchID;
title = 'Shuttle';

f()
{
    new getLocation();
  }
move()
{
    new myMove();
  }

// makeIdleDriver() 
// {
//     let image = document.getElementById('animate1');
//     const image.src = 'blue.png';
//   }

// unmakeIdleDriver() 
// {
//     var image = document.getElementById('animate1');
//     image.src = 'red.png';
//   }

// getLocation()
// {
//     if (navigator.geolocation)
//      {

//       let watchID = navigator.geolocation.watchPosition(showPosition);

//       }
//       else
//       {
//        const x.innerHTML = 'Geolocation is not supported by this browser.';
//       }
//   }


}