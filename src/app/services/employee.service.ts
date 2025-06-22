import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeData } from '../models/Employee';
import { API } from './index';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeById(id: number): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`${API.EMPLOYEES}/${id}`);
  }

  updateEmployee(employee: EmployeeData): Observable<EmployeeData> {
    return this.http.put<EmployeeData>(
      `${API.EMPLOYEES}/${employee.id}`,
      employee
    );
  }
}
