import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
  <div>
      Welcome {{name}}.
  </div>
  <h2> {{2+2}}
  </h2>
  <h2> {{"Goodbye " + name}}
  </h2>
  <h2> {{"The name is " + name.length + " long"}}
  </h2>
  <h2> {{name.toUpperCase() }}
  </h2>

  <h2> {{greetUser() }}
  </h2>
  <h2> {{ siteURL }}
  </h2>
  <input type="text" value="Uline">
  <br>
  <input [id] = "myId" type = "text" value = "ABC">

                `,
  styles: [`
    div {
      color:gray;
      font-size: 150%;
    }`]
})
export class TestComponent implements OnInit {
  public name = 'Awesome';
  public siteURL = window.location.href;
  public myId = 'testId';

  constructor() { }

  ngOnInit() {
  }
  
  greetUser() {
    return 'Hello, ' + this.name;
  }
}
