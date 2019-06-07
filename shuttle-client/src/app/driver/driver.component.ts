import { Component, OnInit } from '@angular/core';
import { ScriptService} from '../script.service';

declare var toggle: any;
declare var newtog: any;
declare var newcell: any;
declare var inactivate: any;
declare var promptMe: any;
declare var fuel: any;

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
  tog2()
  {
    new newtog();
  }
  check()
  {
    new newcell();
  }
  stop()
  {
    new inactivate();
  }
  prompt()
  {
    new promptMe();
  }
  get()
  {
    new fuel();
  }

  constructor() { }
  ngOnInit() 
  {
 

  }
  //source;
  //constructor(private scriptService: ScriptService) { }

   /*ngOnInit() 
  {
    this.source = this.scriptService.print1;
    console.log(this.source);

  }

  have()
  {
    this.source = this.scriptService.print1;
    console.log(this.source);

  }*/
}
