import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-specific-complaint',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './specific-complaint.component.html',
  styleUrl: './specific-complaint.component.css'
})
export class SpecificComplaintComponent implements OnInit {


  suggestion: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sc_type = this.route.snapshot.paramMap.get('sc_type') || 'اقتراح'; 
    this.loadSuggestion(id, sc_type);
  }

  loadSuggestion(id: number, sc_type: string) {
    this.authService.getSuggestionById(id, sc_type).subscribe({
      next: (data) => {
        this.suggestion = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل تحميل التفاصيل.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/complaints-log']);
  }
}





