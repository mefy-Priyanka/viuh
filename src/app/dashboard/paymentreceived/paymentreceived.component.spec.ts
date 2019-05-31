import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreceivedComponent } from './paymentreceived.component';

describe('PaymentreceivedComponent', () => {
  let component: PaymentreceivedComponent;
  let fixture: ComponentFixture<PaymentreceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
