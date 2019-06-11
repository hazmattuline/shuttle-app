
    var count = 0;

    function toggle(button) 
    {
    
        switch (button.value) 
        {
            case "ON":
                button.value = "OFF";
                document.getElementById("demo").innerHTML="OFF";
                break;
            case "OFF":
                button.value = "ON";
                document.getElementById("demo").innerHTML="ON";
    
                break;
        }
    }
    
    function newtog(button)
    {
        switch (button.value) 
        {
            case "TURN ON":
            button.value = "TURN OFF";
                alert("YOU ARE NOW ACTIVE");
                break;
            case "TURN OFF":
            button.value = "TURN ON";
            alert("YOU ARE NOW INACTIVE");
                
                break;
        }
    
    }
    
    function newcell() 
    {
        
        var r = confirm("ARE YOU SURE!");
        if (r == true) 
        {
            // send something to database
          count++;
          var row = document.getElementById("rowToClone"); // find row to copy
          var table = document.getElementById("tableToModify"); // find table to append to
          var clone = row.cloneNode(true); // copy children too
          clone.id = "newID"; // change id or other attributes/contents
          table.appendChild(clone); // add new row to end of table
    
          //document.getElementById("mySelect").disabled=true;
    
            if (count >= 3)
            {
                count--;
    
                document.getElementById("myTable").deleteRow(0);
            }
        } 
        else 
        {
            // send nothing
        }
        
    }
    
    
    
    function promptMe(button)
    {
        switch (button.value) 
        {
            case "TURN OFF":
                var vehicleResp = prompt("Please Enter The Vehicle you will be using today");
                var beginMi = prompt("What is the starting mileage please?");
    
                
                break;
            case "TURN ON":
                var endMi = prompt("What is the ending Mileage?");
                break;
        }
    }
    
    function fuel()
    {
        var fuelAm = prompt("Home much Fuel went in?");
        var fuelCos = prompt("What was the cost of the fuel?");
    }