// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { TranslateModule } from '@ngx-translate/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-verify-otp',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
//   templateUrl: './verify-otp.component.html',
//   styleUrls: ['./verify-otp.component.css']
// })
// export class VerifyOtpComponent {
//   otpForm: FormGroup;
//   submitted = false;
//   isLoading = false;
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.otpForm = this.fb.group({
//       otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
//     });
//   }

//   get f() {
//     return this.otpForm.controls;
//   }

//   onSubmit() {
//     this.submitted = true;
//     this.errorMessage = '';

//     if (this.otpForm.invalid) return;

//     this.isLoading = true;

//     const email = localStorage.getItem('reset_email');
//     const otp = this.otpForm.value.otp;

//     this.authService.verifyEmail(email!, otp).subscribe({
//       next: () => {
//         // الانتقال لصفحة تعيين كلمة المرور الجديدة
//         this.router.navigate(['/reset-password']);
//       },
//       error: (err) => {
//         this.errorMessage = err.error?.message || 'OTP غير صحيح';
//         this.isLoading = false;
//       },
//       complete: () => {
//         this.isLoading = false;
//       }
//     });
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  otpForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });
  }

  get f() {
    return this.otpForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.otpForm.invalid) {
      return;
    }

    this.isLoading = true;

    const email = localStorage.getItem('reset_email'); // ✅ جلب الإيميل المُخزن

    if (!email) {
      this.errorMessage = 'لم يتم العثور على البريد الإلكتروني';
      this.isLoading = false;
      return;
    }

    this.authService.verifyEmail(email, this.otpForm.value.otp).subscribe({
      next: () => {
        // ✅ توجيه المستخدم إلى صفحة إعادة تعيين كلمة المرور
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        console.error('OTP verification error:', err);
        this.errorMessage = err.error?.message || 'رمز التحقق غير صحيح.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

