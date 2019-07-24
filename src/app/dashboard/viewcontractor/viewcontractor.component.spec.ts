import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcontractorComponent } from './viewcontractor.component';

describe('ViewcontractorComponent', () => {
  let component: ViewcontractorComponent;
  let fixture: ComponentFixture<ViewcontractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
