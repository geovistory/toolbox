import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { StateFacade } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoadingBarComponent } from './components/layout/loading-bar/loading-bar.component';
import { NotificationComponent } from './components/layout/notifications/notifications.component';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NotificationComponent, RouterOutlet, LoadingBarComponent]
})
export class AppComponent {
  loadingBarJobs$: Observable<number>;
  constructor(
    state: StateFacade,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    this.loadingBarJobs$ = state.ui.loadingBar.loadingBarCount$;
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/gv-icons.svg'));
  }
}
