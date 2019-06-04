import { Component, OnInit } from '@angular/core';


declare var toggle: any;

@Component
({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit
 {
  
  tog()
  {
    new toggle();
  }
  constructor() { }

  ngOnInit() {
  }

}
