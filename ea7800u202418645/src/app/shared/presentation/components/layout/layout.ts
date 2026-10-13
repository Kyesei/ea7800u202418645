import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatListModule, TranslatePipe],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private translate = inject(TranslateService);
  currentLang = signal('en');

  constructor() {
    this.translate.use('en');
  }

  switchLanguage(lang: string) {
    this.currentLang.set(lang);
    this.translate.use(lang);
  }
}
