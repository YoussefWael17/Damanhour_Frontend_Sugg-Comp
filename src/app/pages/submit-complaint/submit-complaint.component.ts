import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';  // استيراد RouterModule

@Component({
  selector: 'app-submit-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // إضافة RouterModule هنا
  templateUrl: './submit-complaint.component.html',
  styleUrls: ['./submit-complaint.component.css']
})
export class SubmitComplaintComponent {
  formMessage = '';
  selectedFile: File | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formMessage = 'تم تسجيل الشكوى بنجاح! شكراً لتواصلك معنا.';
      setTimeout(() => {
        form.resetForm();
        this.formMessage = '';
        this.selectedFile = null;
      }, 3000);
    } else {
      this.formMessage = 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.';
    }
  }
}
