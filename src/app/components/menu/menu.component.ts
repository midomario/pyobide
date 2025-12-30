import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule,TranslateModule,NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuComponent implements OnInit {
  currentLang: string = 'en';

  constructor(private translate: TranslateService, private menuController: MenuController) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'en';
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.closeMenu();
  }

  closeMenu() {
    const result = this.menuController.close();
    console.log('Menu closed : ',result);
    console.log('Menu  : ', this.menuController.getOpen);
  }
}
