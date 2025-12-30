import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, CommonModule, FormsModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AboutPage implements OnInit {

  infos: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadInfos();
  }

  loadInfos() {
    this.http.get('/assets/data/infos.json').subscribe((data: any) => {
      this.infos = data;
    });
  }

  openContact() {
    if (this.infos.contact && this.infos.contact.contact_url) {
      window.open(this.infos.contact.contact_url, '_blank');
    } else {
      window.open('https://omzor.com/contact', '_blank');
    }
  }

}
