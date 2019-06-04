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