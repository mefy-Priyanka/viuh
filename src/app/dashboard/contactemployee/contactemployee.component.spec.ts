import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactemployeeComponent } from './contactemployee.component';

describe('ContactemployeeComponent', () => {
  let component: ContactemployeeComponent;
  let fixture: ComponentFixture<ContactemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
