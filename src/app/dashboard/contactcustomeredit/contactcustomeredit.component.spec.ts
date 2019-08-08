import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactcustomereditComponent } from './contactcustomeredit.component';

describe('ContactcustomereditComponent', () => {
  let component: ContactcustomereditComponent;
  let fixture: ComponentFixture<ContactcustomereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactcustomereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactcustomereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
