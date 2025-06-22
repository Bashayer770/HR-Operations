import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsModalComponent } from './attendance-details-modal.component';

describe('AttendanceDetailsModalComponent', () => {
  let component: AttendanceDetailsModalComponent;
  let fixture: ComponentFixture<AttendanceDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
