import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartshiftComponent } from './startshift.component';

describe('StartshiftComponent', () => {
  let component: StartshiftComponent;
  let fixture: ComponentFixture<StartshiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartshiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
