import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuggestionsApp';
  constructor(private translate: TranslateService) {
  
    this.translate.use('en');
  }
  useLanguage(lang: string) {
    this.translate.use(lang);
  }
}

