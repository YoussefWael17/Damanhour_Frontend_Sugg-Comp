import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-check-complaint-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './check-complaint-status.component.html',
  styleUrls: ['./check-complaint-status.component.css']
})
export class CheckComplaintStatusComponent {
  complaintStatus: {
    submittedDate: Date;
    status: string;
    response: string;
  } | null = null;

  constructor(private router: Router) {
    this.loadStatus();
  }

  loadStatus() {
    // محاكاة جلب بيانات من API أو من خدمة
    this.complaintStatus = {
      submittedDate: new Date('2025-05-10'),
      status: 'تم الرد',
      response: 'نشكرك على تواصلك، تم التعامل مع شكواك وسيتم اتخاذ الإجراءات اللازمة.'
    };
  }

  refreshStatus() {
    // يمكنك استدعاء API فعلي هنا لتحديث الحالة
    this.loadStatus();
    alert('تم تحديث الحالة');
  }

 getStatusClass(status: string) {
  switch (status) {
    case 'تم الرد': return 'status responded';
    case 'قيد المراجعة': return 'status pending';
    case 'مغلق': return 'status closed';  // بدل مرفوض
    default: return 'status unknown';
  }
}


  goToSubmitComplaint() {
    this.router.navigate(['/submit-complaint']);
  }

  goToComplaintsLog() {
    this.router.navigate(['/complaints-log']);
  }
}
