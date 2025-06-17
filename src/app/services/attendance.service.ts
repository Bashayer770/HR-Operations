import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/Attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = 'https://localhost:7165/api/'; 
   
  constructor(private http: HttpClient) {   
  }

  getItems(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}Attendances/GetAttendance`);
  }
    
}
