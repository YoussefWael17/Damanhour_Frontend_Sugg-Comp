import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service'; // تأكد من المسار الصحيح
import { HttpClientModule } from '@angular/common/http';

interface Complaint {
  id: number;
  title: string;
  sc_type: string; // شكوى أو اقتراح
  status: 'done' | 'pending' | 'rejected';
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

  constructor(private authService: AuthService) {}

  sc_type: string = 'شكوى'; // أو 'اقتراح'

ngOnInit() {
  this.loadSuggestions();
}

changeType(type: string) {
    if (this.sc_type !== type) {
      this.sc_type = type;
      this.loadSuggestions();
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







