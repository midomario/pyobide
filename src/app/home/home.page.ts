import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule ,Platform } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [IonicModule, TranslateModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

   subscribedRouterEvents = false;

  constructor(private router: Router,
    private platform: Platform) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        // check if we are on the home page
        if (this.router.url === '/home') {
          this.closeApp();
        }else {
          // navigate to the previous page
          window.history.back();
        }
    });


  }

  navigateToIde() {
    this.router.navigate(['/ide']);
  }

  navigateToLessons() {
    this.router.navigate(['/lessons']);
  }

  // close button action
  closeApp() {
    App.exitApp();
  }
}
