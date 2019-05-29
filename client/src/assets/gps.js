var myObj, myJSON, y;

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
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame()
  {
    if (pos == 350)
    {
      clearInterval(id);
    }
    else
    {
      pos++;
      console.log(pos)
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}


