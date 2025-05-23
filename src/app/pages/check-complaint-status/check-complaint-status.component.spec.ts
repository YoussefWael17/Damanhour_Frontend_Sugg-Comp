import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckComplaintStatusComponent } from './check-complaint-status.component';

describe('CheckComplaintStatusComponent', () => {
  let component: CheckComplaintStatusComponent;
  let fixture: ComponentFixture<CheckComplaintStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckComplaintStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckComplaintStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
