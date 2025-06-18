import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgetForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.forgetForm.invalid) {
      this.errorMessage = 'يرجى إدخال بريد إلكتروني صالح';
      return;
    }

    this.isLoading = true;

    this.authService.forgetPassword(this.forgetForm.value.email).subscribe({
      next: () => {
        // ✅ حفظ البريد في localStorage للربط مع صفحة التحقق
        localStorage.setItem('reset_email', this.forgetForm.value.email);

        // ✅ التوجيه لصفحة إدخال كود OTP
        this.router.navigate(['/verify-otp']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء إرسال البريد الإلكتروني.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
