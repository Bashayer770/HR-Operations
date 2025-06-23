import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimingPlan } from '../models/TimingPlan';
import { API } from '../services/index';
import { Department } from '../models/Department';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getTimingPlans(): Observable<TimingPlan[]>{
    console.log(`${API.GET_TIMING_PLAN}/GetTimingPlan`)
    return this._http.get<TimingPlan[]>(`${API.GET_TIMING_PLAN}/GetTimingPlan`)
  }
  getDepartments(): Observable<Department[]>{
    console.log(`${API.DEPARTMENTS}`)
    return this._http.get<Department[]>(`${API.DEPARTMENTS}/GetDepartments`)
  }
}
