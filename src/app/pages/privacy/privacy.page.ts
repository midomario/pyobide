import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, FormsModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PrivacyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
