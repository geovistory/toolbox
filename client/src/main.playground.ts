import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground } from 'angular-playground';
import { CustomPlaygroundModule } from './custom-playground.module';

initializePlayground('gv-root');
platformBrowserDynamic().bootstrapModule(CustomPlaygroundModule);