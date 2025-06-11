import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuggestionsApp';

  constructor(private translate: TranslateService) {
    // حدد اللغة الافتراضية عند بدء التطبيق
    this.setLanguage('en'); // غيّر لـ 'ar' لو عايز العربي هو الافتراضي
  }

  useLanguage(lang: string) {
    this.setLanguage(lang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
