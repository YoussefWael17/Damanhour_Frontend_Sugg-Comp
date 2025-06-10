import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Complaint {
  id: number;
  type: string;
  date: string;
  status: 'done' | 'pending' | 'rejected';
}

@Component({
  selector: 'app-complaints-log',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule],
  templateUrl: './complaints-log.component.html',
  styleUrls: ['./complaints-log.component.css']
})
export class ComplaintsLogComponent {
  complaints: Complaint[] = [
    { id: 1, type: 'مشكلة في الإنترنت', date: '10 مايو 2025', status: 'done' },
    { id: 2, type: 'طلب دعم فني', date: '9 مايو 2025', status: 'pending' },
    { id: 3, type: 'تعديل بريد إلكتروني', date: '7 مايو 2025', status: 'rejected' },
    { id: 4, type: 'مشكلة بنتائج الامتحانات', date: '6 مايو 2025', status: 'done' },
    { id: 5, type: 'اقتراح تطوير الموقع', date: '5 مايو 2025', status: 'pending' }
  ];
}
