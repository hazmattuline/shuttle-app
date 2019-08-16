import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleDayComponent } from './shuttle-day.component';

describe('ShuttleDayComponent', () => {
  let component: ShuttleDayComponent;
  let fixture: ComponentFixture<ShuttleDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
