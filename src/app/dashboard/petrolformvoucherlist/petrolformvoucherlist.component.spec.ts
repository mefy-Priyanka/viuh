import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolformvoucherlistComponent } from './petrolformvoucherlist.component';

describe('PetrolformvoucherlistComponent', () => {
  let component: PetrolformvoucherlistComponent;
  let fixture: ComponentFixture<PetrolformvoucherlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolformvoucherlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolformvoucherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
