
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline,codeSlash, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, homeOutline, informationCircleOutline, shieldCheckmarkOutline, documentTextOutline, flagOutline, checkmark, codeOutline, playOutline, closeOutline, phonePortraitOutline, bookOutline, rocket, rocketOutline, codeSlashOutline, terminalOutline, constructOutline, school, schoolOutline, chevronForward, code, document, chevronBack, checkmarkCircle, arrowBack, book } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import "ace-builds/src-noconflict/ext-language_tools";

import { MenuComponent } from './components/menu/menu.component';
import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [ IonApp, TranslateModule, MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router, private translate: TranslateService) {
    addIcons({ mailOutline,rocket, codeSlash,rocketOutline, codeSlashOutline,  mailSharp, paperPlaneOutline, paperPlaneSharp, 
      heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp, homeOutline, informationCircleOutline, shieldCheckmarkOutline, documentTextOutline, flagOutline, checkmark, 
      codeOutline, playOutline, closeOutline, phonePortraitOutline, bookOutline, terminalOutline,book,
    constructOutline, schoolOutline,chevronForward,document, code , chevronBack, checkmarkCircle, arrowBack});

    // Set default language
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
  }

  ngOnInit() {
  if (!localStorage.getItem('seenOnboard')) {
    this.router.navigateByUrl('/onboard');
    localStorage.setItem('seenOnboard', '1');
  }
}
}
