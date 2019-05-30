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
  var pos = y;
  var id = setInterval(frame, 15);
  function frame()
  {
    if (pos > 42.5)
    {
      console.log("here");
      myAnimation.style.position = 'absolute';
      myAnimation.style.coords
    }
    else
    {
      //pos++;
      console.log(pos)
     // elem.style.top = pos + 'px';
      //elem.style.left = pos + 'px';
      //elem.style.right = pos + 'px';

    }
  }
}


