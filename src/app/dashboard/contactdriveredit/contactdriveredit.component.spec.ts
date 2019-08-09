import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdrivereditComponent } from './contactdriveredit.component';

describe('ContactdrivereditComponent', () => {
  let component: ContactdrivereditComponent;
  let fixture: ComponentFixture<ContactdrivereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactdrivereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdrivereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
