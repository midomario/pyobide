
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [IonicModule, TranslateModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title color="light">{{ 'OUTPUT.TITLE' | translate }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()" color="light" fill="clear">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="output-content">
      <div class="output-container">
        <pre class="output-text">{{ output }}</pre>
        @if (output) {
          <ion-button (click)="clearOutput()" color="secondary" fill="outline" expand="block">
            <ion-icon name="trash-outline" slot="start"></ion-icon>
            {{ 'OUTPUT.CLEAR' | translate }}
          </ion-button>
        }
      </div>
    </ion-content>
    `,
  styles: [`
    .output-content {
      --background: linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%);
    }

    .output-container {
      padding: 20px;
    }

    .output-text {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 15px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: white;
      white-space: pre-wrap;
      word-wrap: break-word;
      max-height: 60vh;
      overflow-y: auto;
      margin-bottom: 20px;
    }
  `],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OutputModalComponent {
  @Input() output!: string;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  clearOutput() {
    this.output = '';
  }
}
