import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolformviewComponent } from './petrolformview.component';

describe('PetrolformviewComponent', () => {
  let component: PetrolformviewComponent;
  let fixture: ComponentFixture<PetrolformviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolformviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolformviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
