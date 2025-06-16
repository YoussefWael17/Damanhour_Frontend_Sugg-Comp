import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // التسجيل كخدمة عامة
})
export class AuthService {
  private apiUrl = 'https://damanhourappproject-production.up.railway.app/api/';

  constructor(private http: HttpClient) {}

  
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

  createSuggestion(
  title: string,
  sector: string,
  description: string,
  attachments: File | null,
  sc_type: string
) {
  const formData = new FormData();
    formData.append('title', title);
    formData.append('sector', sector);
    formData.append('description', description);
    formData.append('sc_type', sc_type);

    if (attachments) {
    formData.append('attachments', attachments);
  }

  const token = localStorage.getItem('auth_token'); 
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });


  let endpoint = 'suggestion/'; 

  if (sc_type === 'شكوى') {
    endpoint = 'complaint/';
  } else if (sc_type === 'اقتراح') {
    endpoint = 'suggestion/';
  }

  return this.http.post(`${this.apiUrl}${endpoint}`, formData, { headers }).pipe(
    tap(() => console.log(`${sc_type} Created Successfully`))
  );
}


getSuggestionById(id: number, sc_type: string) {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  let endpoint = 'suggestion/';
  if (sc_type === 'شكوى') {
    endpoint = 'complaint/';
  }

  return this.http.get(`${this.apiUrl}${endpoint}${id}/`, { headers });
}

getSuggestions(sc_type: string) {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  let endpoint = 'suggestion/';
  if (sc_type === 'شكوى') {
    endpoint = 'complaint/';
  }

  return this.http.get(`${this.apiUrl}${endpoint}`, { headers });
}


updateSuggestion(id: number, formData: FormData, sc_type: string) {
  const token = localStorage.getItem('auth_token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  let endpoint = '';

  if (sc_type === 'شكوى') {
    endpoint = `complaint/${id}/`;
  } else if (sc_type === 'اقتراح') {
    endpoint = `suggestion/${id}/`;
  } else {
    throw new Error('نوع غير مدعوم');
  }

  return this.http.put(`${this.apiUrl}${endpoint}`, formData, { headers });
}





getProfile() {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}user/profile/`, { headers }).pipe(
    tap((response: any) => {
      if (response.username) {
        localStorage.setItem('profile_username', response.username);
      }
    })
  );
}



updateProfile(updatedData: any) {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(`${this.apiUrl}user/profile/`, updatedData, { headers });
}


deleteProfile() {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(`${this.apiUrl}user/profile/`, { headers });
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