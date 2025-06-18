import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //   this.errorMessage = '';

  //   if (this.loginForm.invalid) {
  //     this.errorMessage = 'يوجد أخطاء في النموذج';
  //     return;
  //   }

  //   this.isLoading = true;
    
  //   this.authService.login(
  //     this.loginForm.value.email,
  //     this.loginForm.value.password
  //   ).subscribe({
  //     next: () => {
  //       this.router.navigate(['/profile']);
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error?.message || 'فشل تسجيل الدخول';
  //       this.isLoading = false;
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     }
  //   });
  // }

  onSubmit() {
  console.log('onSubmit called');
  this.submitted = true;
  this.errorMessage = '';

  if (this.loginForm.invalid) {
    this.errorMessage = 'يوجد أخطاء في النموذج';
    return;
  }

  this.isLoading = true;
  
  this.authService.login(
    this.loginForm.value.email,
    this.loginForm.value.password
  ).subscribe({
    next: () => {
      this.router.navigate(['/profile']);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'فشل تسجيل الدخول';
      this.isLoading = false;
      this.errorMessage = 'login.error';

    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

}



