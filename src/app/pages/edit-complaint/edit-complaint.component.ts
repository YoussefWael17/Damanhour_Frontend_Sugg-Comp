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
    sc_type: ['', Validators.required],
    attachments: [null]
  });

  this.route.params.subscribe(params => {
    this.id = +params['id']; 
    const sc_type = params['type'];
    this.loadComplaint(this.id, sc_type);
  });
}

  get f() {
    return this.complaintForm.controls;
  }

  loadComplaint(id: number, sc_type: string) {
    this.authService.getSuggestionById(id, sc_type).subscribe({
      next: (data) => {
        this.complaintForm.patchValue(data);
      },
      error: (err) => {
        console.error('فشل في تحميل البيانات:', err);
      }
    });
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
      formData.append('sc_type', formValues.sc_type);

      if (this.selectedFile) {
        formData.append('attachments', this.selectedFile);
      }

      this.authService.updateSuggestion(this.id, formData, formValues.sc_type).subscribe({
        next: () => {
          this.formMessage = `تم تحديث ${formValues.sc_type} بنجاح`;
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
