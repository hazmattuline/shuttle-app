import { Component, OnInit } from '@angular/core'; 
import { ScriptService } from '../script.service';



@Component 
({ 
selector: 'app-driver', 
templateUrl: './driver.component.html', 
styleUrls: ['./driver.component.css'] 
}) 
export class DriverComponent implements OnInit 
{ 

constructor(private supportService: ScriptService) {}


ngOnInit() { }


count: number = 0; 
watchID; 


toggle1(){
this.count++;
console.log(this.count);
if (this.count%2 == 0){document.getElementById("demo").innerHTML="OFF";}
else {document.getElementById("demo").innerHTML="ON";}}


newtog(){ 
this.count++;
if (this.count%2 == 0){alert("YOU ARE NOW INACTIVE"); 
document.getElementById("demo2").innerHTML="Inactive";}
else{alert("YOU ARE NOW ACTIVE"); 
document.getElementById("demo2").innerHTML="Active";}}


newcell(){ var r = confirm("ARE YOU SURE!"); 
if (r == true){} // find row to copy 
/* send something to database*/ 
else { /*send nothing*/}} 


promptMe(){ 
if (this.count%2 == 0){
var endMi = prompt("What is the ending Mileage pleaase?");
var fuelAm = prompt("Home much Fuel went in today?"); 
var fuelCos = prompt("What was the cost of the fuel?"); }
else{
var vehicleResp = prompt("Please Enter The Vehicle you will be using today"); 
var beginMi = prompt("What is the starting mileage please?"); }}
inactivate(){if (this.count%2 == 0){
navigator.geolocation.clearWatch(this.watchID); 
console.log("disabled tracking")}
else{this.getLocation();}} 


getLocation(){if (navigator.geolocation){ 
this.watchID = navigator.geolocation.watchPosition(this.showPosition);} 
else{document.getElementById("demo").innerHTML= "Geolocation is not supported by this browser.";}} 
showPosition(position){document.getElementById("demo3").innerHTML="Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude; 
var x = position.coords.latitude; 
var y = position.coords.longitude; 
console.log(x); 
console.log(y);}}