import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleVehiclesComponent } from './shuttle-vehicles.component';

describe('ShuttleVehiclesComponent', () => {
  let component: ShuttleVehiclesComponent;
  let fixture: ComponentFixture<ShuttleVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttleVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
