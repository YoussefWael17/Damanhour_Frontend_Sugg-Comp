import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsLogComponent } from './complaints-log.component';

describe('ComplaintsLogComponent', () => {
  let component: ComplaintsLogComponent;
  let fixture: ComponentFixture<ComplaintsLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
