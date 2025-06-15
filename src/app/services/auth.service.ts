import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // التسجيل كخدمة عامة
})
export class AuthService {
  private apiUrl = 'https://damanhourappproject-production.up.railway.app/api/';

  constructor(private http: HttpClient) {}

  // تسجيل الدخول
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}auth/login/`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token); 
        }
      })
    );
  }


  register(username:string, email: string, national_id:number, phone:number, faculty:string, agree_terms:boolean, password: string, adjective:string ) {
    return this.http.post(`${this.apiUrl}auth/register/`, { username, email, national_id, phone, faculty, agree_terms, password, adjective }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token); 
        }
      })
    );
  }

  // التحقق من حالة التسجيل
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // تسجيل الخروج
  logout() {
    localStorage.removeItem('auth_token');
  }
}