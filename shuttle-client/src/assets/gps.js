
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


  var lat1 = 42.523300; // biggest latitude in image
  var lon1 = -87.971642; // smallest longitude in image
  var lat3 = 42.5130865; // smallest latitude in image
  var lon3 = -87.951814;  // biggest longitude in image

  var lats = [];
  var lons = [];


 var lat2 = x;
 var lon2 = y; 

 lats.push(lat2);
 lons.push(lon2);

  var height = 600;
  var width = 900;
  
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
    if (lats[i] < H2boundary && lons[i] < h2lonbound) {
      var posx = (londists[i])/(maxlondist)*width + 3; 
      
    }
    else if ((lats[i] < H2boundary) && (lons[i] > h2lonbound)) {
      var posx = (londists[i])/(maxlondist)*width + 3; 
    }
    else if ((lats[i] >= H2boundary) && (lats[i] <= hwyboundary1)) {
      var posx = (londists[i])/(maxlondist)*width - 6; 
    }
    else if (lats[i] > hwyboundary1 && lats[i] < hwyboundary2) {
      var posx = (londists[i])/(maxlondist)*width - 15; 
    }
    else if (lats[i] > hwyboundary2 && lons[i] > h2lonbound) {
      var posx = (londists[i])/(maxlondist)*width - 30; 
    } 
    else  {
      var posx = (londists[i])/(maxlondist)*width - 27;
    }

    if (lats[i] > H1boundary) {
      var posy = (latdists[i])/(maxlatdist)*height;
    }
    else {
      var posy = (latdists[i])/(maxlatdist)*height - 6;
    }
    posxs.push(posx);
    posys.push(posy);
  }
  

  elem1.style.top = posys[0] + 'px';
  elem1.style.left = posxs[0] + 'px';
}

