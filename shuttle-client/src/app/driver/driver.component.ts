import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../script.service';



@Component
({
selector: 'app-driver',
templateUrl: './driver.component.html',
styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit
{

constructor(private supportService: ScriptService) {}
  ngOnInit() { }

}