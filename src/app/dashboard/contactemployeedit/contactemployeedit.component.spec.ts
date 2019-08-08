import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactemployeeditComponent } from './contactemployeedit.component';

describe('ContactemployeeditComponent', () => {
  let component: ContactemployeeditComponent;
  let fixture: ComponentFixture<ContactemployeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactemployeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactemployeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
