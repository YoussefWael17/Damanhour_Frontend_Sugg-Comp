// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.css']
// })
// export class EditProfileComponent implements OnInit {
//   profileForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}


//   imagePreview: string | ArrayBuffer | null = null;

//   ngOnInit(): void {
//     this.profileForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: [''],
//       faculty: [''],
//       adjective: [''],
//       sector_admin: [''],
//       profile_image: [null]
//     });

//     this.loadProfile();
//   }

//   loadProfile() {
//   this.authService.getProfile().subscribe({
//     next: (data) => {
//       this.profileForm.patchValue(data);
//       if (data.profile_image) {
//         this.imagePreview = data.profile_image;  // تحديث الصورة المعروضة
//       }
//     },
//     error: (err) => {
//       console.error('Failed to load profile:', err);
//     }
//   });
// }



//   onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result;
//       // إذا كنت تبغى تخزن رابط الصورة في الفورم:
//       this.profileForm.patchValue({ profile_image: reader.result });
//     };
//     reader.readAsDataURL(file);
//   }
// }

//   // onSubmit() {
//   //   if (this.profileForm.valid) {
//   //     const formData = this.profileForm.value;
//   //     this.authService.updateProfile(formData).subscribe({
//   //       next: () => {
//   //         alert('تم تحديث الملف الشخصي بنجاح!');
//   //         this.router.navigate(['/profile']);
//   //       },
//   //       error: (err) => {
//   //         console.error('Failed to update profile:', err);
//   //         alert('حدث خطأ أثناء تحديث الملف الشخصي.');
//   //       }
//   //     });
//   //   }
//   // }

//   onSubmit() {
//   if (this.profileForm.valid) {
//     const formValues = this.profileForm.value;
//     const formData = new FormData();

//     // أضف كل الحقول إلى formData عدا profile_image
//     for (const key in formValues) {
//       if (key !== 'profile_image') {
//         formData.append(key, formValues[key]);
//       }
//     }

//     // أضف الملف (إذا متوفر)
//     const fileInput = (document.getElementById('fileInput') as HTMLInputElement);
//     if (fileInput && fileInput.files && fileInput.files.length > 0) {
//       formData.append('profile_image', fileInput.files[0]);
//     }

//     this.authService.updateProfile(formData).subscribe({
//       next: () => {
//         alert('تم تحديث الملف الشخصي بنجاح!');
//         this.router.navigate(['/profile']);
//       },
//       error: (err) => {
//         console.error('Failed to update profile:', err);
//         alert('حدث خطأ أثناء تحديث الملف الشخصي.');
//       }
//     });
//   }
// }

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      faculty: [''],
      adjective: [''],
      profile_image: [null]
    });

    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue(data);
        if (data.profile_image) {
          this.imagePreview = data.profile_image;
        }
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // لا تحتاج تخزن Base64 في الفورم لأنك سترسل الملف مباشرة
        // لكن يمكن تخزين الملف في متغير آخر لو حبيت
        this.profileForm.patchValue({ profile_image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const formData = new FormData();

      for (const key in formValues) {
        if (key !== 'profile_image') {
          formData.append(key, formValues[key]);
        }
      }

      // نضيف الملف مباشرة من input وليس من formControl لأن formControl يخزن الـ file فقط لو فعلت سابقاً
      const fileInput = (document.getElementById('fileInput') as HTMLInputElement);
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('profile_image', fileInput.files[0]);
      }

      this.authService.updateProfile(formData).subscribe({
        next: () => {
          alert('تم تحديث الملف الشخصي بنجاح!');
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          alert('حدث خطأ أثناء تحديث الملف الشخصي.');
        }
      });
    }
  }
}
