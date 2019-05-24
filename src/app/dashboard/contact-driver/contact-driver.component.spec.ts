import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDriverComponent } from './contact-driver.component';

describe('ContactDriverComponent', () => {
  let component: ContactDriverComponent;
  let fixture: ComponentFixture<ContactDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
