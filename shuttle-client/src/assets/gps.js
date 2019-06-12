
var myObj, myJSON, x, y, watchID;


function makeIdleDriver() {
  var image = document.getElementById('animate1');
  image.src = "blue.png";
}

function unmakeIdleDriver() {
  var image = document.getElementById('animate1');
  image.src = "red.png";
}

function getLocation()
   {
  if (navigator.geolocation)
   {

    watchID = navigator.geolocation.watchPosition(showPosition);

    }
    else
    {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position)
{
  //42.514959, -87.953800
 x = position.coords.latitude;
 y = position.coords.longitude;
 


myMove()
}

function showCoords() 
{
return x;
}


function inactivate(button) 
{  
  switch (button.value) 
    {
        case "TURN OFF":
        getLocation();
            
        break;

        case "TURN ON":
        navigator.geolocation.clearWatch(watchID);
        break;
    }

}

// global variables
var lat, long;
function showPos(position)
{
  
 lat = position.coords.latitude;
 long = position.coords.longitude;
 return;

}


function calculateH1Time() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPos);
    var x = lat;
    var y = long;
    
    // need a way to factor in direction
    if (x > 42.52) {
      if (y > -87.956220) {
        document.getElementById("H1time").innerHTML="Time to H1 is 2 minutes";

      }
      else {
        document.getElementById("H1time").innerHTML="Time to H1 is <1 minute";
      }
    }
    else { 
      document.getElementById("H1time").innerHTML="Time to H1 is >2 minutes";
    }

  }
}
function calculateH2Time() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPos);
    var x = lat;
    var y = long;
    
    
    // need a way to factor in direction
    if (x > 42.52) {
      if (y > -87.956220) {
        document.getElementById("H2time").innerHTML="Time to H2 is 2 minutes";

      }
      else {
        document.getElementById("H2time").innerHTML="Time to H2 is <1 minute";
      }
    }
    else { 
      document.getElementById("H2time").innerHTML="Time to H2 is >2 minutes";
    }

  }
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
  var elem11 = document.getElementById("animate11");
  var elem12 = document.getElementById("animate12");
  var elem13 = document.getElementById("animate13");
  var elem14 = document.getElementById("animate14");
  var elem15 = document.getElementById("animate15");
  var elem16 = document.getElementById("animate16");
  var elem17 = document.getElementById("animate17");
  var elem18 = document.getElementById("animate18");
  var elem19 = document.getElementById("animate19");
  var elem20 = document.getElementById("animate20");
  var elem21 = document.getElementById("animate21");
  var elem22 = document.getElementById("animate22");

  // var lat1 = 42.523221; // biggest latitude in image
  // var lon1 = -87.971868; // smallest longitude in image
  // var lat3 = 42.513481; // smallest latitude in image
  // var lon3 = -87.952126;  // biggest longitude in image

  var lat1 = 42.523300; // biggest latitude in image
  var lon1 = -87.971642; // smallest longitude in image
  var lat3 = 42.5130865; // smallest latitude in image
  var lon3 = -87.951814;  // biggest longitude in image

  var lats = [];
  var lons = [];

 //H1 left 42.522131, -87.960058
 var lat2 = 42.522131;
 var lon2 = -87.960058; 
 lats.push(lat2);
 lons.push(lon2);

  //H1 pickup - 42.521301, -87.959559 
  var lat2 = 42.521301;
  var lon2 =  -87.959559;
  lats.push(lat2);
  lons.push(lon2);

  // H1 right - 42.522068, -87.959082
 var lat2 = 42.522068;
 var lon2 = -87.959082;
 lats.push(lat2);
 lons.push(lon2);

  // H1 entering parking lot - 42.522143, -87.956657
 var lat2 = 42.522143;
 var lon2 =  -87.956657;
 lats.push(lat2);
 lons.push(lon2);
 
// grass boundary - 42.520041, -87.956545
//var lat2 = 42.520041;
//var lon2 = -87.956545;

 // near H1 on route - 42.520969, -87.954506
 var lat2 = 42.520969;
 var lon2 =  -87.954506;
 lats.push(lat2);
 lons.push(lon2);

 // H2 left of door - 42.515357, -87.953827
 var lat2 = 42.515357;
 var lon2 = -87.953827;
 lats.push(lat2);
 lons.push(lon2);

 //behindH1
 //var lat2 = 42.520449;
 //var lon2 = -87.959579;
 
 
 // H2 - middle right - 42.514566, -87.953792
 var lat2 = 42.514566;
 var lon2 = -87.953792;
 lats.push(lat2);
 lons.push(lon2);

 // H2 touching highway - 42.515021, -87.952295
 var lat2 = 42.515021;
 var lon2 = -87.952295;
 lats.push(lat2);
 lons.push(lon2);

 //bottom right rightmost warehouse - 42.516592, -87.962571
 //var lat2 = 42.516592;
 //var lon2 = -87.962571;

 // H2 right before door - 42.515088, -87.954471
 var lat2 = 42.515088;
 var lon2 = -87.954471;
 lats.push(lat2);
 lons.push(lon2);

 // On highway middle near H2 - 42.518583, -87.952389
 var lat2 = 42.518583;
 var lon2 =  -87.952389;
 lats.push(lat2);
 lons.push(lon2);

 // 11 On highway just leaving H2 - 42.515481,-87.952282
 var lat2 = 42.515481;
 var lon2 =  -87.952282;
 lats.push(lat2);
 lons.push(lon2);

 // 12 On highway H2 - in front of left lot - 42.515887, -87.952303
 var lat2 = 42.515887;
 var lon2 =  -87.952303;
 lats.push(lat2);
 lons.push(lon2);

 //13 H2_highwaybyedgeoflot - 42.516456, -87.952357
 var lat2 = 42.516456;
 var lon2 =  -87.952357;
 lats.push(lat2);
 lons.push(lon2);

 // 14 highway_H1_towardstoppartofloop - 42.521580, -87.956123
 var lat2 = 42.521580;
 var lon2 =  -87.956123;
 lats.push(lat2);
 lons.push(lon2);

 // 15 H1_near centerofloop - 42.521359, -87.955715
 var lat2 = 42.521359;
 var lon2 =  -87.955715;
 lats.push(lat2);
 lons.push(lon2);

 // 16 H1_nearingcurveinroad_afterloop - 42.520734, -87.953746
 var lat2 = 42.520734;
 var lon2 =  -87.953746;
 lats.push(lat2);
 lons.push(lon2);

 // 17 H1 closer to curve of road - 42.520335, -87.952985
 var lat2 = 42.520335;
 var lon2 = -87.952985;
 lats.push(lat2);
 lons.push(lon2); 

 // 18 H2 - highway by parking lot - 42.516120, -87.952277
 var lat2 = 42.516120;
 var lon2 =  -87.952277;
 lats.push(lat2);
 lons.push(lon2);

 // 19 H1 near curve in road - 42.519931, -87.952559
 var lat2 = 42.519931;
 var lon2 =  -87.952559;
 lats.push(lat2);
 lons.push(lon2);


 // 20 H1 right after highway curve - 42.519504, -87.952420
 var lat2 = 42.519504;
 var lon2 =  -87.952420;
 lats.push(lat2);
 lons.push(lon2);

 // 21 r1_middle_highwayforest - 42.517788, -87.952388
 var lat2 = 42.517788;
 var lon2 =  -87.952388;
 lats.push(lat2);
 lons.push(lon2);


 // 22 H2_highwayafterlot - 42.516997, -87.952399
 var lat2 = 42.516997;
 var lon2 = -87.952399;
 lats.push(lat2);
 lons.push(lon2);

 var bearings = [];
 for (i = 0; i < lats.length; i++) {
  var y = Math.sin(lons[i+1]-lons[i]) * Math.cos(lats[i+1]);
  var x = Math.cos(lats[i])*Math.sin(lats[i+1]) - Math.sin(lats[i])*Math.cos(lats[i+1])*Math.cos(lons[i+1]-lons[i]);
  var bearing = Math.atan2(y, x) * 180/Math.PI;
  bearings.push(bearing);
  console.log(bearings);
}


  var height = 316;//600;
  var width = 407;//900;

  
  var londists = [];
  var latdists = [];

  for (i = 0; i < lats.length; i++) {
    var londist = (lons[i]-lon1)*Math.cos(Math.abs(lats[i]));
    // latitude is pretty constant
    var latdist = (lat1-lats[i]);
    latdists.push(latdist);
    londists.push(londist);

  }

  var maxlatdist = (lat1-lat3); 
  var maxlondist = (lon3-lon1)*(Math.cos(lat1)+Math.cos(lat3))/2; // (lat1+lat3)/2

  var posxs = [];
  var posys = [];
  var H2boundary = 42.516;
  var H2door = 42.514;
  var hwyboundary1 = 42.5175;
  var hwyboundary2 = 42.519;
  var H1boundary = 42.52;
  var h2lonbound = -87.953;

  for (i = 0; i < lats.length; i++) {
    // x coordinate
    //phone
    if (lats[i] < H2boundary && lons[i] < h2lonbound) {
      var posx = (londists[i])/(maxlondist)*width + 250; 
      
    }
    else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
      var posx = (londists[i])/(maxlondist)*width + 255; 
    }
    else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
      var posx = (londists[i])/(maxlondist)*width + 250; 
    }
    else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
      var posx = (londists[i])/(maxlondist)*width + 240; 
    }
    else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
      var posx = (londists[i])/(maxlondist)*width + 20; 
    } 
    else /*(lats[i] > hwyboundary1 && lats[i] < H1boundary)*/ {
      var posx = (londists[i])/(maxlondist)*width + 236;
    }
    //desktop
    // if (lats[i] < H2boundary && lons[i] < h2lonbound) {
    //     var posx = (londists[i])/(maxlondist)*width + 3 + 20; 
        
    //   }
    //   else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
    //     var posx = (londists[i])/(maxlondist)*width + 3 + 18; 
    //   }
    //   else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
    //     var posx = (londists[i])/(maxlondist)*width - 6 + 15; 
    //   }
    //   else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
    //     var posx = (londists[i])/(maxlondist)*width - 15 + 15; 
    //   }
    //   else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
    //     var posx = (londists[i])/(maxlondist)*width - 30 + 15; 
    //   } 
    //   else /*(lats[i] > hwyboundary1 && lats[i] < H1boundary)*/ {
    //     var posx = (londists[i])/(maxlondist)*width - 27 + 10;
    //   }


    // y coordinate

    //phone
    if (lats[i] > H1boundary) {
      var posy = (latdists[i])/(maxlatdist)*height + 24;
    }
    else {
      var posy = (latdists[i])/(maxlatdist)*height - 6;
    }

    //desktop
    // if (lats[i] > H1boundary) {
    //   var posy = (latdists[i])/(maxlatdist)*height;
    // }
    // else {
    //   var posy = (latdists[i])/(maxlatdist)*height - 6;
    // }
      
    
    posxs.push(posx);
    posys.push(posy);
  }

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
  elem11.style.top = posys[10] + 'px';
  elem11.style.left = posxs[10] + 'px';
  elem12.style.top = posys[11] + 'px';
  elem12.style.left = posxs[11] + 'px';
  elem13.style.top = posys[12] + 'px';
  elem13.style.left = posxs[12] + 'px';
  elem14.style.top = posys[13] + 'px';
  elem14.style.left = posxs[13] + 'px';
  elem15.style.top = posys[14] + 'px';
  elem15.style.left = posxs[14] + 'px';
  elem16.style.top = posys[15] + 'px';
  elem16.style.left = posxs[15] + 'px';
  elem17.style.top = posys[16] + 'px';
  elem17.style.left = posxs[16] + 'px';
  elem18.style.top = posys[17] + 'px';
  elem18.style.left = posxs[17] + 'px';
  elem19.style.top = posys[18] + 'px';
  elem19.style.left = posxs[18] + 'px';
  elem20.style.top = posys[19] + 'px';
  elem20.style.left = posxs[19] + 'px';
  elem21.style.top = posys[20] + 'px';
  elem21.style.left = posxs[20] + 'px';
  elem22.style.top = posys[21] + 'px';
  elem22.style.left = posxs[21] + 'px';
}
