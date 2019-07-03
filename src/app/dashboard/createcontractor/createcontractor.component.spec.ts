import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontractorComponent } from './createcontractor.component';

describe('CreatecontractorComponent', () => {
  let component: CreatecontractorComponent;
  let fixture: ComponentFixture<CreatecontractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecontractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
