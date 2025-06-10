import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';  // **اضف هذا**
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, TranslateModule,CommonModule],  // **اضف NgIf هنا**
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  isHomePage(): boolean {
    return this.currentUrl === '/' || this.currentUrl === '';
  }

   isSubmitComplaintPage(): boolean {
    return this.router.url.startsWith('/submit-complaint');
  }

  isProfilePage() {
  return this.router.url === '/profile';
}
}

