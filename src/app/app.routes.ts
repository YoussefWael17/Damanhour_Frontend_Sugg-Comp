import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SubmitComplaintComponent } from './pages/submit-complaint/submit-complaint.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { CheckComplaintStatusComponent } from './pages/check-complaint-status/check-complaint-status.component';
import { ComplaintsLogComponent } from './pages/complaints-log/complaints-log.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditComplaintComponent } from './pages/edit-complaint/edit-complaint.component';
import { SpecificComplaintComponent } from './pages/specific-complaint/specific-complaint.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // فيه Navbar و Footer
    children: [
      { path: '', component: HomeComponent },
      { path: 'submit-complaint', component: SubmitComplaintComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'profile/edit', component: EditProfileComponent },
      { path: 'complaint/details/:id/:sc_type', component: SpecificComplaintComponent },
      { path: 'complaint/edit/:id/:sc_type', component: EditComplaintComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'check-complaint-status', component: CheckComplaintStatusComponent },
  { path: 'complaints-log', component: ComplaintsLogComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'reset-password', component:ResetPasswordComponent}

];




