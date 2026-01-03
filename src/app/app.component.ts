import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonHeader, IonToolbar, IonTitle, IonItem, IonIcon, IonLabel, IonRouterOutlet, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline,codeSlash, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, homeOutline, informationCircleOutline, shieldCheckmarkOutline, documentTextOutline, flagOutline, checkmark, codeOutline, playOutline, closeOutline, phonePortraitOutline, bookOutline, rocket, rocketOutline, codeSlashOutline, terminalOutline, constructOutline, school, schoolOutline, chevronForward, code, document, chevronBack, checkmarkCircle, arrowBack, book } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import "ace-builds/src-noconflict/ext-language_tools";

import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp, 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonListHeader,
    IonRouterOutlet,
    RouterModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent {
  public currentLang: string = 'en';

  constructor(
    private router: Router, 
    private translate: TranslateService,
    private menuController: MenuController
  ) {
    addIcons({ mailOutline,rocket, codeSlash,rocketOutline, codeSlashOutline,  mailSharp, paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp, homeOutline, informationCircleOutline, shieldCheckmarkOutline, documentTextOutline, flagOutline, checkmark, 
      codeOutline, playOutline, closeOutline, phonePortraitOutline, bookOutline, terminalOutline,book,
      constructOutline, schoolOutline,chevronForward,document, code , chevronBack, checkmarkCircle, arrowBack});

    // Set default language
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
    this.currentLang = savedLang;
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'en';
    if (!localStorage.getItem('seenOnboard')) {
      this.router.navigateByUrl('/onboard');
      localStorage.setItem('seenOnboard', '1');
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.closeMenu();
  }

  closeMenu() {
    this.menuController.close();
  }
}
