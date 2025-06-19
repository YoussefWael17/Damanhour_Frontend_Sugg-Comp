import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileData: any = {};
  isAdmin: boolean = false;

  constructor(private authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        console.log('Profile:', this.profileData);
        this.isAdmin = this.profileData.adjective === 'موظف إداري'
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });


    
  }


  onDeleteProfile() {
  if (confirm('هل أنت متأكد من حذف الملف الشخصي؟ هذا الإجراء لا يمكن التراجع عنه!')) {
    this.authService.deleteProfile().subscribe({
      next: () => {
        alert('تم حذف الملف الشخصي بنجاح!');
        this.router.navigate(['/']); // توجه لصفحة رئيسية أو تسجيل دخول بعد الحذف
      },
      error: (err) => {
        console.error('فشل حذف الملف الشخصي:', err);
        alert('حدث خطأ أثناء حذف الملف الشخصي.');
      }
    });
  }
}


  


  logout() {
    // مسح بيانات المستخدم لو موجودة
    localStorage.clear();
    // الانتقال إلى صفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }
}
