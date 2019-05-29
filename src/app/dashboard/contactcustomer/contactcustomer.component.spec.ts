import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactcustomerComponent } from './contactcustomer.component';

describe('ContactcustomerComponent', () => {
  let component: ContactcustomerComponent;
  let fixture: ComponentFixture<ContactcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
