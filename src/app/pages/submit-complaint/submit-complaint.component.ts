import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-submit-complaint',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.css']
})
export class SubmitComplaintComponent {
  complaintForm!: FormGroup;
  submitted = false;
  isLoading = false;
  formMessage = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ) {}

  ngOnInit() {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      sector: ['', Validators.required],
      description: ['', Validators.required],
      sc_type: ['', Validators.required],
      attachments: [null]  
    });
  }

  get f() {
    return this.complaintForm.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.complaintForm.patchValue({ attachments: file });
    }
  }

  onSubmit() {
  this.submitted = true;

  if (this.complaintForm.invalid) {
    return;
  }

  this.isLoading = true;

  const { title, sector, description, sc_type } = this.complaintForm.value;

  this.authService.createSuggestion(
    title,
    sector,
    description,
    this.selectedFile ?? null, 
    sc_type
  ).subscribe({
    next: (res) => {
      this.formMessage = `تم ارسال ال${sc_type} بنجاح`;
      this.isLoading = false;
      this.complaintForm.reset();
      this.submitted = false;
      this.selectedFile = null; 
    },
    error: (err) => {
      this.formMessage = 'حدث خطأ أثناء الإرسال';
      this.isLoading = false;
    }
  });
  }}
