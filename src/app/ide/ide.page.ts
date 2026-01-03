import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController, LoadingController } from '@ionic/angular';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { Pyodide } from '../services/pyodide';
// import { OutputModalComponent } from '../modals/output-modal/output-modal.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ide',
  imports: [IonicModule, NgIf,AceEditorModule, TranslateModule],
  templateUrl: './ide.page.html',
  styleUrls: ['./ide.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdePage implements OnInit {
  code = `print("Hello Offline Python.")`;
  output = '';

  editorHeight = 60; // Percentage
  isExecuting = false;
  private isResizing = false;

  constructor(
    private pyodide: Pyodide,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
      }
    });
  }

  // --- Resizing Logic ---

  startResizing(event: MouseEvent | TouchEvent) {
    this.isResizing = true;
    event.preventDefault(); // Prevent text selection/scrolling
  }

  stopResizing() {
    this.isResizing = false;
  }

  resize(event: MouseEvent | TouchEvent) {
    if (!this.isResizing) return;

    let clientY: number;
    if (event instanceof MouseEvent) {
      clientY = event.clientY;
    } else {
      clientY = event.touches[0].clientY;
    }

    // Calculate percentage based on window height (approximate, since header takes some space)
    // A more robust way asks container refs, but this is sufficient for mobile view
    const windowHeight = window.innerHeight;
    const headerOffset = 56; // Approx toolbar height

    // Calculate raw percentage relative to content area
    let percentage = ((clientY - headerOffset) / (windowHeight - headerOffset)) * 100;

    // Clamp between 20% and 80%
    if (percentage < 20) percentage = 20;
    if (percentage > 80) percentage = 80;

    this.editorHeight = percentage;
  }

  // --- Execution Logic ---

  async run() {
    if (this.isExecuting) return;
    this.isExecuting = true;
    console.log('Running code...'+ this.isExecuting);

    // Auto-clear output on new run? User preference usually, but keeps it clean
    // this.output = ''; 

    try {
      // Direct execution without modal/loading controller
      this.output = await this.pyodide.run(this.code);
    } catch (error) {
      this.output = 'Error: ' + (error as Error).message;
    } finally {
      this.isExecuting = false;
    }
  }
}
