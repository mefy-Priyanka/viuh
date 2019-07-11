import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetdetailComponent } from './fleetdetail.component';

describe('FleetdetailComponent', () => {
  let component: FleetdetailComponent;
  let fixture: ComponentFixture<FleetdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
