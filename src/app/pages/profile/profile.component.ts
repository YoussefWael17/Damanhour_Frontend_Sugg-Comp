import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    fullName: 'أحمد محمد',
    email: 'ahmed@example.com',
    college: 'كلية الحاسبات والمعلومات',
    phone: '01012345678',
    role: 'طالب'
  };

  constructor(private router: Router) {}

  logout() {
    // مسح بيانات المستخدم لو موجودة
    localStorage.clear();
    // الانتقال إلى صفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }
}
