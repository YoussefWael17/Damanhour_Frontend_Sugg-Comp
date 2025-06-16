import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificComplaintComponent } from './specific-complaint.component';

describe('SpecificComplaintComponent', () => {
  let component: SpecificComplaintComponent;
  let fixture: ComponentFixture<SpecificComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
