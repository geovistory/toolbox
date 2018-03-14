import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground, PlaygroundModule } from 'angular-playground';

initializePlayground('gv-root');
platformBrowserDynamic().bootstrapModule(PlaygroundModule);