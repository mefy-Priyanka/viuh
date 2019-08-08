import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactvendoreditComponent } from './contactvendoredit.component';

describe('ContactvendoreditComponent', () => {
  let component: ContactvendoreditComponent;
  let fixture: ComponentFixture<ContactvendoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactvendoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactvendoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
