import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API } from '../services/index';
import { AuthResponse } from '../models/AuthResponse';
import { LoginRequest, RegisterRequest } from '../models/AuthRequest';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API.AUTH.REGISTER, data).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API.AUTH.LOGIN, data).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.post<any>(API.AUTH.CHANGE_PASSWORD, data);
  }
}
