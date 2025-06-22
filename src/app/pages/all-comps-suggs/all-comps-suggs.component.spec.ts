import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompsSuggsComponent } from './all-comps-suggs.component';

describe('AllCompsSuggsComponent', () => {
  let component: AllCompsSuggsComponent;
  let fixture: ComponentFixture<AllCompsSuggsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCompsSuggsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCompsSuggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
