import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolformComponent } from './petrolform.component';

describe('PetrolformComponent', () => {
  let component: PetrolformComponent;
  let fixture: ComponentFixture<PetrolformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
