import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class Pyodide {
  private pyodide: any;
  private loading = false;
  constructor(private alertCtrl: AlertController) { }

  private async showAlert(message: string, type: 'error' | 'info' = 'info') {
    const alert = await this.alertCtrl.create({
      header: type === 'error' ? 'Error' : 'Info',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async init() {
    if (this.pyodide || this.loading) return;
    this.loading = true;

    try {
      const indexURL = location.origin + '/assets/pyodide/';

      this.pyodide = await (window as any).loadPyodide({
        indexURL: indexURL,
      });
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
      const err = error as Error;
      await this.showAlert(`Load Failed: ${err.message}\nStack: ${err.stack || 'no stack'}`, 'error');
      this.loading = false;
      throw error;
    }

    this.loading = false;
  }

  async run(code: string): Promise<string> {
    await this.init();

    try {
      // Normalize newlines to prevent mobile indentation issues
      const normalizedCode = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      const wrapped = `
import sys
from io import StringIO
try:
    _stdout = sys.stdout
    sys.stdout = StringIO()

${normalizedCode.split('\n').map(l => '    ' + l).join('\n')}

    output = sys.stdout.getvalue()
    sys.stdout = _stdout
except Exception as e:
    output = "PYTHON ERROR: " + str(e)
output
`;
      const result = await this.pyodide.runPythonAsync(wrapped);
      return result;
    } catch (e) {
      const err = e as Error;
      await this.showAlert(`Execution Failed: ${err.message}`, 'error');
      throw e;
    }
  }
}
