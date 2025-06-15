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

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // فيه Navbar و Footer
    children: [
      { path: '', component: HomeComponent },
      { path: 'submit-complaint', component: SubmitComplaintComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'check-complaint-status', component: CheckComplaintStatusComponent },
  { path: 'complaints-log', component: ComplaintsLogComponent }
];




