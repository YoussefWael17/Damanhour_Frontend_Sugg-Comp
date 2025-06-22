import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-complaint',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-complaint.component.html',
  styleUrl: './edit-complaint.component.css'
})
export class EditComplaintComponent implements OnInit {
  complaintForm!: FormGroup;
  selectedFile: File | null = null;
  submitted = false;
  formMessage = '';
  isLoading = false;
  id!: number;
  sc_type: string = 'اقتراح';
  errorMessage = '';
  suggestion: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      sector: ['', Validators.required],
      description: ['', Validators.required],
      sc_type: [{ value: '', disabled: true }, Validators.required],
      attachments: [null]
    });

    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.sc_type = params['sc_type'] || 'اقتراح';
      this.loadSuggestion(this.id, this.sc_type);
    });
  }

  loadSuggestion(id: number, sc_type: string) {
    this.authService.getSuggestionById(id, sc_type).subscribe({
      next: (data) => {
        this.suggestion = data;

        const suggestionData = data as any;

        this.complaintForm.patchValue({
          title: suggestionData.title,
          sector: suggestionData.sector,
          description: suggestionData.description
        });

        this.complaintForm.get('sc_type')?.setValue(suggestionData.sc_type);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل تحميل التفاصيل.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.complaintForm.controls;
  }

  onComplaintFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.complaintForm.valid) {
      this.isLoading = true;
      const formValues = this.complaintForm.value;
      const formData = new FormData();

      formData.append('title', formValues.title);
      formData.append('sector', formValues.sector);
      formData.append('description', formValues.description);
      formData.append('sc_type', this.sc_type); // استخدمنا المتغير مباشرة لأن الفورم كنترول معطل

      if (this.selectedFile) {
        formData.append('attachments', this.selectedFile);
      }

      this.authService.updateSuggestion(this.id, formData, this.sc_type).subscribe({
        next: () => {
          this.formMessage = `تم تحديث ${this.sc_type} بنجاح`;
          this.isLoading = false;
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('فشل التحديث:', err);
          this.formMessage = 'حدث خطأ أثناء التحديث.';
          this.isLoading = false;
        }
      });
    }
  }
}
