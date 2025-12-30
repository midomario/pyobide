import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [IonicModule, TranslateModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  navigateToIde() {
    this.router.navigate(['/ide']);
  }

  navigateToLessons() {
    this.router.navigate(['/lessons']);
  }
}
