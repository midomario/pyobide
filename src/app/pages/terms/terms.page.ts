import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, CommonModule, FormsModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TermsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
