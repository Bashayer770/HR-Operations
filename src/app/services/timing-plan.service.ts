import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimingPlan } from '../models/TimingPlan';
import { API } from './index';

@Injectable({
  providedIn: 'root',
})
export class TimingPlanService {
  constructor(private http: HttpClient) {}

  getTimingPlans(): Observable<TimingPlan[]> {
    return this.http.get<TimingPlan[]>(`${API.GET_TIMING_PLAN}`);
  }

    getTimingPlansNonAllow(): Observable<TimingPlan[]> {
    return this.http.get<TimingPlan[]>(`${API.GET_TIME_PLANS_NON_ALLOW}`);
  }
}
