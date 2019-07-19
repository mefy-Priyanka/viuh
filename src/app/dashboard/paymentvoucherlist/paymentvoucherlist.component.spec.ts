import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentvoucherlistComponent } from './paymentvoucherlist.component';

describe('PaymentvoucherlistComponent', () => {
  let component: PaymentvoucherlistComponent;
  let fixture: ComponentFixture<PaymentvoucherlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentvoucherlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentvoucherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
