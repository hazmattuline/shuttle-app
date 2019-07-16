import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndshiftComponent } from './endshift.component';

describe('EndshiftComponent', () => {
  let component: EndshiftComponent;
  let fixture: ComponentFixture<EndshiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndshiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
