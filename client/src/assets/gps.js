
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
  
  var elem1 = document.getElementById("animate1");
  var elem2 = document.getElementById("animate2");
  var elem3 = document.getElementById("animate3");
  var elem4 = document.getElementById("animate4");
  var elem5 = document.getElementById("animate5");
  var elem6 = document.getElementById("animate6");
  var elem7 = document.getElementById("animate7");
  var elem8 = document.getElementById("animate8");
  var elem9 = document.getElementById("animate9");
  var elem10 = document.getElementById("animate10");
  /*elem.style.top = '20px';
  elem.style.left = '300px'; */

  var lat1 = 42.523278; // biggest latitude in image
  var lon1 = -87.971868; // smallest longitude in image
  var lat3 = 42.513481; // smallest latitude in image
  var lon3 = -87.952126;  // biggest longitude in image

  var lats = [];
  var lons = [];

 //H1 pond 42.521774,-87.95953
 var lat2 = 42.521774;
 var lon2 =  -87.95953; 
 lats.push(lat2);
 lons.push(lon2);

  //Under H1 
  var lat2 = 42.520177;
  var lon2 = -87.957892;
  lats.push(lat2);
  lons.push(lon2);

  // Front of H2 42.514972, -87.954458
 var lat2 = 42.514972;
 var lon2 =  -87.954458;
 lats.push(lat2);
 lons.push(lon2);

  // bend of road - 42.520050, -87.952599
 var lat2 = 42.520050;
 var lon2 =  -87.952599;
 lats.push(lat2);
 lons.push(lon2);
 
// grass boundary - 42.520041, -87.956545
//var lat2 = 42.520041;
//var lon2 = -87.956545;

 // leftmost warehouse
 var lat2 = 42.521171;
 var lon2 = -87.969865;
 lats.push(lat2);
 lons.push(lon2);

 // rightmost warehouse 42.519214,-87.964078
 var lat2 = 42.519214;
 var lon2 = -87.964078;
 lats.push(lat2);
 lons.push(lon2);

 //behindH1
 //var lat2 = 42.520449;
 //var lon2 = -87.959579;
 
 
 // middle of grass - 42.516505, -87.961380 
 var lat2 = 42.516505;
 var lon2 = -87.961380;
 lats.push(lat2);
 lons.push(lon2);

 // road between warehouses - 42.522424, -87.966594
 var lat2 = 42.522424;
 var lon2 = -87.966594;
 lats.push(lat2);
 lons.push(lon2);

 //bottom right rightmost warehouse - 42.516592, -87.962571
 //var lat2 = 42.516592;
 //var lon2 = -87.962571;

 // middle bottom right warehouse - 42.516307, -87.964041
 var lat2 = 42.516307;
 var lon2 =  -87.964041;
 lats.push(lat2);
 lons.push(lon2);

 // Bristol Pottery - 42.513734, -87.969400
 var lat2 = 42.513734;
 var lon2 =  -87.969400;
 lats.push(lat2);
 lons.push(lon2);


  var height = 600;
  var width = 900;
  //var degree_length_lat = 69;
  //var degree_length_long_equator = 60; //69.172

  //var londist = (lon2-lon1)*Math.cos(Math.abs(lat2)) * 60;
  // latitude is pretty constant
  //var latdist = (lat1-lat2) * degree_length_lat;
  //var latdist = (lat1-lat2)*Math.cos(Math.abs(lon2)) * 69.172;

  var londists = [];
  var latdists = [];

  for (i = 0; i < lats.length; i++) {
    var londist = (lons[i]-lon1)*Math.cos(Math.abs(lats[i]));
    // latitude is pretty constant
    var latdist = (lat1-lats[i]);
    latdists.push(latdist);
    londists.push(londist);

  }

  

  //var maxlatdist = (lat1-lat3)*Math.cos((lon1+lon3)/2) * 69.172; //(lon1+lon3)/2
  var maxlatdist = (lat1-lat3); 
  var maxlondist = (lon3-lon1)*(Math.cos(lat1)+Math.cos(lat3))/2; // (lat1+lat3)/2

  // console.log("lon= "+londist);
  // console.log("lat= " +latdist);
  // console.log("maxlat= " + maxlatdist);
  // console.log("maxlon= " +maxlondist);


  var posxs = [];
  var posys = [];

  for (i = 0; i < lats.length; i++) {
    var posx = (londists[i])/(maxlondist)*width - 25*(latdists[i]/maxlatdist);//60*Math.pow(londist/maxlondist, 1.5);
  
    if (lats[i] > (lat1+lat3)/2) {
      var posy = (latdists[i])/(maxlatdist)*height + 125;
    }
    else {
      var posy = (latdists[i])/(maxlatdist)*height + 100;
    }
    posxs.push(posx);
    posys.push(posy);
  }
  
  
  // PIECEWISE APPROACH
  /*var maxlondist = (lon3-lon1)*Math.cos((lat1+lat3)/2); // (lat1+lat3)/2

  console.log("lon= "+londist);
  console.log("lat= " +latdist);
  console.log("maxlat= " + maxlatdist);
  console.log("maxlon= " +maxlondist);


  if (lon2 > (lon1+lon3)/2) {
    var posx = (londist)/(maxlondist)*width - 50*(londist/maxlondist);
    if (posx > 700) {
      console.log("entered 700");
      posx = (londist)/(maxlondist)*width - 20*(latdist/maxlatdist);
      //posx = (londist)/(maxlondist)*width - 40*(londist/maxlondist);
    }
  }
  else {
    var posx = (londist)/(maxlondist)*width - 25*(latdist/maxlatdist);//60*Math.pow(londist/maxlondist, 1.5);
  }
  if (lat2 > (lat1+lat3)/2) {
    var posy = (latdist)/(maxlatdist)*height + 125;
  }
  else {
    var posy = (latdist)/(maxlatdist)*height + 100;
  }
  */
  

  // console.log("posx="+posx)
  // console.log("posy="+posy);
  console.log("posxs="+posxs);
  console.log("posys="+posys);

  elem1.style.top = posys[0] + 'px';
  elem1.style.left = posxs[0] + 'px';
  elem2.style.top = posys[1] + 'px';
  elem2.style.left = posxs[1] + 'px';
  elem3.style.top = posys[2] + 'px';
  elem3.style.left = posxs[2] + 'px';
  elem4.style.top = posys[3] + 'px';
  elem4.style.left = posxs[3] + 'px';
  elem5.style.top = posys[4] + 'px';
  elem5.style.left = posxs[4] + 'px';
  elem6.style.top = posys[5] + 'px';
  elem6.style.left = posxs[5] + 'px';
  elem7.style.top = posys[6] + 'px';
  elem7.style.left = posxs[6] + 'px';
  elem8.style.top = posys[7] + 'px';
  elem8.style.left = posxs[7] + 'px';
  elem9.style.top = posys[8] + 'px';
  elem9.style.left = posxs[8] + 'px';
  elem10.style.top = posys[9] + 'px';
  elem10.style.left = posxs[9] + 'px';


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

//ONLY ONE DOT
// function myMove()
//  {
  
//   var elem1 = document.getElementById("animate1");
//   var elem2 = document.getElementById("animate2");
//   var elem3 = document.getElementById("animate3");
//   var elem4 = document.getElementById("animate4");
//   var elem5 = document.getElementById("animate5");
//   var elem6 = document.getElementById("animate6");
//   var elem7 = document.getElementById("animate7");
//   var elem8 = document.getElementById("animate8");
//   var elem9 = document.getElementById("animate9");
//   var elem10 = document.getElementById("animate10");
//   /*elem.style.top = '20px';
//   elem.style.left = '300px'; */

//   var lat1 = 42.523278; // biggest latitude in image
//   var lon1 = -87.971868; // smallest longitude in image
//   var lat3 = 42.513481; // smallest latitude in image
//   var lon3 = -87.952126;  // biggest longitude in image

//  //H1 pond 42.521774,-87.95953
//  //var lat2 = 42.521774;
//  //var lon2 =  -87.95953; 

//   //Under H1 
//   //var lat2 = 42.520177;
//   //var lon2 = -87.957892;

//   // Front of H2 42.514972, -87.954458
//  //var lat2 = 42.514972;
//  //var lon2 =  -87.954458;

//   // bend of road - 42.520050, -87.952599
//  //var lat2 = 42.520050;
//  //var lon2 =  -87.952599;
 
// // grass boundary - 42.520041, -87.956545
// //var lat2 = 42.520041;
// //var lon2 = -87.956545;

//  // leftmost warehouse
//  //var lat2 = 42.521171;
//  //var lon2 = -87.969865;

//  // rightmost warehouse 42.519214,-87.964078
//  //var lat2 = 42.519214;
//  //var lon2 = -87.964078;

//  //behindH1
//  //var lat2 = 42.520449;
//  //var lon2 = -87.959579;
 
 
//  // middle of grass - 42.516505, -87.961380 
//  //var lat2 = 42.516505;
//  //var lon2 = -87.961380;

//  // road between warehouses - 42.522424, -87.966594
//  //var lat2 = 42.522424;
//  //var lon2 = -87.966594;

//  //bottom right rightmost warehouse - 42.516592, -87.962571
//  var lat2 = 42.516592;
//  var lon2 = -87.962571;

//  // middle bottom right warehouse - 42.516307, -87.964041
//  //var lat2 = 42.516307;
//  //var lon2 =  -87.964041;

//  // Bristol Pottery - 42.513734, -87.969400
//  var lat2 = 42.513734;
//  var lon2 =  -87.969400;


//   var height = 600;
//   var width = 900;
//   //var degree_length_lat = 69;
//   //var degree_length_long_equator = 60; //69.172

//   //var londist = (lon2-lon1)*Math.cos(Math.abs(lat2)) * 60;
//   // latitude is pretty constant
//   //var latdist = (lat1-lat2) * degree_length_lat;
//   //var latdist = (lat1-lat2)*Math.cos(Math.abs(lon2)) * 69.172;



//   var londist = (lon2-lon1)*Math.cos(Math.abs(lat2));
//   // latitude is pretty constant
//   var latdist = (lat1-lat2);

//   //var maxlatdist = (lat1-lat3)*Math.cos((lon1+lon3)/2) * 69.172; //(lon1+lon3)/2
//   var maxlatdist = (lat1-lat3); 
//   var maxlondist = (lon3-lon1)*(Math.cos(lat1)+Math.cos(lat3))/2; // (lat1+lat3)/2

//   console.log("lon= "+londist);
//   console.log("lat= " +latdist);
//   console.log("maxlat= " + maxlatdist);
//   console.log("maxlon= " +maxlondist);


  
//   var posx = (londist)/(maxlondist)*width - 25*(latdist/maxlatdist);//60*Math.pow(londist/maxlondist, 1.5);
  
//   if (lat2 > (lat1+lat3)/2) {
//     var posy = (latdist)/(maxlatdist)*height + 125;
//   }
//   else {
//     var posy = (latdist)/(maxlatdist)*height + 100;
//   }
  
//   // PIECEWISE APPROACH
//   /*var maxlondist = (lon3-lon1)*Math.cos((lat1+lat3)/2); // (lat1+lat3)/2

//   console.log("lon= "+londist);
//   console.log("lat= " +latdist);
//   console.log("maxlat= " + maxlatdist);
//   console.log("maxlon= " +maxlondist);


//   if (lon2 > (lon1+lon3)/2) {
//     var posx = (londist)/(maxlondist)*width - 50*(londist/maxlondist);
//     if (posx > 700) {
//       console.log("entered 700");
//       posx = (londist)/(maxlondist)*width - 20*(latdist/maxlatdist);
//       //posx = (londist)/(maxlondist)*width - 40*(londist/maxlondist);
//     }
//   }
//   else {
//     var posx = (londist)/(maxlondist)*width - 25*(latdist/maxlatdist);//60*Math.pow(londist/maxlondist, 1.5);
//   }
//   if (lat2 > (lat1+lat3)/2) {
//     var posy = (latdist)/(maxlatdist)*height + 125;
//   }
//   else {
//     var posy = (latdist)/(maxlatdist)*height + 100;
//   }
//   */
  

//   console.log("posx="+posx)
//   console.log("posy="+posy);

//   elem.style.top = posy + 'px';
//   elem.style.left = posx + 'px';


//  // var lat = 42.521774;
//  // var long =  -87.95953;
  
  
//   /*var R = 6371e3; // metres
//   var φ1 = lat1.toRadians();
//   var φ2 = lat2.toRadians();
//   var Δφ = (lat2-lat1).toRadians();
//   var Δλ = (lon2-lon1).toRadians();

//   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//           Math.cos(φ1) * Math.cos(φ2) *
//           Math.sin(Δλ/2) * Math.sin(Δλ/2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   var d = R * c;

//   var y = Math.sin(λ2-λ1) * Math.cos(φ2);
//   var x = Math.cos(φ1)*Math.sin(φ2) -
//         Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
//   var brng = Math.atan2(y, x).toDegrees();*/

//   /*lat = 42.515204;
//   long = -87.958983;
//   var posx = (long + 87.971868)/(87.971868 - 87.952148)*width;
//   var posy = 200 + (42.523278 - lat)/(42.523278 - 42.513038)*height;

//   console.log("posx="+posx)
//   console.log("posy="+posy);

//   elem.style.top = posy + 'px';
//   elem.style.left = posx + 'px';

//   */
//   /*
//   elem.style.top = posy + 'px';
//   elem.style.left = posx + 'px';
//   if (posx > 600 || posy < 900)
//   {
//       clearInterval(id);
//   }*/

//   /*var elem = document.getElementById("animate");
//   var posx = 0;
//   var posy = 200;
//   var id = setInterval(frame, 10);
//   function frame()
//   {
//     if (posx == 350 || posy == 350)
//     {
//       clearInterval(id);
//     }
//     else
//     {
//       posx++;
//       console.log(posx)
//       elem.style.top = posy + 'px';
//       elem.style.left = posx + 'px';
//     }
//   }*/
// }