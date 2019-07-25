import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Petrolform2Component } from './petrolform2.component';

describe('Petrolform2Component', () => {
  let component: Petrolform2Component;
  let fixture: ComponentFixture<Petrolform2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Petrolform2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Petrolform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
