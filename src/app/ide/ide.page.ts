import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController, LoadingController } from '@ionic/angular';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { Pyodide } from '../services/pyodide';
import { OutputModalComponent } from '../modals/output-modal/output-modal.component';

@Component({
  standalone: true,
  selector: 'app-ide',
  imports: [IonicModule, AceEditorModule,TranslateModule],
  templateUrl: './ide.page.html',
  styleUrls: ['./ide.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdePage implements OnInit {
  code = `print("Hello Offline Python")`;
  output = '';

  constructor(
    private pyodide: Pyodide,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
      }
    });
  }

  async run() {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('HOME.RUNNING'),
    });
    await loading.present();

    try {
      this.output = await this.pyodide.run(this.code);
    } catch (error) {
      this.output = 'Error: ' + (error as Error).message;
    }

    await loading.dismiss();

    const modal = await this.modalCtrl.create({
      component: OutputModalComponent,
      componentProps: { output: this.output },
      cssClass: 'full-modal',
    });
    await modal.present();
  }
}
