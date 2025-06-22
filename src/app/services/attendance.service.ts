import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, Transaction } from '../models/Attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = 'https://localhost:7165/api/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.baseUrl}Attendances/GetAttendance`
    );
  }

  getTransactionItems(
    fingerCode: number,
    year: number,
    month: number
  ): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(
      `${this.baseUrl}Attendances/EmployeeCalculation`,
      {
        FingerCode: fingerCode,
        Year: year,
        Month: month,
      }
    );
  }

  getAllTransactions(employeeId: number): Observable<Transaction[]> {
    // Assuming an endpoint exists to get all transactions for a user
    // This might need to be adjusted based on the actual API
    return this.http.get<Transaction[]>(
      `${this.baseUrl}Attendances/GetAllTransactions/${employeeId}`
    );
  }
}
