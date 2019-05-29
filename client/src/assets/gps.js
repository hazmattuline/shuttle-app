
var myObj, myJSON, y;

//import * as math from 'mathjs'

//const math = require('mathjs');

function getLocation()
   {
  if (navigator.geolocation)
   {

    navigator.geolocation.watchPosition(showPosition);

    }
    else
    {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position)
{
  //the code below is just for debugging purposes
  //also the variable for coordinates updates when the coordinate change


 y = position.coords.latitude;
 console.log(y);
 //console.log("ldjflsj");
  document.getElementById("demo").innerHTML="Latitude: " + position.coords.latitude +
                           "<br>Longitude: " + position.coords.longitude;

}

function myMove()
 {
  
  var elem = document.getElementById("animate");
  /*elem.style.top = '20px';
  elem.style.left = '300px'; */

  var lat1 = 42.523278; // biggest latitude in image
  var lon1 = -87.971868; // smallest longitude in image
  var lat3 = 42.513481; // smallest latitude in image
  var lon3 = -87.952126;  // biggest longitude in image

 //H1 pond
 //var lat2 = 42.521774;
  //var lon2 =  -87.95953; 

  //Under H1
  /*var lat2 = 42.520177;
  var lon2 = -87.957892;*/

  // Front of H2
  var lat2 = 42.514972;
  var lon2 =  -87.954458;

  // bend of road
//var lat2 = 42.520050;
 //var lon2 =  -87.952599;
 

 // leftmost warehouse
 //var lat2 = 42.521171;
 // var lon2 = -87.969865;

 // rightmost warehouse
 //var lat2 = 42.519214;
 //var lon2 =  -87.964078;

 //behindH1
 //var lat2 = 42.520449;
 //var lon2 = -87.959579;


  var height = 600;
  var width = 900;

  var londist = (lon2-lon1)*Math.cos(Math.abs(lat2)) * 69.172;
  var latdist = (lat1-lat2)*Math.cos(Math.abs(lon2)) * 69.172;

  var maxlatdist = (lat1-lat3)*Math.cos((lon1+lon3)/2) * 69.172; //(lon1+lon3)/2
  var maxlondist = (lon3-lon1)*Math.cos((lat1+lat3)/2) * 69.172; // (lat1+lat3)/2

  console.log("lon= "+londist);
  console.log("lat= " +latdist);
  console.log("maxlat= " + maxlatdist);
  console.log("maxlon= " +maxlondist);



  var posx = (londist)/(maxlondist)*width - 50*(londist/maxlondist);
  var posy = (latdist)/(maxlatdist)*height + 125;

  console.log("posx="+posx)
  console.log("posy="+posy);

  elem.style.top = posy + 'px';
  elem.style.left = posx + 'px';


 // var lat = 42.521774;
 // var long =  -87.95953;
  
  
  /*var R = 6371e3; // metres
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;

  var y = Math.sin(λ2-λ1) * Math.cos(φ2);
  var x = Math.cos(φ1)*Math.sin(φ2) -
        Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
  var brng = Math.atan2(y, x).toDegrees();*/

  /*lat = 42.515204;
  long = -87.958983;
  var posx = (long + 87.971868)/(87.971868 - 87.952148)*width;
  var posy = 200 + (42.523278 - lat)/(42.523278 - 42.513038)*height;

  console.log("posx="+posx)
  console.log("posy="+posy);

  elem.style.top = posy + 'px';
  elem.style.left = posx + 'px';

  */
  /*
  elem.style.top = posy + 'px';
  elem.style.left = posx + 'px';
  if (posx > 600 || posy < 900)
  {
      clearInterval(id);
  }*/

  /*var elem = document.getElementById("animate");
  var posx = 0;
  var posy = 200;
  var id = setInterval(frame, 10);
  function frame()
  {
    if (posx == 350 || posy == 350)
    {
      clearInterval(id);
    }
    else
    {
      posx++;
      console.log(posx)
      elem.style.top = posy + 'px';
      elem.style.left = posx + 'px';
    }
  }*/
}