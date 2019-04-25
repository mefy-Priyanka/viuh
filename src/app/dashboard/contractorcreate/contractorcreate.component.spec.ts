import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorcreateComponent } from './contractorcreate.component';

describe('ContractorcreateComponent', () => {
  let component: ContractorcreateComponent;
  let fixture: ComponentFixture<ContractorcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
