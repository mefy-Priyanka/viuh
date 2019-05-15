import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaprouteComponent } from './maproute.component';

describe('MaprouteComponent', () => {
  let component: MaprouteComponent;
  let fixture: ComponentFixture<MaprouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaprouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaprouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
