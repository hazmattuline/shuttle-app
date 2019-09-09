import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleDayDetailsComponent } from './shuttle-day-details.component';

describe('ShuttleDayDetailsComponent', () => {
  let component: ShuttleDayDetailsComponent;
  let fixture: ComponentFixture<ShuttleDayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleDayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttleDayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
