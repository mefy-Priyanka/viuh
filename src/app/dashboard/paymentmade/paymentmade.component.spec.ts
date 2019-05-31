import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmadeComponent } from './paymentmade.component';

describe('PaymentmadeComponent', () => {
  let component: PaymentmadeComponent;
  let fixture: ComponentFixture<PaymentmadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentmadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentmadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
