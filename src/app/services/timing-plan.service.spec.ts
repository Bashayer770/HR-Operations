import { TestBed } from '@angular/core/testing';

import { TimingPlanService } from './timing-plan.service';

describe('TimingPlanService', () => {
  let service: TimingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
