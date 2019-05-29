import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactvendorComponent } from './contactvendor.component';

describe('ContactvendorComponent', () => {
  let component: ContactvendorComponent;
  let fixture: ComponentFixture<ContactvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
