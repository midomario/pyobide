import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Pyodide {
  private pyodide: any;
  private loading = false;

  async init() {
    if (this.pyodide || this.loading) return;
    this.loading = true;

    this.pyodide = await (window as any).loadPyodide({
      indexURL: 'assets/pyodide/',
    });

    this.loading = false;
  }

  async run(code: string): Promise<string> {
    await this.init();

    const wrapped = `
import sys
from io import StringIO

_stdout = sys.stdout
sys.stdout = StringIO()

try:
${code.split('\n').map(l => '    ' + l).join('\n')}
    output = sys.stdout.getvalue()
except Exception as e:
    output = str(e)

sys.stdout = _stdout
output
`;
    return await this.pyodide.runPythonAsync(wrapped);
  }
}
