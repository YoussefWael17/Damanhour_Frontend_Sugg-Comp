import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validator: this.passwordsMatch });

  }

  get f() {
    return this.resetForm.controls;
  }

  passwordsMatch(group: FormGroup): null | object {
    const pass = group.get('new_password')?.value;
    const confirm = group.get('confirm_password')?.value;
    return pass === confirm ? null : { mismatch: true };
  }


  onSubmit(): void {
    console.log('onSubmit called');
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetForm.invalid) {
      console.log('Form is invalid');
      this.errorMessage = 'يرجى التحقق من صحة البيانات.';
      return;
    }

    if (this.resetForm.hasError('mismatch')) {
      console.log('Password mismatch');
      this.errorMessage = 'كلمتا المرور غير متطابقتين.';
      return;
    }

    const email = localStorage.getItem('reset_email');
    console.log('Email from localStorage:', email);

    if (!email) {
      console.log('Email not found in localStorage');
      this.errorMessage = 'البريد غير متوفر. أعد الخطوات من البداية.';
      return;
    }

    this.isLoading = true;

    const password = this.resetForm.get('new_password')?.value;
    const confirmPassword = this.resetForm.get('confirm_password')?.value;

    this.authService.resetPassword(email, password, confirmPassword)
      .subscribe({
        next: () => {
          console.log('Password reset success');
          this.successMessage = 'تم تغيير كلمة المرور بنجاح. سيتم التوجيه إلى تسجيل الدخول.';
          setTimeout(() => {
            localStorage.removeItem('reset_email');
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          console.log('Error resetting password:', err);
          this.errorMessage = err.error?.message || 'حدث خطأ أثناء تغيير كلمة المرور.';
          this.isLoading = false;
        },
        complete: () => {
          console.log('Reset password request complete');
          this.isLoading = false;
        }
      });
  }
}
