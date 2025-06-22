import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-comps-suggs',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule, CommonModule],
  templateUrl: './all-comps-suggs.component.html',
  styleUrl: './all-comps-suggs.component.css'
})
export class AllCompsSuggsComponent {
  response: any = { data: [] };
  direction: string = 'ltr';
  currentSlide = 0;
  totalSlides = 3;
  

  nextSlide() {
  this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  console.log('nextSlide', this.currentSlide);
}

prevSlide() {
  this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  console.log('prevSlide', this.currentSlide);
}


  constructor(private authService: AuthService , private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {

    setInterval(() => {
      this.nextSlide();
      }, 5000); // تتغير الصورة كل 5 ثواني تلقائياً
  


    this.direction = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';

    this.authService.getAllSuggsComps().subscribe({
      next: (res) => {
        this.response = res;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    })

  }

  getStatusTooltip(status: string): string {
  switch (status) {
    case 'معلق':
      return 'بانتظار المراجعة';
    case 'تم الحل':
      return 'تم تنفيذ الاقتراح بنجاح';
    case 'قيد التنفيذ':
      return 'يتم العمل عليه حاليًا';
    case 'مرفوض':
      return 'لم يتم قبول الاقتراح';
    default:
      return '';
  }
}


  selectedSector: string = 'all';

sectors: string[] = [
  'قطاع شئون التعليم والطلاب',
  "قطاع شئون خدمة المجتمع وتنمية البيئة",
  'قطاع الدراسات العليا',
  "قطاع امين عام الجامعه",
  "قطاع ادارة الجامعه"
];


filteredData() {
  console.log('Selected sector:', this.selectedSector);
  if (this.selectedSector === 'all') {
    return this.response.data;
  }
  return this.response.data?.filter((s: { sector: string; }) => s.sector === this.selectedSector);
}

}








