import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';

PlaygroundModule
  .configure({
      selector: 'gv-root',
      overlay: false,
      modules: [
        BrowserModule,
        BrowserAnimationsModule
      ]
  });

platformBrowserDynamic().bootstrapModule(PlaygroundModule);