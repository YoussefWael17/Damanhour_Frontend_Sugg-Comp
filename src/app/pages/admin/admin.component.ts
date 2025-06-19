import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  registerForm: FormGroup;
  showPassword = false;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^\s*[\p{L}]{2,}(\s+[\p{L}]{2,}){2,}\s*$/u)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      national_id: [null, [Validators.required, Validators.pattern(/^\d{14}$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]],
      faculty: ['', Validators.required],
      agree_terms: [false, Validators.requiredTrue],
      adjective: ['', Validators.required],
      sector_admin: ['', Validators.required],
    });

  }

  get f() { return this.registerForm.controls; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

onSubmit() {
  this.submitted = true;
  this.errorMessage = '';

  if (this.registerForm.invalid) {
    this.errorMessage = 'يوجد أخطاء في النموذج';
    return;
  }

  this.isLoading = true;

  const {
    username,
    email,
    password,
    national_id,
    phone,
    faculty,
    agree_terms,
    adjective,
    sector_admin
  } = this.registerForm.value;

  console.log('Sending to backend:', this.registerForm.value); // ⬅️ للمراجعة

  this.authService.adminRegister(
    username,
    email,
    national_id,
    phone,
    faculty,
    agree_terms,
    password,
    adjective,
    sector_admin
  ).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Registration error:', err); // ⬅️ دي هتظهر الخطأ الحقيقي
      this.errorMessage = err.error?.message || 'فشل التسجيل';
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}
}
