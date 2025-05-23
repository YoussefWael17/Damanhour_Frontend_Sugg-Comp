import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Email:', this.email);
      this.successMessage = 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.';
      
      // إعادة التوجيه بعد ثوانٍ (اختياري)
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }
}
