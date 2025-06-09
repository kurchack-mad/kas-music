import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from './services/state.service.js';
import * as Kaspa from './web/kaspa/kaspa.js';
import { SharedModule } from './shared/shared.module.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SharedModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public loading = false;
  public initialized = false;
  public showDonate = false;
  public showLicense = false;
  public showIntegrations = false;
  public kaspaAddress = 'kaspa:qr4nttauujymttrc6yhajhn0jzvn65z6tuwye0ma6shzsm7u4z6mqd36hqa85';
  public copiedText: boolean = false;
  public year = new Date().getFullYear();

  constructor(public stateService: StateService) {}

  ngOnInit() {
    this.loadKaspa();
  }

  async loadKaspa() {
    this.loading = true;
    try {
      const wasmUrl = '/assets/kaspa_bg.wasm';
      // const wasmArrayBuffer = await this.httpClient.get(wasmUrl, { responseType: 'arraybuffer' }).toPromise();
      const kaspa = await Kaspa.default(wasmUrl);
      console.log('kaspa version:', Kaspa.version());
      Kaspa.initConsolePanicHook();

      this.initialized = true;
    } catch (error) {
      console.error('Error loading Kaspa:', error);
      this.stateService.nodeError = 'Unable to connect to kaspa network';
    }
    this.loading = false;
  }

  logoClick() {
    window.open('https://kaspa.org', '_blank');
  }

  copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedText = true;
    setTimeout(() => {
      this.copiedText = false;
    }, 2000);
  }
}
