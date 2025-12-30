import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, CommonModule, FormsModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class OnboardPage implements OnInit {

  infos: any = {};

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    autoplay: false,
    loop: false,
    speed: 400
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadInfos();
  }

  loadInfos() {
    this.http.get('/assets/data/infos.json').subscribe((data: any) => {
      this.infos = data;
    });
  }

  startApp() {
    this.router.navigate(['/home']);
  }

}
