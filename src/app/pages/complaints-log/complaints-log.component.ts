import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service'; // تأكد من المسار الصحيح
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Complaint {
  id: number;
  title: string;
  sc_type: string;
  status: 'تم الحل' | 'معلق' | 'مرفوض' | 'قيد التنفيذ';
}


@Component({
  selector: 'app-complaints-log',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule],
  templateUrl: './complaints-log.component.html',
  styleUrls: ['./complaints-log.component.css']
})
export class ComplaintsLogComponent implements OnInit {
  complaints: Complaint[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private authService: AuthService ,private router: Router) {}

  sc_type: string = 'شكوى'; // أو 'اقتراح'

  goToEdit(complaint: any) {
  this.router.navigate(['/complaint/edit', complaint.id, complaint.sc_type]);
}


ngOnInit() {
  this.loadSuggestions();
}

changeType(type: string) {
    if (this.sc_type !== type) {
      this.sc_type = type;
      this.loadSuggestions();
    }
  }

  
deleteSuggestion(id: number, sc_type: string): void {
  if (confirm('هل أنت متأكد من الحذف؟')) {
    this.authService.deleteSuggestion(id, sc_type).subscribe(() => {
      this.loadSuggestions(); // إعادة تحميل البيانات
    });
  }
}

loadSuggestions() {
  this.authService.getSuggestions(this.sc_type).subscribe({
    next: (data: any) => {
      this.complaints = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = 'فشل في تحميل البيانات.';
      console.error(err);
      this.isLoading = false;
    }
  });
}


}









