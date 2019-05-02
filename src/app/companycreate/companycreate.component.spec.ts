import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycreateComponent } from './companycreate.component';

describe('CompanycreateComponent', () => {
  let component: CompanycreateComponent;
  let fixture: ComponentFixture<CompanycreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanycreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
